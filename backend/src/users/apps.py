from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = 'users'

    verbose_name = 'Authentication and Profiles'

    def ready(self):
        import users.signals