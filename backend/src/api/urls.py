from django.urls import path, include


urlpatterns = [
    path('users/', include('api.users.urlsAuth'))
]
