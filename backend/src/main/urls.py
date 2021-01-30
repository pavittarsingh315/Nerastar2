from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

# Media imports
from django.conf import settings
from django.conf.urls.static import static

# JWT imports
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/jwtoken/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/jwtoken/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/jwtoken/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/users/', include('users.urls')),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
