# Generated by Django 4.2.4 on 2023-08-11 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0002_alter_app_user_age'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='app_user',
            name='zipcode',
        ),
        migrations.AddField(
            model_name='app_user',
            name='state',
            field=models.CharField(default=1, max_length=2),
            preserve_default=False,
        ),
    ]
