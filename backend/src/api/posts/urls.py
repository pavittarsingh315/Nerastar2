from django.urls import path
from .views import Posts, Like_Unlike_Post, EditPost


urlpatterns = [
    path('feed-posts/', Posts.as_view()),
    path('like-unlike/<int:pk>/', Like_Unlike_Post),
    path('editposts/<int:pk>/', EditPost.as_view())
]