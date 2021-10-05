import base64
import json

from rest_framework.exceptions import AuthenticationFailed

from archives.api.serializers import *
from archives.models import *
from authentication.models import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction
from rest_framework.parsers import JSONParser
from archives.models import *
from archives.api.serializers import *
from django.core.files.base import ContentFile
from django.shortcuts import get_object_or_404
import base64
from backend.utils import *
from backend.regex import *
import jwt
import json


# ************************ get All service ****************************
class ServiceApiView(APIView):
    def get(self, request, format=None):
        services = Service.objects.all()
        serializer=ServiceSerializers(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# *********************** get all user **********************************
class UserApiView(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializers(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ArchiveAPIView(APIView):
    def get(self, request, format=None):
        archives =  SaveArchive.objects.all().order_by('-updated')
        serializers = ArchiveSerializers(archives, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @transaction.atomic
    def post(self, request, format=None):
        error = []
        errors = {}
        fileTab = []

        if request.method == 'POST':
            data = JSONParser().parse(request)
            url = '/media/Files/'
            title = checkLenOfField('title', data['title'], 2, error)
            date = checkLenOfField('date', data['date'], 2, error)
            time = checkLenOfField('time', data['time'], 2, error)
            service = checkLenOfField('service', str(data['service']), 1, error)
            token = data['token']
            user = data['token']['id']
            description = checkLenOfField('description', data['description'], 5, error)
            fileUpload = list(data['fileUpload'])
            if not request.user.is_authenticated:
                user = data['token']['id']
            elif request.user.is_authenticated:
                user = request.user.id
            else:
                errors["user"] = "Connecter vous pour effectuer un enregistrement"

            extensions = ['pdf', 'jpg', 'jpeg']
            for files in fileUpload:
                if files['titleFile'] and files['fileToSend']:
                    name = str(files['fileToSend']['name']).split(".")[-1]
                    if not name in extensions:
                        errors['file'] = 'Votre fichier doit etre au format jpg, jpeg, pdf'
                elif files['titleFile'] and not files['fileToSend']:
                    errors['file'] =  "Veuillez choisir une image"
                elif not files['titleFile'] and files['fileToSend']:
                    errors['file'] = "Veuillez inserez un titre à ce fichier"
                else:
                    errors['file'] = "Veuillez sélectionner au moins un fichier et ajouter un titre"

            for data in error:
                for dat in data:
                    errors[dat]=data[dat]
            if len(error)==0 and len(errors)==0:
                archive = SaveArchive.objects.create(name=title, service_id=int(service), user_id=int(user),
                            description=description, dateToSave=date, timeToSave=time)
                for file in fileUpload:
                    name = file['fileToSend']['name']
                    fileSave = file['fileToSend']['file']
                    # format est le format du fichier et imgstr est le fichier en string
                    format, imgstr = fileSave.split(';base64,')
                    ext = format.split('/')[-1]
                    unique = id_generator()
                    archive.fileToSave = ContentFile(base64.b64decode(imgstr), name=unique+name)
                    archive.save()
                    fileTab.append({"title":file['titleFile'], "ext":ext, 
                    "file":url+unique+file['fileToSend']['name'].replace(' ', '_').replace("'", "").replace("(", "").replace(")", "")})
                archive.fileUpload = json.dumps(fileTab)
                archive.save()
                serializer = ArchiveSerializers(archive)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)   

        # return Response("created", status=status.HTTP_201_CREATED)


class ArchiveDetailAPIView(APIView):
    def get_object(self, pk):
        archive = get_object_or_404(SaveArchive, pk=int(pk))
        return archive

    def get(self, request, pk):
        archive = self.get_object(pk)
        serializer = ArchiveSerializers(archive)
        return Response(serializer.data, status=status.HTTP_200_OK)


