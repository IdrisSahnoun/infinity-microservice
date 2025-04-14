from flask import Flask, jsonify
from config import Config
from models import db
from routes import register_routes
import requests
import threading
import time

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
register_routes(app)

# Enregistrement dans Eureka
def register_with_eureka():
    eureka_url = "http://localhost:8761/eureka/apps/event-management"
    instance_data = {
        "instance": {
            "hostName": "localhost",
           "app": "EVENT-MANAGEMENT",
            "ipAddr": "127.0.0.1",
            "port": {"$": 5000, "@enabled": "true"},
            "status": "UP",
            "dataCenterInfo": {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                "name": "MyOwn"
            }
        }
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(eureka_url, json=instance_data, headers=headers)
    if response.status_code == 204:
        print("Successfully registered with Eureka")
    else:
        print(f"Failed to register with Eureka: {response.text}")
# Désenregistrement
def unregister_from_eureka():
    eureka_url = "http://localhost:8761/eureka/apps/event-management/localhost:5000"
    response = requests.delete(eureka_url)
    if response.status_code == 200:
        print("Successfully unregistered from Eureka")
    else:
        print(f"Failed to unregister from Eureka: {response.text}")

# Heartbeat régulier
def send_heartbeat():
    while True:
        try:
            response = requests.put("http://localhost:8761/eureka/apps/event-management/localhost:5000")
            if response.status_code == 200:
                print("Heartbeat sent to Eureka")
        except Exception as e:
            print(f"Failed to send heartbeat: {e}")
        time.sleep(30)

# Lancement de l'application avec heartbeat
if __name__ == '__main__':
    # Enregistrement dans Eureka
    register_with_eureka()

    # 🔁 Démarrer le heartbeat dans un thread séparé
    threading.Thread(target=send_heartbeat, daemon=True).start()

    try:
        # Démarrage de l'application Flask
        app.run(port=5000)
    finally:
        # Attendre 2 secondes avant le désenregistrement
        time.sleep(2)
        unregister_from_eureka()
