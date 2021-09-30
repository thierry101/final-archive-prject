from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=255, blank=True, null=True, unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    surname = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True, unique=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=20, blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    tokens = models.CharField(max_length=255, blank=True, null=True)
    mainImg = models.ImageField('Image principale', upload_to="Person/mainImg", null=True, blank=True)
    
    

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'name', 'password']
