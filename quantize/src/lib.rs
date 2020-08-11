use cpython::{PyResult, Python, py_module_initializer, py_fn, PyDict, PyList};
use std::collections::HashMap;
use cpython::PythonObject;
mod quantize;

// Expands to an extern "C" function that allows Python to load the rust code as 
// a Python extension module
// In lambda, type is Fn(Python, &PyModule) -> PyResult<()>
// Called with module is imported, and is reponsible for adding the module's members
py_module_initializer!(libquantize, |py, m| {
    m.add(py, "__doc__", "This module is implemented in Rust.")?;

    // Add functions as members of module 
    // py_fn! returns a value of type PyObject. When this python object is called, it invokes
    // the rust function.
    m.add(py, "quantize", py_fn!(py, quantize(py_pixels: PyList, num_partitions: usize)))?;
    Ok(())
});

fn quantize(py: Python, py_pixels: PyList, num_partitions: usize) -> PyResult<PyList>{
    // convert python list of dicts with rgb values to rust vectors of hash maps
    let mut rs_pixels = Vec::new();
    for obj in py_pixels.iter(py) {
        let py_pixel = obj.extract::<PyDict>(py).unwrap();
        let mut rs_pixel = HashMap::new();
        
        let red_obj = py_pixel.get_item(py, "red").unwrap();
        let red_val = red_obj.extract::<u32>(py).unwrap();
        rs_pixel.insert("red", red_val);

        let green_obj = py_pixel.get_item(py, "green").unwrap();
        let green_val = green_obj.extract::<u32>(py).unwrap();
        rs_pixel.insert("green", green_val);

        let blue_obj = py_pixel.get_item(py, "blue").unwrap();
        let blue_val = blue_obj.extract::<u32>(py).unwrap();
        rs_pixel.insert("blue", blue_val);

        rs_pixels.push(rs_pixel);
    }

    let colours = quantize::quantize(rs_pixels, num_partitions);

    // Convert vector of hashmaps back to python list of dicts
    let mut py_dict_vec = Vec::new();
    for colour in colours.iter() {
        let py_dict = PyDict::new(py);
        for (key, val) in colour.iter() {
            py_dict.set_item(py, key, val).unwrap();
        }
        py_dict_vec.push(py_dict.into_object());
    }

    Ok(PyList::new(py, &py_dict_vec[..]))
}