from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction
from rest_framework.parsers import JSONParser
from archives.models import *
from archives.api.serializers import *
from backend.regex import *


class ServiceApiView(APIView):
    def get(self, request, format=None):
        services = Service.objects.all()
        serializer=ServiceSerializers(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ArchiveAPIView(APIView):
    def get(self, request, format=None):
        print("the usersss connected is ", request.user)
        if request.user.is_authenticated:
            print("okk", request.user)
        else:
            print('no')
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
            user = checkLenOfField('user', str(data['user']), 1, error)
            description = checkLenOfField('description', data['description'], 5, error)
            fileUpload = list(data['fileUpload'])

            extensions = ['pdf', 'jpg', 'jpeg']
            print("the data are ", data)

        return Response("created", status=status.HTTP_201_CREATED)