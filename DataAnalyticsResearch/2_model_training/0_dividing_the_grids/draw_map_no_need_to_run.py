import geopandas as gpd
import matplotlib.pyplot as plt
import pandas as pd
import matplotlib.colors as mcolors
import numpy as np

from geodatasets import get_path

path_to_file = get_path('nybb')
gdf = gpd.read_file(path_to_file)

manhattan = gdf[gdf['BoroName'] == 'Manhattan']

manhattan = manhattan.to_crs(epsg=4326)

sensor_data_path = 'sensor_info.csv'
sensor_df = pd.read_csv(sensor_data_path)

air_quality_data_path = 'purple_air_quality.csv'
air_quality_df = pd.read_csv(air_quality_data_path)

specific_datetime = '2024-01-16 14:00:00'
selected_aqi_df = air_quality_df[air_quality_df['datetime'] == specific_datetime]

fig, ax = plt.subplots(figsize=(20, 20))

manhattan.boundary.plot(ax=ax, color='black')

colors = [
    (0, 1, 0),  # Green
    (0.9, 0.9, 0),  # Yellow
    (1, 0.5, 0),  # Orange
    (1, 0, 0),  # Red
    (0.5, 0, 0.5)  # Purple
]
cmap = mcolors.LinearSegmentedColormap.from_list('aqi_colors', colors)
norm = mcolors.Normalize(vmin=0, vmax=200)

for idx, row in selected_aqi_df.iterrows():
    sensor_info = sensor_df[sensor_df['sensor_index'] == row['sensor_index']]
    if not sensor_info.empty:
        if 'PA-I' in sensor_info.iloc[0]['model'] and 'PA-II' not in sensor_info.iloc[0]['model']:
            continue
        longitude = sensor_info.iloc[0]['longitude']
        latitude = sensor_info.iloc[0]['latitude']
        aqi = row['pm2.5_aqi']
        color = cmap(norm(aqi))
        ax.plot(longitude, latitude, 'o', color=color, markersize=12)  # 实心圆点

ax.set_title('Manhattan Boundary with Air Quality Sensors')
ax.set_xlabel('Longitude')
ax.set_ylabel('Latitude')

sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
sm.set_array([])
cbar = plt.colorbar(sm, ax=ax)
cbar.set_label('PM2.5 AQI')

plt.show()

minx, miny, maxx, maxy = manhattan.total_bounds

grid_size = 0.005
x_ticks = np.arange(minx, maxx, grid_size)
y_ticks = np.arange(miny, maxy, grid_size)

grid_colors = {}

for idx, row in selected_aqi_df.iterrows():
    sensor_info = sensor_df[sensor_df['sensor_index'] == row['sensor_index']]
    if not sensor_info.empty:
        if 'PA-I' in sensor_info.iloc[0]['model'] and 'PA-II' not in sensor_info.iloc[0]['model']:
            continue
        longitude = sensor_info.iloc[0]['longitude']
        latitude = sensor_info.iloc[0]['latitude']
        aqi = row['pm2.5_aqi']

        grid_x = np.floor((longitude - minx) / grid_size) * grid_size + minx
        grid_y = np.floor((latitude - miny) / grid_size) * grid_size + miny

        if (grid_x, grid_y) not in grid_colors:
            grid_colors[(grid_x, grid_y)] = []

        grid_colors[(grid_x, grid_y)].append(aqi)

for (grid_x, grid_y), aqi_values in grid_colors.items():
    avg_aqi = np.mean(aqi_values)
    color = cmap(norm(avg_aqi))
    rect = plt.Rectangle((grid_x, grid_y), grid_size, grid_size, linewidth=0.5, edgecolor='gray', facecolor=color)
    ax.add_patch(rect)

for x in x_ticks:
    ax.plot([x, x], [miny, maxy], color='gray', linewidth=0.5)
for y in y_ticks:
    ax.plot([minx, maxx], [y, y], color='gray', linewidth=0.5)

plt.show()
