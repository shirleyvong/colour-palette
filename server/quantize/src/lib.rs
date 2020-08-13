use cpython::PythonObject;
use cpython::{py_fn, py_module_initializer, PyDict, PyList, PyResult, Python};
use std::collections::HashMap;

mod quantize;

py_module_initializer!(libquantize, |py, m| {
  // Add functions as members of module. When the Python object is called, the Rust function
  // is invoked
  m.add(py, "quantize", py_fn!(py, quantize(py_list: PyList, num_partitions: usize)))?;

  Ok(())
});

fn quantize(py: Python, py_list: PyList, num_partitions: usize) -> PyResult<PyList> {
  // Convert Python list of dicts to Rust vectors of hash maps
  let mut pixels = Vec::new();
  for py_obj in py_list.iter(py) {
    let py_pixel = py_obj.extract::<PyDict>(py).unwrap();

    let red_val = colour_value(py, &py_pixel, "red");
    let green_val = colour_value(py, &py_pixel, "green");
    let blue_val = colour_value(py, &py_pixel, "blue");

    let mut pixel = HashMap::new();
    pixel.insert("red", red_val);
    pixel.insert("green", green_val);
    pixel.insert("blue", blue_val);

    pixels.push(pixel);
  }

  let colours = quantize::quantize(pixels, num_partitions);

  // Convert Rust vector of hashmaps back to Python list of dicts
  let mut py_objs = Vec::new();
  for colour in &colours {
    let py_dict = PyDict::new(py);
    for (key, val) in colour.iter() {
      py_dict.set_item(py, key, val).unwrap();
    }
    // PyList holds a list of PyObjects so convert PyDict to PyObject
    py_objs.push(py_dict.into_object());
  }

  Ok(PyList::new(py, &py_objs[..]))
}

fn colour_value(py: Python, dict: &PyDict, key: &str) -> u32 {
  let py_obj = dict.get_item(py, key).unwrap();
  let value = py_obj.extract::<u32>(py).unwrap();
  value
}
