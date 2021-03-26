from users.models import Profile, Friendship, Notifications
from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            "Login Failed. Please check your credentials.")


class ProfileFollowingFollowerSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    def get_avatar(self, obj):
        return ("http://localhost:8000" + str(obj.profile.avatar.url))

    def get_name(self, obj):
        return obj.profile.full_name

    def get_slug(self, obj):
        return obj.profile.slug

    def get_following(self, obj):
        request = self.context.get("request")
        user = request.user
        if user in obj.profile.followers.all():
            return True
        elif Friendship.objects.filter(sender=user.profile, receiver=obj.profile).exists():
            return 'requested'
        else:
            return False

    class Meta:
        model = User
        fields = [
            'username',
            'avatar',
            'name',
            'slug',
            'following'
        ]


class ProfileSerializer(serializers.ModelSerializer):
    # this and get_user return the profile user's username rather than just the id
    user = serializers.SerializerMethodField()
    unreadNotifications = serializers.SerializerMethodField()
    areFollowing = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.user.username

    def get_unreadNotifications(self, obj):
        return Notifications.objects.filter(is_read=False, receiver=obj).count()

    def get_areFollowing(self, obj):
        request = self.context.get("request")
        user = request.user
        if user in obj.followers.all():
            return True
        elif user.username == obj.slug:
            return True
        elif not user.is_anonymous:
            if Friendship.objects.filter(sender=user.profile, receiver=obj).exists():
                return 'requested'
            else:
                return False
        else:
            return False

    class Meta:
        model = Profile
        fields = [
            'id',
            'full_name',
            'user',
            'bio',
            'avatar',
            'slug',
            'private',
            'number_following',
            'number_followers',
            'unreadNotifications',
            'areFollowing'
        ]


class NotificationSerializer(serializers.ModelSerializer):
    post = serializers.SerializerMethodField()
    sender = serializers.SerializerMethodField()
    senderAvatar = serializers.SerializerMethodField()

    def get_post(self, obj):
        if obj.post:
            return obj.post.slug
        else:
            return 'null'

    def get_sender(self, obj):
        return obj.sender.user.username

    def get_senderAvatar(self, obj):
        return ("http://localhost:8000" + str(obj.sender.avatar.url))

    class Meta:
        model = Notifications
        fields = [
            'id',
            'message',
            'is_read',
            'post',
            'sender',
            'senderAvatar',
            'notificationType'
        ]


class SearchUserSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.user.username

    class Meta:
        model = Profile
        fields = [
            'avatar',
            'user',
            'full_name'
        ]


class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = '__all__'