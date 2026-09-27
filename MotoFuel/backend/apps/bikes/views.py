from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated

from .models import Bike
from .serializers import BikeSerializer


class BikeViewSet(viewsets.ModelViewSet):
    serializer_class = BikeSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "fuel_type",
        "year",
    ]

    search_fields = [
        "brand",
        "model",
        "registration_number",
    ]

    ordering_fields = [
        "year",
        "created_at",
        "current_odometer",
    ]

    ordering = [
        "-created_at",
    ]

    def get_queryset(self):
        return Bike.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)