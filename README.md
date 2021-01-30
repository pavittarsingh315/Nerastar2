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

## Seventh Commit:

1. Made a custom login serializer and view. Changed minor styles
2. Changed some actions and reducers to be more efficient and correct.

## Eigth Conmmit:

1. Changed lifetime of tokens. Got rid of checkAuthentication action and integrated it into loadUser which is much more efficient
2. Got rid of urls that i dont need anymore
3. uninstall material-ui core and icons and ran npm install @material-ui/core@next @emotion/react @emotion/styled @material-ui/icons@next
4. Did that because material-ui v5 doesnt have that annoying strictmode transtion error and it works good.
5. Added Remember me functionality by storing remember me tokens in localstorage while non remember me tokens in sessionstorage
6. Created registration functionality and logout functionality
