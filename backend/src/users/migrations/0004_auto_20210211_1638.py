# Generated by Django 3.1.5 on 2021-02-12 00:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20210211_1636'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notifications',
            old_name='user',
            new_name='receiver',
        ),
    ]
