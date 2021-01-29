from django.urls import path
from .views import RegisterView, ActivateAccount

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('activate/', ActivateAccount.as_view(), name='activate'),
]