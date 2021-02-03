from rest_framework.permissions import BasePermission, SAFE_METHODS


class OnlyPostOwnerCanEdit(BasePermission):
    message = 'ERROR! You are not allowed to make changes as you are not the owner!'

    def has_object_permission(self, request, view, obj):
        # This means if the request.method is either get, options, or head which can only view data, grant permission
        if request.method in SAFE_METHODS:
            return True

        # this means if obj.creator is the request.user.profile, return True and grant permission, if theyre not equal, return false and deny permission
        return obj.creator == request.user.profile


class OnlyProfileOwnerCanCreatePost(BasePermission):
    message = 'ERROR! You are not allowed to make create a post for this user!'

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        profile = request.user.profile.slug
        # this gets the slug from url and checks if its equal to the logged in user's profile slug
        slug = request.resolver_match.kwargs.get('slug')
        return slug == profile