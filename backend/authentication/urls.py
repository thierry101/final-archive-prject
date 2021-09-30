from django.urls import path, include

urlpatterns = [
    path('api/', include('authentication.api.urls', namespace="auth")),
]
app_name="register"