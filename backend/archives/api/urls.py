from django.urls import path
from archives.api.views import *

urlpatterns = [
    path("list-service/", ServiceApiView.as_view(), name="apiService"),
    path("add-archive/", ArchiveAPIView.as_view(), name="apiAaddArchive"),
]
app_name="archives"