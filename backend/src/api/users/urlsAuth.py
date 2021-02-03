from django.urls import path
from .viewsAuth import (
        GetUserView, 
        LoginView,
        RegisterView, 
        ActivateAccount, 
        RequestPasswordReset, 
        PasswordResetConfirm
    )

urlpatterns = [
    path('currentuser/', GetUserView.as_view(), name='current-user'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('activate/', ActivateAccount.as_view(), name='activate'),
    path('reset-password/', RequestPasswordReset.as_view(), name='reset-password'),
    path('reset-password-confirm/', PasswordResetConfirm.as_view(), name='reset-password-confirm')
]