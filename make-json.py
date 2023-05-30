import pandas as pd
import json

# Read the Excel file
df = pd.read_excel('regulations.xlsx')

# Convert the DataFrame to JSON
json_data = df.to_json(orient='index')

# Add the 'links' list to the JSON data
json_data_final = {
    'data': json_data,
}

# Write the JSON data to a file
with open('regulations.json', 'w') as f:
    json.dump(json_data_final, f)
