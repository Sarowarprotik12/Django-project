from django.db import models
from django.contrib.auth.models import User


class Bike(models.Model):
    FUEL_TYPES = [
        ("Petrol", "Petrol"),
        ("Octane", "Octane"),
        ("Diesel", "Diesel"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bikes"
    )

    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()

    registration_number = models.CharField(
        max_length=50,
        unique=True
    )

    fuel_type = models.CharField(
        max_length=20,
        choices=FUEL_TYPES
    )

    tank_capacity = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )

    current_odometer = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Bike"
        verbose_name_plural = "Bikes"

    def __str__(self):
        return f"{self.brand} {self.model}"