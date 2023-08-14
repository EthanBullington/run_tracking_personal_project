from django.shortcuts import render
from django.contrib.auth import authenticate
from .serializer import GoalSerializer, Goal
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK
)
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from user_app.views import Token_auth


# Create your views here.
class Goals(Token_auth):


    def get(self , request):
        goal = get_object_or_404(Goal, user = request.user )
        s_goal = GoalSerializer(goal, many = True)
        return Response(s_goal.data, status=HTTP_200_OK)
    
    def post(self, request):
        request.data["user"] = request.user
        new_goal = Goal(**request.data)
        new_goal.full_clean()
        new_goal.save()
        new_goal = GoalSerializer(new_goal)
        return Response(new_goal.data, status=HTTP_201_CREATED)
    
    def put(self, request):
        goal = get_object_or_404(Goal, user = request.user )

        if 'distance' in request.data:
            goal.distance = request.data["distance"]
        if 'time' in request.data:
            goal.time = request.data.get('time')
       
        goal.full_clean()
        goal.save()

        return Response(status=HTTP_204_NO_CONTENT)