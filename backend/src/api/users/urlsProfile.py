from django.urls import path
from .viewsProfiles import (
        UserProfile, 
        AnyUserProfile, 
        DeleteUser, 
        ListFollowersOrFollowing, 
        GetUserNotifications,
        DeleteNotification
    )



urlpatterns = [
    path('profile/', UserProfile.as_view()),
    path('notifications/', GetUserNotifications),
    path('deletenotification/<int:pk>/', DeleteNotification),
    path('anyprofile/<str:slug>/', AnyUserProfile.as_view()),
    path('delete-account/<str:slug>/', DeleteUser),
    # remember for this one you need the ?type=... look at the view for more info
    path('followers-following/<str:slug>/', ListFollowersOrFollowing.as_view())
]
