# Generated by Django 4.2.7 on 2024-09-05 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatbot', '0004_alter_user_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='prompt',
            name='shared',
            field=models.BooleanField(default=False),
        ),
    ]