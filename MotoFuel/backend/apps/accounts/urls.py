from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from .views import (
    RegisterView,
    LoginView,
    MeView,
    LogoutView,
    ChangePasswordView,
    
)


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", MeView.as_view(), name="me"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("change-password/",ChangePasswordView.as_view(),name="change-password",),
    path("login/", LoginView.as_view(), name="login"),
    
]