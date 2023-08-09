from django.db import models
from user_app.models import App_user

# Create your models here.
class Run(models.Model):
    distance = models.IntegerField()
    time = models.TimeField()
    date = models.DateField()
    user = models.ForeignKey(App_user, on_delete=models.CASCADE, related_name='user_run')