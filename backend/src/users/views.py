from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status


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
                    user.save()
                    return Response({'success': 'Account created successfully!'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_200_OK)
