from rest_framework import serializers


class DashboardSerializer(serializers.Serializer):
    total_bikes = serializers.IntegerField()
    total_fuel_logs = serializers.IntegerField()
    total_fuel = serializers.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    total_cost = serializers.DecimalField(
        max_digits=12,
        decimal_places=2
    )
    average_mileage = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        allow_null=True
    )
    current_odometer = serializers.IntegerField()