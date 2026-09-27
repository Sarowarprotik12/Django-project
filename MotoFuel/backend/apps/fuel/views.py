from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import FuelLog
from .serializers import FuelLogSerializer


class FuelLogViewSet(viewsets.ModelViewSet):
    serializer_class = FuelLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FuelLog.objects.filter(
            bike__user=self.request.user
        )

    def perform_create(self, serializer):
        bike = serializer.validated_data["bike"]

        if bike.user != self.request.user:
            raise PermissionDenied(
                "You cannot add fuel to another user's bike."
            )

        serializer.save()