use std::collections::HashMap;
use std::cmp::Ordering;

pub fn quantize(pixels: Vec<HashMap<&str, u32>>, num_partitions: usize) -> Vec<HashMap<&str, u32>> {
  let partitions = partition(pixels, num_partitions);

  let rgb_colours: Vec<HashMap<&str, u32>> = partitions.into_iter().map(|p: Vec<HashMap<&str, u32>>| -> HashMap<&str, u32> {
      let total_red = p.iter().fold(0, |acc, x| acc + x.get("red").unwrap());
      let total_green = p.iter().fold(0, |acc, x| acc + x.get("green").unwrap());
      let total_blue = p.iter().fold(0, |acc, x| acc + x.get("blue").unwrap());

      let length = p.len() as u32;
      let mut avg_colour = HashMap::new();
      avg_colour.insert("red", total_red / length);
      avg_colour.insert("green", total_green / length);
      avg_colour.insert("blue", total_blue / length);

      avg_colour
  }).collect();

  rgb_colours
}

fn partition(pixels: Vec<HashMap<&str, u32>>, num_partitions: usize) -> Vec<Vec<HashMap<&str, u32>>> {
  let mut partitions = Vec::new();
  partitions.push(pixels);

  while (&partitions).len() < num_partitions {
      let (idx, colour) = largest_range_partition(&partitions);
      let mut split_partition = partitions.remove(idx);
      split_partition.sort_by(|l, r| -> Ordering {
          let lval = l.get(&colour[..]).unwrap();
          let rval = r.get(&colour[..]).unwrap();
          (*lval).cmp(rval)
      });

      let median = split_partition.len() / 2;
      partitions.push(split_partition.split_off(median));
      partitions.push(split_partition);
      println!("Split on {}", colour);
  }

  partitions
}

// Get the partition with the largest range and the corresponding colour
fn largest_range_partition(partitions: &Vec<Vec<HashMap<&str, u32>>>) -> (usize, String) {
  // TODO: add better initialized values
  let mut largest_range = u32::MIN;
  let mut largest_range_idx = 0;
  let mut largest_range_colour = String::from("");

  for (idx, partition) in partitions.iter().enumerate() {
      let (range, colour) = largest_colour_range(partition);
      if range > largest_range {
          largest_range = range;
          largest_range_colour = colour;
          largest_range_idx = idx;
      }
  }

  (largest_range_idx, largest_range_colour)
}

// Get the largest range and corresponding colour from a partition of pixels
fn largest_colour_range(partition: &Vec<HashMap<&str, u32>>) -> (u32, String) {
  let red_range = colour_range(partition, "red");
  let green_range = colour_range(partition, "green");
  let blue_range = colour_range(partition, "blue");

  if red_range >= green_range && red_range >= blue_range {
      (red_range, String::from("red"))
  } else if green_range >= red_range && green_range >= blue_range {
      (green_range, String::from("green"))
  } else {
      (blue_range, String::from("blue"))
  }
}

// Get the range of a colour from a partition of pixels.
fn colour_range(partition: &Vec<HashMap<&str, u32>>, colour: &str) -> u32 {
  let mut min = u32::MAX;
  let mut max = u32::MIN;

  for pixel in partition.iter() {
      let value = *pixel.get(colour).unwrap();
      if value <= min {
          min = value;
      } else if value >= max {
          max = value
      }
  } 

  let range = max - min;
  range
}
