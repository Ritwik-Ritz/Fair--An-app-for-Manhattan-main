# app.py
import joblib
import pandas as pd
from flask import Flask, request, jsonify
from sklearn.base import BaseEstimator, TransformerMixin


class WindDirectionEncoder(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.directional_strings = ['S', 'SSW', 'SW', 'SSE', 'WNW', 'NNW', 'WSW', 'NW', 'N', 'NE', 'ENE', 'E', 'ESE',
                                    'SE', 'NNE', 'W']

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        if not isinstance(X, pd.DataFrame):
            X = pd.DataFrame(X)

        X = X.copy()
        X['wind_direction'] = X['wind_direction'].apply(lambda x: x if x in self.directional_strings else 'OTHER')

        X_encoded = pd.get_dummies(X, columns=['wind_direction'], prefix='', prefix_sep='')

        for col in self.directional_strings:
            if col not in X_encoded.columns:
                X_encoded[col] = 0

        X_encoded = X_encoded[self.directional_strings]
        X_encoded = X_encoded.astype(int)

        return X_encoded


class WeatherIdEncoder(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.weather_ids = [804, 500, 741, 803, 801, 800, 200, 501, 721, 300, 211, 502, 711, 212, 701, 600, 616, 612, 511, 601, 602, 301]

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        if not isinstance(X, pd.DataFrame):
            X = pd.DataFrame(X)

        X_encoded = pd.get_dummies(X, columns=['weather_id'], prefix='', prefix_sep='')

        for weather_id in self.weather_ids:
            if str(weather_id) not in X_encoded.columns:
                X_encoded[str(weather_id)] = 0

        X_encoded = X_encoded[[str(weather_id) for weather_id in self.weather_ids]]
        X_encoded = X_encoded.astype(int)

        return X_encoded


class GridCodeEncoder(BaseEstimator, TransformerMixin):
    def __init__(self):
        pass

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        if not isinstance(X, pd.DataFrame):
            X = pd.DataFrame(X)

        X = X.copy()
        X[['grid_x', 'grid_y']] = X['grid_code'].str.split('@', expand=True).astype(int)
        return X.drop(columns=['grid_code'])


# Load models
taxi_density_model = joblib.load('taxi_density_model.pkl')
aqi_model = joblib.load('aqi_model.pkl')

# Load grid information
grid_info = pd.read_csv('grid_info_full_ver.csv')

app = Flask(__name__)


# Helper function to find grid based on latitude and longitude
def find_grid(lat, lon):
    for index, row in grid_info.iterrows():
        if (row['min_lat'] <= lat <= row['max_lat']) and (row['min_lon'] <= lon <= row['max_lon']):
            return row
    return None


# Helper function to convert wind_deg to wind_direction
def wind_deg_to_direction(deg):
    directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    idx = int((deg + 11.25) / 22.5) % 16
    return directions[idx]


@app.route('/predict_with_location', methods=['POST'])
def predict_with_location():
    data = request.json
    lat = data.get('loc_lat')
    lon = data.get('loc_lon')

    grid = find_grid(lat, lon)
    if grid is None or not grid['intersects_manhattan']:
        return jsonify({"error": "Location not in Manhattan"}), 400

    data['grid_code'] = grid['grid_code']
    data['wind_direction'] = wind_deg_to_direction(data.pop('wind_deg'))

    # Prepare input for taxi_density_model
    taxi_input = pd.DataFrame([data])
    taxi_density = taxi_density_model.predict(taxi_input)[0]

    data['taxi_density'] = taxi_density

    # Prepare input for aqi_model
    aqi_input = pd.DataFrame([data])
    aqi_prediction = aqi_model.predict(aqi_input)[0]

    return jsonify({"predicted_aqi": aqi_prediction})


@app.route('/predict_for_all_grids', methods=['POST'])
def predict_for_all_grids():
    data = request.json
    data['wind_direction'] = wind_deg_to_direction(data.pop('wind_deg'))

    results = []
    for index, row in grid_info.iterrows():
        if row['intersects_manhattan']:
            grid_data = data.copy()
            grid_data['grid_code'] = row['grid_code']

            # Prepare input for taxi_density_model
            taxi_input = pd.DataFrame([grid_data])
            taxi_density = taxi_density_model.predict(taxi_input)[0]
            grid_data['taxi_density'] = taxi_density

            # Prepare input for aqi_model
            aqi_input = pd.DataFrame([grid_data])
            aqi_prediction = aqi_model.predict(aqi_input)[0]

            results.append({
                "grid_code": grid_data['grid_code'],
                "min_lat": row['min_lat'],
                "max_lat": row['max_lat'],
                "min_lon": row['min_lon'],
                "max_lon": row['max_lon'],
                "predicted_aqi": aqi_prediction
            })

    return jsonify(results)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
