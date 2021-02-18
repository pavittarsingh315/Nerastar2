from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

# Media imports
from django.conf import settings
from django.conf.urls.static import static

# Favicon
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

# JWT imports
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/jwtoken/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# React Urls
urlpatterns += [
    path('robots.txt', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),
    path('manifest.json', TemplateView.as_view(template_name='manifest.json', content_type='text/plain')),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('images/favicon.ico'))),
    path('logo192.png', RedirectView.as_view(url=staticfiles_storage.url('images/logo192.png'))),
    path('logo512.png', RedirectView.as_view(url=staticfiles_storage.url('images/logo512.png')))
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]