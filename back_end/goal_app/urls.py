from django.urls import path
from .views import Goals


urlpatterns = [
    path("", Goals.as_view()),
]