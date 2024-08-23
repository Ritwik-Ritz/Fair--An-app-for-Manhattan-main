import numpy as np


def simple_average_interpolate(grid):
    arr = np.array(grid, dtype=float)

    known_values = [arr[i, j] for i in range(arr.shape[0]) for j in range(arr.shape[1]) if not np.isnan(arr[i, j])]

    mean_value = np.mean(known_values)

    interpolated_arr = arr.copy()

    for i in range(arr.shape[0]):
        for j in range(arr.shape[1]):
            if np.isnan(arr[i, j]):
                interpolated_arr[i, j] = mean_value

    return interpolated_arr.tolist()
