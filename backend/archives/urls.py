from django.urls import path, include

urlpatterns = [
    path('api/', include('archives.api.urls', namespace="apiArchive")),
]
app_name="archive"