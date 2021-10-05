from django.urls import path
from archives.api.views import *

urlpatterns = [
    path("list-service/", ServiceApiView.as_view(), name="apiService"),
    path("add-archive/", ArchiveAPIView.as_view(), name="apiAaddArchive"),
    path("list-archive/", ArchiveAPIView.as_view(), name="apiAaddArchiveList"),
    path('archive/<int:pk>/', ArchiveDetailAPIView.as_view(), name="archiveDetail"),
    path("list-user/", UserApiView.as_view(), name="apiUser"),
]
app_name="archives"