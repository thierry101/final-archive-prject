# Generated by Django 3.2.7 on 2021-09-26 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_auto_20210926_0859'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
