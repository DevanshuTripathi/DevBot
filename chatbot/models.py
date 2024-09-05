from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    img = models.URLField(null=True, blank=True, max_length=600)

class Prompt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userPrompt")
    prompt = models.CharField(max_length=300)
    response = models.TextField(default="", null=True, blank=True)
    shared = models.BooleanField(default=False,)

    def __str__(self):
        return f"{self.user} prompted {self.prompt[:10]}"
    
    def serialize(self):
        return {
            "id":self.id,
            "user":self.user.id,
            "prompt":self.prompt,
            "response":self.response
        }