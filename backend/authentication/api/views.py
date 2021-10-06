from authentication.api.serializers import RegisterUserSerializers
import datetime
from django.contrib.auth import authenticate, login, logout
from rest_framework.parsers import JSONParser
from django.db import transaction
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from authentication.models import User
from rest_framework import status
from backend.regex import *
import jwt


class LoginView(APIView):

    def post(Self, request):
        errors = {}
        username = request.data['username']
        password = request.data['password']

        userr = authenticate(request, username=username, password=password)

        user = User.objects.filter(username=username)

        if user is None or not user.exists():
            errors["username"] = "Cet utilisateur n'existe pas"
        if user.exists() and userr == None:
            errors["password"] = "Mot de passe incorrect"

        if len(errors) == 0:
            user = User.objects.get(username=username)
            # print("the id user is ", user.role)
            payload = {
            'id':user.id,
            'role':user.role,
            'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat':datetime.datetime.utcnow(),
            'key':'archiSoftware'
            }

            token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')
            login(request, userr)

            response = Response()
            response.set_cookie(key='token', value=token, httponly=True)
            response.data= {'token':token, "id":user.id}
            return response
        else:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    serializer_class = RegisterUserSerializers
    @transaction.atomic
    def post(self, request):
        if request.method == "POST":
            data = JSONParser().parse(request)
            error = []
            errors = {}
            username = checkLenOfField('username', data['username'], 2, error)
            name = checkLenOfField('name', data['name'], 2, error)
            surname = checkLenOfField('surname', data['surname'], 1, error)
            gender = checkLenOfField('gender', data['gender'], 1, error)
            role = checkLenOfField('role', data['role'], 2, error)
            email = setEmailError('email', data['email'], error)
            password1 = checkLenOfField('password1', data['passwordGroup']['password1'], 2, error)
            password2 = checkLenOfField('password2', data['passwordGroup']['password2'], 2, error)

            if password1 != password2:
                errors['password2'] = "Les mots de passe ne correspondent"
            else:
                pass

            emai = User.objects.filter(email=email)
            if emai.exists():
                errors['email'] = 'Cet adresse email existe déja'
            else:
                pass

            use = User.objects.filter(username=username)
            if use.exists():
                errors['username'] = 'Cet utilisateur existe déja'
            else:
                pass

            for data in error:
                for dat in data:
                    errors[dat] = data[dat]

            if len(errors) == 0 and len(error) ==0:
                user = User.objects.create_user(username=username, name=name, surname=surname, 
                       role=role, gender=gender, email=email, password=password1)
                user.save()
                serializer = RegisterUserSerializers(user)
                return Response('user created', status=status.HTTP_201_CREATED)
            else:
                print("errors are ", errors)
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            "message":"success"
        }

        return response