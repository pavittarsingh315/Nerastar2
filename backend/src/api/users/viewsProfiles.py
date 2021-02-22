from rest_framework import viewsets, permissions, generics, status, filters, pagination
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Project imports
from users.models import Friendship, SiteUser, Profile, Notifications
from .serializers import ProfileSerializer, ProfileFollowingFollowerSerializer, NotificationSerializer, SearchUser


# gets logged in user's profile. only place where profile can be editted and only the owner can edit it here
class UserProfile(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile


# gets profile of any user so when a user wants to view darkstar's profile this endpoint will give that
class AnyUserProfile(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        profileSlug = self.kwargs['slug']
        if Profile.objects.filter(slug=profileSlug).exists():
            return Profile.objects.get(slug=profileSlug)
        else:
            return Profile.objects.get(slug=self.request.user.username)


# To view a users followers or following list, send a request here to get the list.
class ListFollowersOrFollowing(generics.ListAPIView):
    serializer_class = ProfileFollowingFollowerSerializer

    # format for the url: http://localhost:8000/api/followers-following/dark-star/?type=following
    # this means for the user with profile.slug dark-star, get their following list. if it was ?type=followers, get their followers list.
    def get_queryset(self):
        profileSlug = self.kwargs['slug']
        listType = self.request.query_params.get('type', None)
        profile = Profile.objects.get(slug=profileSlug)
        if listType == 'following':
            followList = profile.following.all()
        elif listType == 'followers':
            followList = profile.followers.all()
        return followList


class SearchUserPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class SearchUser(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = SearchUser
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug', '^full_name']
    pagination_class = SearchUserPagination

    # '^' starts with search
    # '=' exact match
    # '@' full text search
    # '$' regex search


@api_view(['GET'])
def GetUserNotifications(request):
    user = request.user

    if request.method == 'GET':
        profile = user.profile
        allNotifications = Notifications.objects.filter(receiver=profile)
        serializer = NotificationSerializer(allNotifications, many=True)
        unreadNotifications = Notifications.objects.filter(
            receiver=profile, is_read=False)
        if unreadNotifications:
            for unread in unreadNotifications:
                unread.is_read = True
                unread.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def DeleteNotification(request, pk):
    user = request.user
    if Notifications.objects.filter(pk=pk, receiver=user.profile).exists():
        notification = Notifications.objects.get(pk=pk).delete()
        return Response({'success': 'Deleted!'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Notification does not exist'}, status=status.HTTP_404_NOT_FOUND)


# Deletes a user from the user model which deletes everything about that user
@api_view(['DELETE'])
def DeleteUser(request, slug):
    user = request.user
    if Profile.objects.filter(slug=slug).exists():
        profile = Profile.objects.get(slug=slug)
        if user.profile == profile:
            user = profile.user
            user.delete()
            msg = {
                "msg": f"User {user.username} deleted!"
            }
            return Response(msg, status=status.HTTP_200_OK)
        else:
            msg = {
                "msg": f"You are not the owner of {profile.user.username}"
            }
            return Response(msg, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'This user does not exist'}, status=status.HTTP_404_NOT_FOUND)
