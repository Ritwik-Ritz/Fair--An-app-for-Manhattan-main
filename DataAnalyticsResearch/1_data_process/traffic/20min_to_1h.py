import pandas as pd

df = pd.read_csv('taxi_processed.csv')

df['time_prox'] = pd.to_datetime(df['time_prox'])
df['hourly_time'] = df['time_prox'].dt.ceil('h')

df = df.drop(columns=['time_prox'])

df_aggregated = df.groupby(['loc', 'hourly_time']).sum().reset_index()

df_aggregated = df_aggregated.sort_values(by='hourly_time')

df_aggregated.to_csv('taxi_processed_hourly.csv', index=False)
