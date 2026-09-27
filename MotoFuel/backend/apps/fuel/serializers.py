from rest_framework import serializers

from .models import FuelLog


class FuelLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelLog
        fields = "__all__"
        read_only_fields = [
            "id",
            "total_cost",
            "created_at",
        ]

    def validate_fuel_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Fuel amount must be greater than 0."
            )
        return value

    def validate_price_per_liter(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Price per liter must be greater than 0."
            )
        return value

    def validate(self, attrs):
        bike = attrs["bike"]
        new_odometer = attrs["odometer"]

        last_log = (
            FuelLog.objects
            .filter(bike=bike)
            .order_by("-odometer")
            .first()
        )

        if last_log and new_odometer < last_log.odometer:
            raise serializers.ValidationError(
                {
                    "odometer": (
                        f"Odometer cannot be less than the previous "
                        f"reading ({last_log.odometer} km)."
                    )
                }
            )

        return attrs