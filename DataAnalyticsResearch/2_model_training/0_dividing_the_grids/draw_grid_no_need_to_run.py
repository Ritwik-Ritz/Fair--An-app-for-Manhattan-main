import geopandas as gpd
import matplotlib.pyplot as plt
import pandas as pd
import matplotlib.colors as mcolors
import numpy as np


def create_grid(sensor_df, step=0.005):
    min_lat = sensor_df['latitude'].min() - step / 2
    max_lat = sensor_df['latitude'].max() + step / 2
    min_lon = sensor_df['longitude'].min() - step / 2
    max_lon = sensor_df['longitude'].max() + step / 2

    lat_grid = np.arange(min_lat, max_lat, step)
    lon_grid = np.arange(min_lon, max_lon, step)

    grid = []
    idx = 1
    for lat in lat_grid:
        for lon in lon_grid:
            grid.append(((lon, lat), (lon + step, lat + step), idx))
            idx += 1

    return grid


def plot_grid(ax, grid):
    for ((lon1, lat1), (lon2, lat2), idx) in grid:
        ax.plot([lon1, lon2, lon2, lon1, lon1], [lat1, lat1, lat2, lat2, lat1], 'k-', lw=1)
        ax.text((lon1 + lon2) / 2, (lat1 + lat2) / 2, str(idx), color='blue', fontsize=5, ha='center', va='center')


from geodatasets import get_path

path_to_file = get_path('nybb')
gdf = gpd.read_file(path_to_file)

manhattan = gdf[gdf['BoroName'] == 'Manhattan']

manhattan = manhattan.to_crs(epsg=4326)

sensor_data_path = 'sensor_info_processed.csv'
sensor_df = pd.read_csv(sensor_data_path)

air_quality_data_path = 'air_quality_processed.csv'
air_quality_df = pd.read_csv(air_quality_data_path)

specific_datetime = '2024-01-16 14:00:00'
selected_aqi_df = air_quality_df[air_quality_df['datetime'] == specific_datetime]

grid = create_grid(sensor_df)

fig, ax = plt.subplots(figsize=(20, 20))

manhattan.boundary.plot(ax=ax, color='black')

plot_grid(ax, grid)

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
        ax.plot(longitude, latitude, 'o', color=color, markersize=5)

ax.set_title('Manhattan Boundary with Air Quality Sensors and Grid')
ax.set_xlabel('Longitude')
ax.set_ylabel('Latitude')

sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
sm.set_array([])
cbar = plt.colorbar(sm, ax=ax)
cbar.set_label('PM2.5 AQI')

plt.show()
