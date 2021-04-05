from rest_framework import serializers
from posts.models import Post, Comment, Like, Replies, Bookmark


# App: Posts
class PostSerializer(serializers.ModelSerializer):
    creator = serializers.SerializerMethodField()
    creatorAvatar = serializers.SerializerMethodField()
    creatorSlug = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()
    postIsMine = serializers.SerializerMethodField()
    bookmarked = serializers.SerializerMethodField()

    def get_creator(self, obj):
        return obj.creator.user.username

    def get_creatorAvatar(self, obj):
        return ("http://localhost:8000" + str(obj.creator.avatar.url))

    def get_creatorSlug(self, obj):
        return obj.creator.slug

    def get_liked(self, obj):
        request = self.context.get("request")
        profile = request.user.profile
        if profile in obj.liked.all():
            return True
        else:
            return False

    def get_postIsMine(self, obj):
        request = self.context.get("request")
        profile = request.user.profile
        if obj.creator == profile:
            return True
        else:
            return False

    def get_bookmarked(self, obj):
        request = self.context.get("request")
        profile = request.user.profile
        if Bookmark.objects.filter(owner=profile, post=obj).exists():
            return True
        else:
            return False

    # got rid of created cause its unneccesary cause the objs are already order by date created.
    # got rid of liked cause its can get to be very long, instead lets create a system were only the post creator can know who liked it
    class Meta:
        model = Post
        fields = [
            'id',
            'creator',
            'creatorAvatar',
            'creatorSlug',
            'content',
            'media',
            'media_url',
            'slug',
            'number_of_likes',
            'number_of_comments',
            'extension',
            'liked',
            'postIsMine',
            'bookmarked'
        ]

class CommentsSerializer(serializers.ModelSerializer):
    creator = serializers.SerializerMethodField()
    creatorAvatar = serializers.SerializerMethodField()

    def get_creator(self, obj):
        return obj.user.user.username

    def get_creatorAvatar(self, obj):
        return ("http://localhost:8000" + str(obj.user.avatar.url))

    class Meta:
        model = Comment
        fields = [
            'id',
            'body',
            'creator',
            'creatorAvatar',
            'number_of_likes',
            'number_of_replies'
        ]

class RepliesSerializer(serializers.ModelSerializer):
    creator = serializers.SerializerMethodField()
    creatorAvatar = serializers.SerializerMethodField()

    def get_creator(self, obj):
        return obj.user.user.username

    def get_creatorAvatar(self, obj):
        return ("http://localhost:8000" + str(obj.user.avatar.url))

    class Meta:
        model = Replies
        fields = [
            'id',
            'body',
            'creator',
            'creatorAvatar',
            'number_of_likes'
        ]

class BookmarkSerializer(serializers.ModelSerializer):
    post = serializers.SerializerMethodField()

    def get_post(self, obj):
        serializer_context = {'request': self.context.get('request') }
        return PostSerializer(obj.post, context=serializer_context).data

    class Meta:
        model = Bookmark
        fields = [
            'post'
        ]