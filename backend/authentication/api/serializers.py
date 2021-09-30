from django.db.models import fields
from rest_framework import serializers
from  authentication.models import *


class RegisterUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "name", "surname", "email", "password"]