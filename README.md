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

## Eigth Commit:

1. Changed lifetime of tokens. Got rid of checkAuthentication action and integrated it into loadUser which is much more efficient
2. Got rid of urls that i dont need anymore
3. uninstall material-ui core and icons and ran npm install @material-ui/core@next @emotion/react @emotion/styled @material-ui/icons@next
4. Did that because material-ui v5 doesnt have that annoying strictmode transtion error and it works good.
5. Added Remember me functionality by storing remember me tokens in localstorage while non remember me tokens in sessionstorage
6. Created registration functionality and logout functionality

## Ninth Commit:

1. Changed some classes in auth.css cause some of them were the exact same so i made it more compact
2. Created actions to activate account, request password reset, and reset password

## Tenth Commit:

1. Created a new alerts reducer which displays error messages or any alerts. It also has an action which clears the alert
2. Created a custom alert component with its own timeout and everything
3. Replaced all the console.logs in auth actions to use the alerts

## Eleventh Commit:

1. Implemented the homepage with posts and menus. Posts are still hard coded

## Twelvth Commit:

1. Set up profile and friendship models and their signals
2. Created a new api app and moved the user views into there
3. Ran npm run build and made a templates folder in there where i put the email templates. also changed the templates setting. the emails work

## Thirteenth Commit:

1. The DEFAULT_AUTHENTICATION_CLASSES setting is given that AnonymousUser has no object profile error even though ur logged in. For testing remove and put back at end
2. Added custom permission. Added a posts app and serializers for it and view

## Fourteenth Commit:

1. Get a Users Profile. Get Any Users Profile. Can Delete a User. Can List a users followers or following list.
2. Added Profile Serializer and Followers/Following Serializer
3. Can List and Create Post from same view

## Fifteenth Commit

1. Added slug field and file extension method to post model and added them to serializer
2. Got rid of static posts and set up new actions and auth to get posts.
3. In HomePage.js HOC added mapped the posts to the homepage.

## Sixteenth Commit:

1. Added a liked boolean to post serializer to tell if request.user has liked a post. Use this in frontend to show a filled in heart if its true
2. Added Like and Unlike functionality using a posts slug

## Seventeenth Commit:

1. Added if postisMine field in serializer to show edit button if its a users post. Changed editpost view to use slug. Post model slug used uuid now
2. Added close button to alerts rather than timeout. Added Comments but havent done anything just placeholder for now. Added the mapping of postIsMine.
3. Changed RightMenu a lot. Added modal to create a post. Created add post action and reducer. Styles for the post modal are in comments.css

## Eighteenth Commit:

1. Created a Notification Model. An obj gets created when a post is liked. Notification serializer and view to view all notifications
2. Got rid of user serializer and now we get the users profile when we login and run loaduser. Add unreadNotifications field to profile serializer
3. Added notifications modal to navbar and added the unreadNotifications number as the badge number. Clear posts and alerts when we log out

## Nineteenth Commit:

1. Changed Notifications Serializer to return fields we actually use. Added View to delete notfication. Changed View to get notification and change them to read after getting. When creating like noti, added check to not add noti if it already exists.
2. Changed primary theme color to blue. Changed style of alerts. Create an action to create a success alert. Created a separate alerts.js actions file.
3. Added alt tags to Avatar components for seo.
4. Created get notifications action and delete notifcation action. Notifcations mapped in modal.

## Twentieth Commit

1. Integrated Add Post into navbar instead. Changed the right menu to include followers and following instead.
2. Changed Post and Profile save method to resize images on upload

## Twenty First Commit

1. Changed follower/following serializer to include if request user is following the person or not.
2. Created ability to fetch followers and following list. Styled it as well

## Twenty Second Commit

1. Updated requirements txt. Created view and url to filter users by slug. Created url patterns for robots.txt and manifest.json and favicons
2. Added 404 page. Created a separate search bar component with new styles and everything.
3. Turned off annoying autocomplete to every form

## Twenty Third Commit

1. Added custom pagination to posts view. Added Search User serializer, Search User view, and the custom pagination for the view. Changed dimension of saved posts
2. Made post images responsive. Created Search User functionality view new types, actions, and piece of state in general reducer.
3. Also changed post action to use pagination url to implement Infinite scroll

## Twenty Fourth Commit

1. Added areFollowing field to profile serializer to check if user is following the profile.
2. Added viewProfile action to get profile to display in the rightMenu.
3. Changed rightMenu to show anyprofile. Changed some logic on the follow unfollow btns
4. Put the avatar of user in navbar so on click it shows their profile in the rightmenu

## Twenty Five Commit

1. added areFollowing field to profileserializer to show if user has requested, follows, or isnt following a user. Getting type of notification to show accept or decline button if its a follow notification.
2. Added view to follow, accept, or decline follow request.
3. Added ternary to show settings btn on users profile but following status on other users profiles.
4. Added action to send follow request. Added action to accept or decline follow request

## Twenty Six Commit

1. Returning if requested in follower/following modal. Recreated Follow/UnFollow View. Made friendship a foreign key to notification and if deleted notification is also deleted
2. Added new action and reducer to remove notifications from state. it doesn't send any requests. Added logic to follow, unfollow users from rightmenu and follower/following modals.
3. Created action to clear posts.

## Twenty Seventh Commit

1. Created Profile HOC to show profiles and their posts. Got rid of the just the right menu change cause its inefficient
2. Everything isnt done mac is trash so saving changes then going on pc.

## Twenty Eighth Commit

1. Modified the profile HOC so it works completely now. Made a separate component for adding posts cause its a big comp. Removed the add post from the navbar to make it less large.
2. Added links to the profile hoc everywhere.

## Twenty Ninth Commit

1. Successfully added try except to resize images so no issue posting videos. Added functionality to change the username if we change the slug.
2. Successfully resized images and videos to fit into a 600x670 div. The styles for images is in all in Post.js and its all inline. For videos its videoplayer.css and its in .video and .video_wrapper
3. Added settings component so user can update profile. Changed muted state of video into redux so if user unmutes one, all are then unmuted. Added a new type for this. Changed the avatar in leftwidgets to be 56x56
4. Created action to update profile. Also added a reloadPage object into general state to reload the page so that the posts that are already loaded can get rerendered with the correct username and avatar.

## 30th Commit

1. Created a Comments and Replies serializer, views with pagination, and their urls. Added throttling to search bar to 15 a minute. Created a replies model as well and custom 500 and 404 handlers
2. Created a new secondary color. Customized scroll bar. Integrated video and img uploading into 1 and added a placeholder gif searcher. Got rid of audio. Got rid of gif profile pics. Removed required astrick on lots of inputs for better look.
3. Created new types, reducers, and actions to get comments, get replies, and add comments or replies. Replies also load by load more button.
4. So basically we can gets comments. Create comments. Get replies to comments and load more replies by clicking a button. We can also create replies and reply to other replies.

## 31th Commit

1. Added bookmarked field to post serializer to check if we bookmarked a post. Created a bookmark model, serializer, view to list, create, and delete bookmarks, and urls for it. Created action to add or remove bookmark
2. Added a private field to profile model to see if profile is private. Added a field in settings to update it. Also created checks to not display private profiles' posts or followers
3. Brought left widget options into left widget container.
