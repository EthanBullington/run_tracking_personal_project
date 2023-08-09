from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class App_user(AbstractUser):
    email = models.EmailField(unique=True)
    zipcode = models.IntegerField()
    age = models.IntegerField()
    display_name = models.CharField(unique=True)
    total_distance = models.IntegerField(default=0)
    total_time = models.IntegerField(default=0)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =[zipcode]
