# Generated by Django 4.2.4 on 2023-08-17 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0003_remove_app_user_zipcode_app_user_state'),
    ]

    operations = [
        migrations.AlterField(
            model_name='app_user',
            name='total_time',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=100),
        ),
    ]
