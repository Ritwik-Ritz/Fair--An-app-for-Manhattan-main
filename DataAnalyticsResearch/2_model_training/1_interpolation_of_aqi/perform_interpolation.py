import pandas as pd

from inverse_distance_weighted import idm_interpolate
from cubic_spline import cubic_spline_interpolation

grid_info_df = pd.read_csv('grid_info.csv')
air_quality_df = pd.read_csv('air_quality_processed.csv')


def extract_data_at_time(time_stamp):
    return air_quality_df[air_quality_df['time_stamp'] == time_stamp]


def create_grid_matrix_by_df(air_quality_at_time):
    max_row = max([int(code.split('@')[0]) for code in grid_info_df['grid_code']])
    max_col = max([int(code.split('@')[1]) for code in grid_info_df['grid_code']])

    grid_matrix = [[None for _ in range(max_col + 1)] for _ in range(max_row + 1)]

    for index, row in grid_info_df.iterrows():
        grid_code = row['grid_code']
        row_index = int(grid_code.split('@')[0])
        col_index = int(grid_code.split('@')[1])

        if row['has_sensor']:
            sensor_list = eval(row['sensor_list'])
            max_aqi = None
            for sensor in sensor_list:
                sensor_data = air_quality_at_time[air_quality_at_time['sensor_index'] == sensor]
                if not sensor_data.empty:
                    max_sensor_aqi = sensor_data['pm2.5_aqi'].max()
                    if max_aqi is None or max_sensor_aqi > max_aqi:
                        max_aqi = max_sensor_aqi
            grid_matrix[row_index][col_index] = max_aqi

    return grid_matrix


def interpolate_all(interpolate, test=False):
    result_records = []
    time_stamps = air_quality_df['time_stamp'].unique()
    count, cent_count = 0, 0

    if test:
        time_stamps = time_stamps[:10]

    for time_stamp in time_stamps:

        air_quality_at_time = extract_data_at_time(time_stamp)
        grid_matrix = create_grid_matrix_by_df(air_quality_at_time)
        interpolated_matrix = interpolate(grid_matrix)

        for index, row in grid_info_df.iterrows():
            grid_code = row['grid_code']
            row_index = int(grid_code.split('@')[0])
            col_index = int(grid_code.split('@')[1])
            if row['intersects_manhattan']:
                aqi_value = interpolated_matrix[row_index][col_index]
                result_records.append({
                    'grid_code': grid_code,
                    'time_stamp': time_stamp,
                    'pm2.5_aqi': aqi_value
                })

        count += 1
        if count == 100:
            count = 0
            cent_count += 1
            print(f'{cent_count * 100} timestamps have been processed...')

    result_df = pd.DataFrame(result_records)

    result_df = result_df[result_df['grid_code'].isin(grid_info_df[grid_info_df['intersects_manhattan']]['grid_code'])]

    return result_df


result_df = interpolate_all(idm_interpolate, test=False)
result_df.to_csv('final_grid_data.csv', index=False)
