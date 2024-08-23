from scipy.interpolate import griddata, NearestNDInterpolator
import numpy as np


def cubic_spline_interpolation(data):
    data = np.array(data, dtype=np.float64)

    rows, cols = data.shape

    x = np.arange(rows)
    y = np.arange(cols)
    grid_x, grid_y = np.meshgrid(x, y, indexing='ij')

    known_points = ~np.isnan(data)
    points = np.array([(i, j) for i in range(rows) for j in range(cols) if known_points[i, j]])
    values = data[known_points]

    if len(points) < rows * cols * 0.1:
        nearest_interp = NearestNDInterpolator(points, values)
        data = nearest_interp(grid_x, grid_y)
        known_points = ~np.isnan(data)
        points = np.array([(i, j) for i in range(rows) for j in range(cols) if known_points[i, j]])
        values = data[known_points]

    interpolated_data = griddata(points, values, (grid_x, grid_y), method='cubic')

    nearest_interp = NearestNDInterpolator(points, values)
    interpolated_data = np.where(np.isnan(interpolated_data), nearest_interp(grid_x, grid_y), interpolated_data)

    interpolated_data[interpolated_data < 0] = 0

    return interpolated_data.tolist()