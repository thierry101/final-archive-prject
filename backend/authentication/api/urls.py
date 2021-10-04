from os import name
from django.urls import path
from authentication.api.views import *
# from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns  = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),
   
]
app_name="apiRegister"