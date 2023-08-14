from django.shortcuts import render
from django.contrib.auth import authenticate
from .serializer import RunSerializer, Run
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
from django.utils.datetime_safe import datetime
from datetime import date
from user_app.views import Token_auth

# Create your views here.
class All_runs(Token_auth):
    

    def get(self , request):
        run = get_object_or_404(Run, user=request.user)
        s_run = RunSerializer(run, many = True)
        return Response(s_run.data, status=HTTP_200_OK)
    
    def post(self, request):
        request.data["user"] = request.user
        new_run = Run(**request.data)
        new_run.full_clean()
        new_run.save()
        new_run = RunSerializer(new_run)
        return Response(new_run.data, status=HTTP_201_CREATED)
    

class A_run_by_date(Token_auth):
    

    def get(self, request, date):
        user = request.user  # Get the user making the request
        
        # Parse the date parameter to a datetime object
        try:
            search_date = datetime.strptime(date, "%Y-%m-%d").date()
        except ValueError:
            return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)
        
        runs = get_object_or_404(Run, user=user, date=search_date)  # Filter runs by user and date

        
        run_serializer = RunSerializer(runs, many=True)
        return Response(run_serializer.data, status=HTTP_200_OK)
    

class A_run(Token_auth):
    

    def get(self, request, run_id):
        run = RunSerializer(get_object_or_404(Run, id = run_id, user = request.user ))
        return Response(run.data, status=HTTP_200_OK)
    
    def put(self, request, run_id):
        run = get_object_or_404(Run, id = run_id, user = request.user )

        if 'distance' in request.data:
            run.distance = request.data["distance"]
        if 'time' in request.data:
            run.time = request.data.get('time')
        if 'date' in request.data:
            run.date = request.data.get('date')

        run.full_clean()
        run.save()

        return Response(status=HTTP_204_NO_CONTENT)
    
    def delete(self, request, run_id):
        run = get_object_or_404(Run, id = run_id, user = request.user)
        run.delete()
        return Response(status=HTTP_204_NO_CONTENT)

