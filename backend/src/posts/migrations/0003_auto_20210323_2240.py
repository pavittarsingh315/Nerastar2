# Generated by Django 3.1.5 on 2021-03-24 05:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20210323_2225'),
    ]

    operations = [
        migrations.AlterField(
            model_name='replies',
            name='comment',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='posts.comment'),
        ),
    ]