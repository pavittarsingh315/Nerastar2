from rest_framework import permissions, generics, pagination
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

# Project imports
from posts.models import Post, Like, Comment, Replies, Bookmark
from users.models import Profile, Notifications
from .serializers import PostSerializer, CommentsSerializer, RepliesSerializer, BookmarkSerializer
from ..permissions import OnlyPostOwnerCanEdit, OnlyProfileOwnerCanCreatePost
from django.contrib.auth import get_user_model
User = get_user_model()


class PostPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class Posts(generics.ListAPIView):
    serializer_class = PostSerializer
    pagination_class = PostPagination

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


class ListBookmarks(generics.ListAPIView):
    serializer_class = BookmarkSerializer
    pagination_class = PostPagination
    
    def get_queryset(self):
        profile = self.request.user.profile
        return Bookmark.objects.filter(owner=profile)


class CreateListProfilePosts(generics.ListCreateAPIView, OnlyProfileOwnerCanCreatePost):
    serializer_class = PostSerializer
    pagination_class = PostPagination
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

        msg = ''
        if likeOrUnlike == 'like':
            if profile not in post.liked.all():
                post.liked.add(profile)
                msg = 'Like'
                receiver = post.creator
                if profile != receiver:
                    if not Notifications.objects.filter(post=post, sender=profile, receiver=receiver, notificationType='Like').exists():
                        message = "liked your post"
                        notification = Notifications(
                            post=post, sender=profile, receiver=receiver, notificationType='Like', message=message)
                        notification.save()

        elif likeOrUnlike == 'unlike':
            if profile in post.liked.all():
                post.liked.remove(profile)
                msg = 'Unlike'

        return Response({'success': msg}, status=status.HTTP_200_OK)


# retrieve any post but you can only update/delete your own. the custom permission checks if the post creator is the profile of request.user
class GetAnyPostAndEditPost(generics.RetrieveUpdateDestroyAPIView, OnlyPostOwnerCanEdit):
    serializer_class = PostSerializer
    lookup_field = 'slug'
    permission_classes = [
        # When using custom permissions, have to specify isAuthenticated
        permissions.IsAuthenticated,
        OnlyPostOwnerCanEdit
    ]
    queryset = Post.objects.all()


class CommentPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class ListComments(generics.ListAPIView):
    serializer_class = CommentsSerializer
    pagination_class = CommentPagination

    def get_queryset(self):
        postSlug = self.kwargs['slug']
        post = Post.objects.get(slug=postSlug)
        return Comment.objects.filter(post=post)


class RepliesPagination(pagination.PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3


class ListReplies(generics.ListAPIView):
    serializer_class = RepliesSerializer
    pagination_class = RepliesPagination

    def get_queryset(self):
        commentId = self.kwargs['pk']
        comment = Comment.objects.get(pk=commentId)
        return Replies.objects.filter(comment=comment)


@api_view(['POST', 'DELETE'])
def CreateCommentOrReply(request, slug):
    user = request.user
    try:
        post = Post.objects.get(slug=slug)
    except Post.DoesNotExist:
        return Response({"error": "Post Does Not Exist!"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        profile = Profile.objects.get(user=user)
        commentBody = request.data['comment']
        commentOrReply = request.data['type']
        postOwner = post.creator

        if commentOrReply == 'comment':
            comment = Comment(user=profile, post=post, body=commentBody)
            comment.save()
            msg = CommentsSerializer(comment).data
            if profile != postOwner:
                message = f"commented \"{commentBody}\""
                if not Notifications.objects.filter(post=post, sender=profile, receiver=postOwner, notificationType='Comment', message=message).exists():
                    notification = Notifications(post=post, sender=profile, receiver=postOwner, notificationType='Comment', message=message)
                    notification.save()

        elif commentOrReply == 'reply':
            commentId = request.data['commentId']
            comment = Comment.objects.get(pk=commentId)
            receiverUser = User.objects.get(username=request.data['receiver'])
            receiver = Profile.objects.get(user=receiverUser)
            reply = Replies(user=profile, body=commentBody, comment=comment)
            reply.save()
            msg = RepliesSerializer(reply).data
            if profile != receiver:
                message = f"replied \"{commentBody}\""
                if not Notifications.objects.filter(post=post, sender=profile, receiver=receiver, notificationType='Comment', message=message).exists():
                    notification = Notifications(post=post, sender=profile, receiver=receiver, notificationType='Comment', message=message)
                    notification.save()

        return Response(msg, status=status.HTTP_200_OK)


@api_view(['POST'])
def HandleBookmarks(request, slug):
    profile = request.user.profile
    try:
        post = Post.objects.get(slug=slug)
    except Post.DoesNotExist:
        return Response({"error": "Post Does Not Exist!"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        if Bookmark.objects.filter(owner=profile, post=post).exists():
            Bookmark.objects.get(owner=profile, post=post).delete()
            msg = 'Bookmark Removed'
        else:
            bookmark = Bookmark(post=post, owner=profile)
            bookmark.save()
            msg = 'Bookmark Added'
        
        return Response(msg, status=status.HTTP_200_OK)