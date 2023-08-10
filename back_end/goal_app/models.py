from django.db import models
from user_app.models import App_user
from django.core import validators as v

# Create your models here.
class Goal(models.Model):
    distance = models.DecimalField(max_digits=6, decimal_places=2,validators=[v.MinValueValidator(1), v.MaxValueValidator(3100)])
    time = models.TimeField()
    user = models.OneToOneField(App_user, on_delete=models.CASCADE)