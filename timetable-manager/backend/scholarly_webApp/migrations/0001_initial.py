# Generated by Django 4.0 on 2023-03-07 09:33

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('pub_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=120)),
                ('category', models.CharField(default='other', max_length=30)),
                ('subject', models.CharField(default='other', max_length=30)),
                ('file', models.FileField(default='', max_length=254, null=True, upload_to='publications')),
                ('date', models.DateField(default=datetime.datetime(2023, 3, 7, 9, 33, 25, 63603, tzinfo=utc))),
                ('private', models.BooleanField(default=False)),
            ],
        ),
    ]
