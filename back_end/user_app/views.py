from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import App_user
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class Register(APIView):

    def post(self, request):
        request.data["username"] = request.data["email"]
        user = App_user.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        return Response(
            {"Runner": user.email, "token": token.key}, status=HTTP_201_CREATED
        )
    
class Token_auth(APIView):

    
        authentication_classes = [TokenAuthentication]
        permission_classes = [IsAuthenticated]

        

class Log_in(APIView):

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        runner = authenticate(username=email, password=password)
        if runner:
            token, created = Token.objects.get_or_create(user=runner)
            return Response({"token": token.key, "Runner": runner.email})
        else:
            return Response("No runner matching credentials", status=HTTP_404_NOT_FOUND)


class Info(Token_auth):
    
    def get(self, request):
        return Response({"email": request.user.email, "zipcode": request.user.zipcode, "display_name":request.user.display_name})

class Log_out(Token_auth):
    

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    


class Admin_register(APIView):

    def post(self, request):
        request.data["username"] = request.data["email"]
        admin_runner = App_user.objects.create_user(**request.data)
        admin_runner.is_staff = True
        admin_runner.is_superuser = True
        admin_runner.save()
        token = Token.objects.create(user=admin_runner)
        return Response(
            {"Admin_runner": admin_runner.email, "token": token.key}, status=HTTP_201_CREATED
        )
    