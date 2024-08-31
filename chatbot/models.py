from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass

class Prompt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userPrompt")
    prompt = models.CharField(max_length=300)
    response = models.TextField(default="", null=True, blank=True)

    def __str__(self):
        return f"{self.user} prompted {self.prompt[:10]}"
    