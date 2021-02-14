from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth import authenticate
from users.models import Profile, Friendship, Notifications


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Login Failed. Please check your credentials.")


class ProfileFollowingFollowerSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    slug = serializers.SerializerMethodField()

    def get_avatar(self, obj):
        return ("http://localhost:8000" + str(obj.profile.avatar.url))

    def get_name(self, obj):
        return obj.profile.full_name

    def get_slug(self, obj):
        return obj.profile.slug

    class Meta:
        model = User
        fields = [
            'username',
            'avatar',
            'name',
            'slug'
        ]


class ProfileSerializer(serializers.ModelSerializer):
    # this and get_user return the profile user's username rather than just the id
    user = serializers.SerializerMethodField()
    unreadNotifications = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.user.username

    def get_unreadNotifications(self, obj):
        return Notifications.objects.filter(is_read=False, receiver=obj).count()

    class Meta:
        model = Profile
        fields = [
            'id',
            'full_name',
            'user',
            'bio',
            'avatar',
            'slug',
            'number_following',
            'number_followers',
            'unreadNotifications'
        ]


# class NotificationSerializer(serializers.ModelSerializer):
#     post = serializers.SerializerMethodField()
#     sender = serializers.SerializerMethodField()
#     receiver = serializers.SerializerMethodField()

#     def get_post(self, obj):
#         return obj.post.slug

#     def get_sender(self, obj):
#         return obj.sender.user.username

#     def get_receiver(self, obj):
#         return obj.post.creator.user.username

#     class Meta:
#         model = Notifications
#         fields = [
#             'id',
#             'notificationType',
#             'message',
#             'created',
#             'is_read',
#             'post',
#             'sender',
#             'receiver'
#         ]


class NotificationSerializer(serializers.ModelSerializer):
    post = serializers.SerializerMethodField()
    sender = serializers.SerializerMethodField()
    senderAvatar = serializers.SerializerMethodField()

    def get_post(self, obj):
        return obj.post.slug

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
            'senderAvatar'
        ]