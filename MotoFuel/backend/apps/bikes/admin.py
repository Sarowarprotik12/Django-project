from django.contrib import admin
from .models import Bike


@admin.register(Bike)
class BikeAdmin(admin.ModelAdmin):
    list_display = (
        "brand",
        "model",
        "registration_number",
        "fuel_type",
        "current_odometer",
    )

    search_fields = (
        "brand",
        "model",
        "registration_number",
    )

    list_filter = ("fuel_type",)