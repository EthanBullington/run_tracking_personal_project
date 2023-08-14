from django.urls import path
from .views import All_runs, A_run, A_run_by_date


urlpatterns = [
    path("", All_runs.as_view()),
    path("<int:run_id>/", A_run.as_view()),
    path("<str:date>/", A_run_by_date.as_view())
]