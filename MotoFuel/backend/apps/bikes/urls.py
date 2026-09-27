from rest_framework.routers import DefaultRouter

from .views import BikeViewSet

router = DefaultRouter()
router.register(r"", BikeViewSet, basename="bike")

urlpatterns = router.urls