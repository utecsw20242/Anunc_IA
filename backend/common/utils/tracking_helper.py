from sqlalchemy.orm import Session
from datetime import datetime
from services.auth_service.models import Tracking  # Ajusta la ruta si es necesario

class TrackingHelper:
    def __init__(self, db: Session):
        self.db = db

    def create_metric(self, user_id, route, http_status_code, start_time, end_time):
        latency = (end_time - start_time).total_seconds()
        new_record = Tracking(
            TraceId=None,
            UserId=user_id,
            Route=route,
            HttpStatusCode=http_status_code,
            StartDate=start_time,
            EndDate=end_time,
            Latency=latency
        )
        self.db.add(new_record)
        self.db.commit()

