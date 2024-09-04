from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('get_gemini_response/', views.get_gemini_response, name="get_gemini_response"),
    path('search/<str:text>/', views.search, name="search")
]