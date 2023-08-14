from django.db import models
from user_app.models import App_user

# Create your models here.
class Race(models.Model):
    distance = models.CharField()
    race_id = models.IntegerField()
    city = models.CharField()
    state = models.CharField()
    zipcode = models.CharField()
    name = models.CharField()
    user = models.ForeignKey(App_user, on_delete=models.CASCADE, related_name='user_race')
    url = models.URLField()
    next_end_date = models.DateField()


