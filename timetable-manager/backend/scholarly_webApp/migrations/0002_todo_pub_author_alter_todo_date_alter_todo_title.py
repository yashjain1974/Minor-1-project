# Generated by Django 4.0 on 2023-04-14 07:21

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('scholarly_webApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='pub_author',
            field=models.CharField(default='null', max_length=120),
        ),
        migrations.AlterField(
            model_name='todo',
            name='date',
            field=models.DateField(default=datetime.datetime(2023, 4, 14, 7, 21, 31, 419066, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='todo',
            name='title',
            field=models.CharField(default='null', max_length=120),
        ),
    ]