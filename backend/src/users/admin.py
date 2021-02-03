from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import SiteUser, Profile, Friendship

admin.site.site_header = "Nerastar Admin"
admin.site.site_title = "Nerastar Administration"
admin.site.index_title = "Nerastar Administration Page"

class UserAdmin(UserAdmin):
    list_display = ('id', 'email', 'username', 'full_name', 'is_superuser', 'is_active')
    list_display_links= ('id', 'email')
    search_fields = ('email', 'username', 'full_name')
    readonly_fields = ('last_login',)

    filter_horizontal = ()
    list_filter = ('is_active', 'is_staff', 'is_superuser', 'is_admin')
    fieldsets = (
        ('Login', {'fields': ('email', 'username', 'password')}),
        ('Personal', {'fields': ('full_name', 'last_login')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_admin', 'is_superuser',)})
    )


admin.site.register(SiteUser, UserAdmin)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'slug', 'created')
    search_fields = ('user', 'full_name', 'slug')
    readonly_fields = ('created',)

    filter_horizontal = ()
    fieldsets = (
        ('Account Information', {'fields': ('user', 'full_name', 'slug', 'created', 'following', 'followers')}),
        ('Customization', {'fields': ('bio', 'avatar')}),
    )

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Friendship)