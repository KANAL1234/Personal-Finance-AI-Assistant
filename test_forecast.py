import requests
import json
from datetime import datetime, timedelta
import random

def generate_history(days=60):
    history = []
    base_date = datetime.now() - timedelta(days=days)
    for i in range(days):
        date = (base_date + timedelta(days=i)).strftime("%Y-%m-%d")
        # Random spending between 20 and 100
        amount = random.uniform(20, 100)
        history.append({"date": date, "amount": round(amount, 2)})
    return history

def test_forecast():
    history = generate_history()
    payload = {"history": history, "days": 30}
    
    try:
        response = requests.post("http://127.0.0.1:8000/forecast/", json=payload)
        print(f"Status Code: {response.status_code}")
        print(json.dumps(response.json(), indent=2))
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_forecast()
