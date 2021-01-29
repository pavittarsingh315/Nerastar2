from django.urls import path
from .views import RegisterView, ActivateAccount, RequestPasswordReset, PasswordResetConfirm

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('activate/', ActivateAccount.as_view(), name='activate'),
    path('reset-password/', RequestPasswordReset.as_view(), name='reset-password'),
    path('reset-password-confirm/', PasswordResetConfirm.as_view(), name='reset-password-confirm')
]