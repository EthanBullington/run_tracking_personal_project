from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v

# Create your models here.
class App_user(AbstractUser):
    email = models.EmailField(unique=True)
    state = models.CharField(max_length=2)
    age = models.IntegerField(validators=[v.MinValueValidator(13), v.MaxValueValidator(120)])
    display_name = models.CharField(unique=True)
    total_distance = models.DecimalField(max_digits=100, decimal_places=2,default=0)
    total_time = models.DecimalField(max_digits=100, decimal_places=2,default=0)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =[state]
