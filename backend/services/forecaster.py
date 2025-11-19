import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import warnings

class SpendingForecaster:
    def __init__(self):
        pass

    def forecast(self, history: list[dict], days: int = 30):
        """
        Forecast spending for the next `days`.
        history: list of dicts with "date" and "amount".
        """
        if not history:
            return {"forecast": 0.0, "message": "No history provided"}

        df = pd.DataFrame(history)
        df['date'] = pd.to_datetime(df['date'])
        df = df.set_index('date')
        df = df.sort_index()
        
        # Resample to daily frequency and fill missing days with 0
        df = df.resample('D').sum().fillna(0)

        if len(df) < 7:
            return {"forecast": 0.0, "message": "Not enough data points (need at least 7 days)"}

        try:
            # Fit ARIMA model (simple order for robustness)
            # Suppress warnings for convergence issues on small data
            with warnings.catch_warnings():
                warnings.filterwarnings("ignore")
                model = ARIMA(df['amount'], order=(5,1,0))
                model_fit = model.fit()

            # Forecast
            forecast_result = model_fit.forecast(steps=days)
            total_forecast = float(forecast_result.sum())
            
            return {
                "forecast_total": round(total_forecast, 2),
                "days_forecasted": days,
                "daily_breakdown": forecast_result.tolist()
            }
        except Exception as e:
            return {"error": str(e)}

forecaster = SpendingForecaster()
