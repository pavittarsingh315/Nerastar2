from django.urls import path, include


urlpatterns = [
    path('users/', include('api.users.urlsAuth')),
    path('posts/', include('api.posts.urls')),
    path('profiles/', include('api.users.urlsProfile'))
]
