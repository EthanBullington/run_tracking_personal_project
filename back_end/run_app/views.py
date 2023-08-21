from django.shortcuts import render
from django.contrib.auth import authenticate
from .serializer import RunSerializer, Run
from user_app.models import App_user
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
from datetime import datetime as imported_datetime
from datetime import time 
from datetime import timedelta
from user_app.views import Token_auth
from decimal import Decimal

# Create your views here.
class All_runs(Token_auth):
    

    def get(self , request):
        user = get_object_or_404(App_user, id = request.user.id)
        user_runs = Run.objects.filter(user=request.user)
        s_run = RunSerializer(user_runs, many = True)
        return Response(s_run.data, status=HTTP_200_OK)
    
    def post(self, request):
        request.data["user"] = request.user
        new_run = Run(**request.data)
        user = get_object_or_404(App_user, id = request.user.id)
        distance = Decimal(request.data['distance'])  # Convert to Decimal
        user.total_distance += distance
        run_time_str = request.data['time']
        hours, minutes, seconds = map(int, run_time_str.split(':'))
        run_time_timedelta = timedelta(hours=hours, minutes=minutes, seconds=seconds)
        run_time_minutes = run_time_timedelta.total_seconds() / 60
        round_time = round(run_time_minutes, 2)
        user.total_time += Decimal(round_time)
        user.total_time = round(user.total_time, 2)
        print(user.total_time)
        user.full_clean()
        user.save()
        new_run.full_clean()
        new_run.save()
        new_run = RunSerializer(new_run)
        return Response(new_run.data, status=HTTP_201_CREATED)
    

class A_run_by_date(Token_auth):
    

    def get(self, request, date):
        user = request.user  # Get the user making the request
        
        # Parse the date parameter to a datetime object
        try:
            search_date = imported_datetime.strptime(date, "%Y-%m-%d").date()
        except ValueError:
            return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)
        
        runs = Run.objects.filter(user=user,date = search_date)  # Filter runs by user and date

        
        run_serializer = RunSerializer(runs, many=True)
        return Response(run_serializer.data, status=HTTP_200_OK)
    

class A_run(Token_auth):
    

    def get(self, request, run_id):
        run = RunSerializer(get_object_or_404(Run, id = run_id, user = request.user ))
        return Response(run.data, status=HTTP_200_OK)
    
    def put(self, request, run_id):
        run = get_object_or_404(Run, id = run_id, user = request.user )
        user = get_object_or_404(App_user, id = request.user.id)

        if 'distance' in request.data:
            # print(user.total_distance)
            user.total_distance -= Decimal(run.distance)
            # print(user.total_distance)
            run.distance = request.data["distance"]
            user.total_distance += Decimal(run.distance)
            # print(user.total_distance)
        if 'time' in request.data:
            # print(user.total_time)
            run_time = run.time.strftime('%H:%M:%S')
            hours, minutes, seconds = map(int, run_time.split(':'))
            run_time_timedelta = timedelta(hours=hours, minutes=minutes, seconds=seconds)
            run_time_minutes = run_time_timedelta.total_seconds() / 60
            round_time = round(run_time_minutes, 2)
            user.total_time -= Decimal(round_time)
            user.total_time = round(user.total_time, 2)
            # print(user.total_time)
            run.time = request.data.get('time')
            hours, minutes, seconds = map(int, run.time.split(':'))
            run_time_timedelta = timedelta(hours=hours, minutes=minutes, seconds=seconds)
            run_time_minutes = run_time_timedelta.total_seconds() / 60
            round_time = round(run_time_minutes, 2)
            user.total_time += Decimal(round_time)
            user.total_time = round(user.total_time, 2)
            # print(user.total_time)
        if 'date' in request.data:
            run.date = request.data.get('date')

        run.full_clean()
        run.save()
        user.full_clean()
        user.save()

        return Response(status=HTTP_204_NO_CONTENT)
    
    def delete(self, request, run_id):
        run = get_object_or_404(Run, id = run_id, user = request.user)
        user = get_object_or_404(App_user, id = request.user.id)
        user.total_distance -= Decimal(run.distance)
        run_time = run.time.strftime('%H:%M:%S')
        hours, minutes, seconds = map(int, run_time.split(':'))
        run_time_timedelta = timedelta(hours=hours, minutes=minutes, seconds=seconds)
        run_time_minutes = run_time_timedelta.total_seconds() / 60
        round_time = round(run_time_minutes, 2)
        user.total_time -= Decimal(round_time)
        user.total_time = round(user.total_time, 2)
        user.full_clean()
        user.save()
        run.delete()
        return Response(status=HTTP_204_NO_CONTENT)