from django.db import models
from authentication.models import User
import datetime
from django.utils import timezone
# Create your models here.
timeSet = datetime.datetime.now().time()
# timeSet = datetime.datetime.now().strftime('%H:%M:%S')
dateSet = datetime.datetime.now().date()
# now = timezone.now()

# Create your models here.
class SaveArchive(models.Model):
    name = models.CharField("Titre de l'archive", max_length=255, null=True, blank=True)
    service = models.ForeignKey('Service', on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField("Description", null=True, blank=True)
    fileToSave = models.FileField("Fichiers", upload_to='Files/', null=True, blank=True)
    fileUpload = models.TextField(null=True, blank=True)
    dateToSave = models.CharField("Date d'enregistrement", default=dateSet, max_length=25, null=True, blank=True)
    timeToSave = models.CharField("Heure d'enregistrement", default=timeSet, max_length=25, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name_plural = 'Liste des archives'


class Service(models.Model):
    name = models.CharField("Nom du service", max_length=255, null=True, blank=True)
    description = models.CharField("Description", max_length=255, null=True, blank=True)
    photoService = models.ImageField("Photo service", upload_to='Image', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        ordering = ("name", )
        verbose_name_plural = 'Liste des services'