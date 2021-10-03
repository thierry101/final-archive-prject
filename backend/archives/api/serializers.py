from rest_framework import serializers
from archives.models import *

class ServiceSerializers(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "name", "description", "photoService"]


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', )


class ArchiveSerializers(serializers.ModelSerializer):
    user = UserSerializers()
    service = ServiceSerializers()
    class Meta:
        model = SaveArchive
        fields = "__all__"