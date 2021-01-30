# Nerastar 2

## First Commit:

1. Install django packages. Created and cleaned up react.
2. Ran cd frontend and del /F /S /Q /A .git and rmdir /s /q .git
3. Setup env vars, templates dir, installed apps, DRF settings, static and media settings, and email
4. Added custom font and color theme to react

## Second Commit

1. Added django-cors-headers and pip froze requirements
2. Started users app and created custom user model and registration view and url
3. Token, media, and user app urls set up

## Third Commit

1. Integrated custom user account activation email
2. Have to figure out a way to integrate acc_activation_email.html with the build folder

## Fourth Commit:

1. Setup password reset functionality

## Fifth Commit:

1. Setup basic react boilerplate

## Sixth Commit:

1. Added url to verify access token. Created new serializer, view, and url to get a user for loadUser
2. Setup PrivateRoute and integrated redux for auth.
3. We can login and loadUser and check if authenticated when page is loaded
4. In auth actions, implemented the functionality of the refresh token to send a request and get a new access token.
