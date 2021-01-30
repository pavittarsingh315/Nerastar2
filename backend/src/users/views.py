from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, generics
from rest_framework import status

from .serializers import UserSerializer, LoginSerializer

# these are all the imports for user email verification
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.core.mail import EmailMessage

# Password Reset
from django.contrib.auth.tokens import PasswordResetTokenGenerator

# Tokens
from rest_framework_simplejwt.tokens import RefreshToken


class GetUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class LoginView(generics.GenericAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })


class RegisterView(APIView):
    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request, format=None):
        data = self.request.data

        name = data['name']
        username = data['username']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            elif User.objects.filter(username=username).exists():
                return Response({'error': 'Username is taken'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                if len(password) < 8:
                    return Response({'error': 'Password must be at least 8 characters'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    user = User.objects.create_user(full_name=name, username=username, email=email, password=password)
                    user.is_active = False
                    user.save()
                    
                    current_site = get_current_site(request)
                    mail_subject = 'Complete your registration for Nerastar!'
                    message = render_to_string('users/acc_activate_email.html', {
                        'user': user,
                        'domain': current_site.domain,
                        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                        'token': account_activation_token.make_token(user),
                    })
                    to_email = email
                    email = EmailMessage(
                        mail_subject, message, to=[to_email]
                    )
                    email.send()
                    return Response({'success': 'Account created successfully! Please check your email to activate you account!'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)


class ActivateAccount(APIView):
    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request, format=None):
        data = self.request.data
        uidb64 = data['uid']
        token = data['token']

        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'success': 'Your account has been activated!'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Activation link is invalid'}, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordReset(APIView):
    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request):
        data = request.data
        email = data['email']

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)

            current_site = get_current_site(request)
            mail_subject = 'Nerastar Password Reset'
            message = render_to_string('users/request_password_reset.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': PasswordResetTokenGenerator().make_token(user),
            })
            to_email = email
            email = EmailMessage(
                mail_subject, message, to=[to_email]
            )
            email.send()

            return Response({'success': 'An email has been sent to you with further instructions!'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'A user with this email does not exist'}, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirm(APIView):
    permission_classes = [
        permissions.AllowAny
    ]
    
    def post(self, request):
        data = self.request.data
        uidb64 = data['uid']
        token = data['token']
        password = data['password']
        password2 = data['password2']

        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and PasswordResetTokenGenerator().check_token(user, token):
            if password == password2:
                if len(password) < 8:
                    return Response({'error': 'Password must be at least 8 characters'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    user.set_password(password)
                    user.save()
                    return Response({'success': 'Your password has been reset!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Link is invalid'}, status=status.HTTP_400_BAD_REQUEST)