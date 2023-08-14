from django.urls import path
from .views import Races, A_Race, User_runs, User_run


urlpatterns = [
    path('', Races.as_view()),
    path("<int:race_id>/", A_Race.as_view()),
    path("user/", User_runs.as_view()),
    path("user/<int:race_id>/", User_run.as_view())
]