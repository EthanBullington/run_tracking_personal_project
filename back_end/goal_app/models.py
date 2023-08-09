from django.db import models
from user_app.models import App_user

# Create your models here.
class Goal(models.Model):
    distance = models.IntegerField()
    time = models.TimeField()
    user = models.OneToOneField(App_user, on_delete=models.CASCADE)