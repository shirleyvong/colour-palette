from PIL import Image
from operator import itemgetter
from enum import Enum
import math
from functools import reduce

class Colour(Enum):
  RED = 0
  GREEN = 1
  BLUE = 2

def create_subgroups(pixels, num_subgroups):
  subgroups = [pixels]
  
  while len(subgroups) < num_subgroups:
    # find subgroup with largest range along some dimension
    idx, colour = get_max_range(subgroups)
    max_range_subgroup = subgroups[idx]
    
    # sort subgroup by the dimension with largest range
    max_range_subgroup.sort(key=itemgetter(colour.value))

    # split subgroup into 2
    median = math.ceil(len(max_range_subgroup) / 2) - 1
    subgroups.pop(idx)
    subgroups.append(max_range_subgroup[:median])
    subgroups.append(max_range_subgroup[median:])

  return subgroups


def get_max_range(group):
  max_range = -1
  max_range_idx = None
  max_range_colour = None

  for i in range(len(group)):
    subgroup = group[i]
    subgroup_range, subgroup_colour = get_max_colour_range(subgroup)
    if subgroup_range > max_range:
      max_range = subgroup_range
      max_range_idx = i
      max_range_colour = subgroup_colour
  
  return (max_range_idx, max_range_colour)

def get_max_colour_range(group):
  last_idx = len(group) - 1

  # get range of red
  red_idx = Colour.RED.value
  group.sort(key=itemgetter(red_idx))
  red_range = group[last_idx][red_idx] - group[0][red_idx]

  # get range of green
  green_idx = Colour.GREEN.value
  group.sort(key=itemgetter(green_idx))
  blue_range = group[last_idx][green_idx] - group[0][green_idx]

  # get range of blue
  blue_idx = Colour.BLUE.value
  group.sort(key=itemgetter(blue_idx))
  green_range = group[last_idx][blue_idx] - group[0][blue_idx]
  
  # only return color with the largest range
  if red_range >= green_range and red_range >= blue_range:
    return (red_range, Colour.RED)
  elif green_range >= red_range and green_range >= blue_range:
    return (green_range, Colour.GREEN)
  elif blue_range >= red_range and blue_range >= green_range:
    return (blue_range, Colour.BLUE)
  else:
    print('wtf') 

def get_avg_rgb_values(subgroups):
  avg_values = []
  for i in subgroups:
    avg_values.append(get_avg_rgb(i))

  return avg_values


def get_avg_rgb(group):
  rgb_sum = reduce(lambda acc, curr: tuple(map(sum, zip(acc, curr))), group, (0, 0, 0))
  rgb_avg = tuple(map(lambda x: x / len(group), rgb_sum))
  return rgb_avg


def get_colour_palette(file):
  im = Image.open(file)

  pixels = list(im.getdata())
  n = 5

  subgroups = create_subgroups(pixels, n)
  avg_vals = get_avg_rgb_values(subgroups)

  return avg_vals
