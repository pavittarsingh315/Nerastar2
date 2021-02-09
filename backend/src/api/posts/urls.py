from django.urls import path
from .views import Posts, Like_Unlike_Post, GetAnyPostAndEditPost, CreateListProfilePosts


urlpatterns = [
    path('feed-posts/', Posts.as_view()),
    path('like-unlike/<str:slug>/', Like_Unlike_Post),
    path('listprofileposts/<str:slug>/', CreateListProfilePosts.as_view()),
    path('get-any-edit-mine/<int:pk>/', GetAnyPostAndEditPost.as_view()),
]