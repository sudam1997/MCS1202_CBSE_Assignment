from flask import Flask,request
import requests
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins=['http://localhost:4200'])



WEATHER_API_KEY="d81099b00d0a445ddf05ecbc5c0d70fe"
def find_ipAddress():
    response = requests.get("https://api64.ipify.org?format=json")

    if (response.status_code == 200):
        public_ip = response.json().get("ip")
        if public_ip:
            print(f"Public IP Address: {public_ip}")
            return public_ip
        else:
            print("Failed to get public IP address.")
            return
    else:
        print("Failed to get public IP address.")
        return



def get_location(ip_address):
    request_url = 'https://geolocation-db.com/jsonp/' + ip_address
    response = requests.get(request_url)
    response = response.content.decode()
    response = response.split("(")[1].strip(")")
    response  = json.loads(response)
    print("IP Geolocation Lookup:- "+request_url)
    return response

def current_weather_data(API_KEY,longitude,latitude):
    url="https://api.openweathermap.org/data/2.5/weather?lat="+str(latitude)+"&lon="+str(longitude)+"&units=metric&appid="+API_KEY
    print(url)
    response = requests.get(url)

    # Check for a successful response
    if response.status_code == 200:
        # Parse the JSON response into a dictionary
        weather_data = response.json()
        # Return the entire JSON response as a dictionary=
        return weather_data
    else:
        print("Failed to retrieve weather information. Status code:", response.status_code)
        return



def ThreeHourForecast(API_KEY,longitude,latitude):
    url="https://api.openweathermap.org/data/2.5/forecast?lat="+str(latitude)+"&lon="+str(longitude)+"&units=metric&cnt=3&appid="+API_KEY
    print(url)
    response = requests.get(url)

    # Check for a successful response
    if response.status_code == 200:
        # Parse the JSON response into a dictionary
        weather_data = response.json()
        # Return the entire JSON response as a dictionary=
        return weather_data
    else:
        print("Failed to retrieve weather information. Status code:", response.status_code)
        return "Failed to retrieve weather information. Status code:", response.status_code



@app.route('/api/current-weather', methods=['GET'])
def get_current_weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    current_weather=current_weather_data(API_KEY=WEATHER_API_KEY,longitude=lon,latitude=lat)
    if current_weather:
        try:
            # Convert the forecast data to JSON and return as a response
            return json.dumps(current_weather), 200
        except json.JSONDecodeError as e:
            # Handle JSONDecodeError and return an error response
            return f"Failed to parse API response as JSON: {e}", 500
    else:
        # Return an error response
        return "Failed to retrieve Current Weather.", 500




@app.route('/api/3hour-forecast', methods=['GET'])
def get_3hour_forecast():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    print(type(lat))
    print(type(lon))
    # print('Latitude:'+lat)
    # print('Longitude:'+lon
    hourly_forecast = ThreeHourForecast(API_KEY=WEATHER_API_KEY, longitude=lon, latitude=lat)
    # Check if hourly_forecast is not None
    if hourly_forecast:
        try:
            # Convert the forecast data to JSON and return as a response
            return json.dumps(hourly_forecast), 200
        except json.JSONDecodeError as e:
            # Handle JSONDecodeError and return an error response
            return f"Failed to parse API response as JSON: {e}", 500
    else:
        # Return an error response
        return "Failed to retrieve hourly forecast.", 500
  
if __name__ == '__main__':
    app.run(debug=True,port=5000)