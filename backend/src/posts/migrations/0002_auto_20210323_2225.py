# Generated by Django 3.1.5 on 2021-03-24 05:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ('-created',), 'verbose_name': 'Comment', 'verbose_name_plural': 'Comments'},
        ),
        migrations.AlterModelOptions(
            name='replies',
            options={'ordering': ('-created',), 'verbose_name': 'Reply', 'verbose_name_plural': 'Replies'},
        ),
        migrations.AlterField(
            model_name='replies',
            name='comment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='posts.comment'),
        ),
    ]
