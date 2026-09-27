from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from utils.api_response import success_response

from .serializers import DashboardSerializer
from .services import DashboardService


class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = DashboardService.get_dashboard_data(request.user)

        serializer = DashboardSerializer(data)

        return success_response(
            data=serializer.data,
            message="Dashboard data retrieved successfully."
        )