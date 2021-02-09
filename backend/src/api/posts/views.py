from rest_framework import permissions, generics
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

# Project imports
from posts.models import Post, Like, Comment
from users.models import Profile
from .serializers import PostSerializer
from ..permissions import OnlyPostOwnerCanEdit, OnlyProfileOwnerCanCreatePost

# Get posts for user's feed
class Posts(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        user_feed_post_id = []
        user = self.request.user
        user_feed_post_id += str(user.profile.id)
        users_following = user.profile.following.all()
        for user in users_following:
            profile = Profile.objects.get(user=user)
            user_feed_post_id += str(profile.id)
        # creator__in means, give me all objects of the Post model who's creator profile has the id of any of the ids in user_feed_post_id
        # look up pk__in to see what creator__in does. stackoverflow can explain it better
        posts = Post.objects.filter(creator__in=user_feed_post_id)
        return posts


class CreateListProfilePosts(generics.ListCreateAPIView, OnlyProfileOwnerCanCreatePost):
    serializer_class = PostSerializer
    permission_classes = [
        # When using custom permissions, have to specify isAuthenticated
        permissions.IsAuthenticated,
        OnlyProfileOwnerCanCreatePost
    ]

    def get_queryset(self):
        profileSlug = self.kwargs['slug']
        profile = Profile.objects.get(slug=profileSlug)
        return Post.objects.filter(creator=profile)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user.profile)


@api_view(['POST'])
def Like_Unlike_Post(request, slug):
    user = request.user
    try:
        post = Post.objects.get(slug=slug)
    except Post.DoesNotExist:
        return Response({"error": "Post Does Not Exist!"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        profile = Profile.objects.get(user=user)
        likeOrUnlike = request.data['like']

        if likeOrUnlike == 'like':
            if profile not in post.liked.all():
                post.liked.add(profile)
        elif likeOrUnlike == 'unlike':
            if profile in post.liked.all():
                post.liked.remove(profile)

        return Response({'msg': 'asd'}, status=status.HTTP_200_OK)


# retrieve any post but you can only update/delete your own. the custom permission checks if the post creator is the profile of request.user
class GetAnyPostAndEditPost(generics.RetrieveUpdateDestroyAPIView, OnlyPostOwnerCanEdit):
    serializer_class = PostSerializer
    permission_classes = [
        # When using custom permissions, have to specify isAuthenticated
        permissions.IsAuthenticated,
        OnlyPostOwnerCanEdit
    ]
    queryset = Post.objects.all()