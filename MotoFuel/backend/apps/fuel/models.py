from decimal import Decimal

from django.db import models

from apps.bikes.models import Bike


class FuelLog(models.Model):
    bike = models.ForeignKey(
        Bike,
        on_delete=models.CASCADE,
        related_name="fuel_logs"
    )

    date = models.DateField()

    odometer = models.PositiveIntegerField()

    fuel_amount = models.DecimalField(
        max_digits=6,
        decimal_places=2
    )

    price_per_liter = models.DecimalField(
        max_digits=8,
        decimal_places=2
    )

    total_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    mileage = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True
    )

    fuel_station = models.CharField(
        max_length=100,
        blank=True
    )

    notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date", "-created_at"]

    def __str__(self):
        return f"{self.bike} - {self.date}"

    def save(self, *args, **kwargs):
        
        self.total_cost = self.fuel_amount * self.price_per_liter

       
        previous_log = (
            FuelLog.objects
            .filter(bike=self.bike)
            .exclude(pk=self.pk)
            .order_by("-odometer")
            .first()
        )

        if previous_log:
            distance = self.odometer - previous_log.odometer

            if distance > 0 and self.fuel_amount > 0:
                self.mileage = Decimal(distance) / self.fuel_amount
            else:
                self.mileage = None
        else:
            
            self.mileage = None

        super().save(*args, **kwargs)

        self.bike.current_odometer = self.odometer
        self.bike.save(update_fields=["current_odometer"])