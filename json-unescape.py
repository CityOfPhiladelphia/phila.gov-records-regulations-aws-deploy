import json

# Read the JSON file
with open('regulations.json', 'r') as f:
    json_data = f.read()

# Perform double decoding to unescape the keys
decoded_data = json.loads(json_data)
fixed_data = json.loads(decoded_data['data'])

# Update the 'data' key with the fixed data
decoded_data['data'] = fixed_data

# Write the fixed JSON data to a new file
with open('regulations_final.json', 'w') as f:
    json.dump(decoded_data, f, indent=4)
