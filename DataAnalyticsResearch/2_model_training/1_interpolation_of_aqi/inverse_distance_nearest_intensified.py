import numpy as np
import math


def idm_interpolate_nearest_intensified(grid):
    arr = np.array(grid, dtype=float)

    known_points = [(i, j, arr[i, j]) for i in range(arr.shape[0]) for j in range(arr.shape[1]) if not np.isnan(arr[i, j])]

    def interpolate(i, j):
        weights = []
        values = []
        for x, y, value in known_points:
            distance_sq = (i - x) ** 2 + (j - y) ** 2
            if distance_sq == 0:
                return value
            weight = 1 / math.e ** distance_sq
            weights.append(weight)
            values.append(value)

        # weights = [math.e ** w - 1 for w in weights]

        weighted_sum = sum(w * v for w, v in zip(weights, values))
        weight_sum = sum(weights)
        return weighted_sum / weight_sum

    interpolated_arr = arr.copy()

    for i in range(arr.shape[0]):
        for j in range(arr.shape[1]):
            if np.isnan(arr[i, j]):
                interpolated_arr[i, j] = interpolate(i, j)

    return interpolated_arr.tolist()