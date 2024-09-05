from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import markdown


import os
import google.generativeai as genai

from .models import User, Prompt


genai.configure(api_key = os.getenv('API_KEY'))

# Create your views here.
def markdown_html(text):
    response=markdown.markdown(text)

    return response



def index(request):
    if request.user.is_anonymous :
        return render(request, "chatbot/index.html",{
            'prompt':''
        })
    else:
        return render(request, "chatbot/index.html",{
            'prompt':Prompt.objects.filter(user=request.user)
        })

@csrf_exempt
def get_gemini_response(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request is required"}, status=400)
    
    data = json.loads(request.body)
    user = request.user
    prompt = data.get('prompt')
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    
    new_prompt = Prompt(user=user, prompt=prompt, response=markdown_html(response.text))
    new_prompt.save()

    return JsonResponse({'message': 'success', 'response': response.text}, status=201)

    
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "chatbot/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "chatbot/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        img = request.POST["pfp"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "chatbot/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password,)
            user.img = img
            user.save()
        except IntegrityError:
            return render(request, "chatbot/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "chatbot/register.html")


def search(request, text):
    if not text:
        return JsonResponse({"error": "No search text provided"}, status=400)
    
    prompts = Prompt.objects.filter(prompt__icontains=text, user=request.user)

    if prompts.exists():
        return JsonResponse([p.serialize() for p in prompts],  safe=False)
    else:
        return render(request, 'chatbot/index.html', {
            'prompt':Prompt.objects.filter(user=request.user)
        })

def shared(request):
    return render(request, 'chatbot/community.html', {
        'prompts':Prompt.objects.filter(shared=True)
    })

def sharing(request, prompt_id):
    prompt = Prompt.objects.get(pk=prompt_id)
    if prompt.shared :
        prompt.shared=False
    else:
        prompt.shared=True
    
    prompt.save()

    return render(request, 'chatbot/index.html', {
        'prompt': Prompt.objects.filter(user=request.user)
    })
    