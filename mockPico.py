from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import time
import random

class DataPacket():
    def __init__(self):
        self.date = int(time.time())
        temp_celsius = 0
        humidity_rh = 0
        light_lx = 0
        light_intensity = 0
        pressure_pa = 0
        rainfall_mm = 0
        wind_dir_deg = 0
        wind_speed_kmh = 0

    def update(self):
        self.date = int(time.time())
        self.temp_celsius = self.temp_celsius + random.uniform(-0.05, 0.05)
        self.humidity_rh = self.humidity_rh + random.uniform(-0.1, 0.1)
        self.humidity_rh = max(min(self.humidity_rh, 100), 0)
        self.light_lx = self.light_lx + random.uniform(-50, 50)
        self.pressure_pa = self.pressure_pa + random.uniform(-20, 20)
        self.wind_speed_kmh = self.wind_speed_kmh + random.uniform(-0.2, 0.2)
        self.wind_speed_kmh = max(min(self.wind_speed_kmh, 70), 0)

data_packet = DataPacket()
data_packet.temp_celsius = 20
data_packet.humidity_rh = 30
data_packet.light_lx = 5000
data_packet.pressure_pa = 100000
data_packet.rainfall_mm = 0
data_packet.wind_dir_deg = 0
data_packet.wind_speed_kmh = 5

last_update = 0
update_time = 4

class GetHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        global last_update
        current_update = time.time()
        if (current_update - last_update) >= update_time:
            data_packet.update()
            last_update = current_update
        json_data = \
            {'date': data_packet.date,
             'temp_celsius': data_packet.temp_celsius,
             'humidity_rh': data_packet.humidity_rh,
             'light_lx': data_packet.light_lx,
             'pressure_pa': data_packet.pressure_pa,
             'wind_speed_kmh': data_packet.wind_speed_kmh,
            }
        json_to_pass = json.dumps(json_data, indent=4)
        self.send_response(code=200, message='here is your token')
        self.send_header(keyword='Content-type', value='application/json')
        self.end_headers()
        self.wfile.write(json_to_pass.encode('utf-8'))

def run(server_class=HTTPServer, handler_class=GetHandler):
    port = 8000
    print("Starting mock pico serving on localhost: ", port)
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

if __name__ == "__main__":
    run()
