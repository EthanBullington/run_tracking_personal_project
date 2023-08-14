from django.shortcuts import render
from django.contrib.auth import authenticate
from .serializer import RaceSerializer, Race
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
)
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
# from django.utils.datetime_safe import datetime
import datetime
import requests # <== import requests so we can utilize it within our CBV to make API calls
from requests_oauthlib import OAuth1
from dotenv import dotenv_values
from user_app.views import Token_auth

# Create your views here.

class Races(Token_auth):
    
    def get(self, request):
        env = dotenv_values(".env")
        auth = OAuth1(env.get("API_KEY"), env.get("SECRET_KEY"))#<== for now place your corresponding keys here
        endpoint = f'https://runsignup.com/rest/races'
        parms = {
            "format": "JSON",
            "race_link": True,
            "state":request.user.state
        }
        response = requests.get(endpoint, auth=auth, params=parms) # notice with axios we had to wait for the promise to be completed, with requests it know to pause the program and wait until it receives a response
        responseJSON = response.json() 
        return Response(responseJSON, status=HTTP_200_OK)
    
class A_Race(Token_auth):

    def get(self, request, race_id):
        print(race_id)
        env = dotenv_values(".env")
        auth = OAuth1(env.get("API_KEY"), env.get("SECRET_KEY"))#<== for now place your corresponding keys here
        endpoint = f'https://runsignup.com/rest/race/{race_id}'
        parms = {
            "format": "JSON",
            "race_link": True,
        }
        response = requests.get(endpoint, auth=auth, params=parms)
        responseJSON = response.json() 
        return Response(responseJSON, status=HTTP_200_OK)
    
    def post(self, request, race_id):
        request.data["user"] = request.user
        env = dotenv_values(".env")
        auth = OAuth1(env.get("API_KEY"), env.get("SECRET_KEY"))#<== for now place your corresponding keys here
        endpoint = f'https://runsignup.com/rest/race/{race_id}'
        parms = {
            "format": "JSON",
            "race_link": True,
        }
        response = requests.get(endpoint, auth=auth, params=parms)
        responseJSON = response.json()
        next_end_date_str = responseJSON['race']['next_end_date']
        next_end_date = datetime.datetime.strptime(next_end_date_str, "%m/%d/%Y").date()
        # print(responseJSON['race']['events'][0]['distance'])
        new_race = Race(distance = responseJSON['race']['events'][0]['distance'], user = request.user, name = responseJSON['race']['name'], race_id= responseJSON['race']['race_id'], url=responseJSON['race']['url'], next_end_date = next_end_date, city=responseJSON['race']['address']['city'],state=responseJSON['race']['address']['state'], zipcode=responseJSON['race']['address']['zipcode'] )
        new_race.full_clean()
        new_race.save()
        new_race = RaceSerializer(new_race)
        return Response(new_race.data, status=HTTP_200_OK)
    

class User_runs(Token_auth):

    def get(self , request):
        race = get_object_or_404(Race, user = request.user )
        s_race = RaceSerializer(race, many = True)
        return Response(s_race.data, status=HTTP_200_OK)
    

class User_run(Token_auth):

    def get(self, request, race_id):
        race = RaceSerializer(get_object_or_404(Race, id = race_id, user = request.user ))
        return Response(race.data, status=HTTP_200_OK)
    

    def delete(self, request, race_id):
        race = get_object_or_404(Race, id = race_id, user = request.user )
        race.delete()
        return Response(status=HTTP_204_NO_CONTENT)