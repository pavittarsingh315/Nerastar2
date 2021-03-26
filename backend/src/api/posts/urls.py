from django.urls import path
from .views import Posts, ListBookmarks, Like_Unlike_Post, GetAnyPostAndEditPost, CreateListProfilePosts, ListComments, ListReplies, CreateCommentOrReply, HandleBookmarks


urlpatterns = [
    path('feed-posts/', Posts.as_view()),
    path('bookmarks/', ListBookmarks.as_view()),
    path('like-unlike/<str:slug>/', Like_Unlike_Post),
    path('listprofileposts/<str:slug>/', CreateListProfilePosts.as_view()),
    path('get-any-edit-mine/<str:slug>/', GetAnyPostAndEditPost.as_view()),
    path('listcomments/<str:slug>/', ListComments.as_view()),
    path('listreplies/<int:pk>/', ListReplies.as_view()),
    path('createcomment/<str:slug>/', CreateCommentOrReply),
    path('handlebookmarks/<str:slug>/', HandleBookmarks)
]