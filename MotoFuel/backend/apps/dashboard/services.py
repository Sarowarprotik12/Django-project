from django.db.models import Avg, Sum

from apps.bikes.models import Bike
from apps.fuel.models import FuelLog


class DashboardService:
    @staticmethod
    def get_dashboard_data(user):
        bikes = Bike.objects.filter(user=user)
        fuel_logs = FuelLog.objects.filter(bike__user=user)

        return {
            "total_bikes": bikes.count(),
            "total_fuel_logs": fuel_logs.count(),
            "total_fuel": fuel_logs.aggregate(
                total=Sum("fuel_amount")
            )["total"] or 0,
            "total_cost": fuel_logs.aggregate(
                total=Sum("total_cost")
            )["total"] or 0,
            "average_mileage": fuel_logs.aggregate(
                avg=Avg("mileage")
            )["avg"] or 0,
            "current_odometer": (
                bikes.order_by("-current_odometer").first().current_odometer
                if bikes.exists()
                else 0
            ),
        }