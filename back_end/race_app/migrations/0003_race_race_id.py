# Generated by Django 4.2.4 on 2023-08-11 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('race_app', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='race',
            name='race_id',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
