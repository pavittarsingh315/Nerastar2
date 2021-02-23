from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from PIL import Image


class SiteUserManager(BaseUserManager):
    def create_user(self, email, username, full_name, password=None):
        if not email:
            raise ValueError('Please enter a valid email address.')
        if not username:
            raise ValueError('Username is taken.')
        if not full_name:
            raise ValueError('Please enter your full name.')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            full_name=full_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, full_name, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            full_name=full_name,
            password = password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class SiteUser(AbstractBaseUser):
    email = models.EmailField(verbose_name='email', max_length=100, unique=True)
    username = models.CharField(max_length=30, unique=True)
    full_name = models.CharField(max_length=90)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    objects = SiteUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def save(self, *args, **kwargs):
        Profile.objects.filter(user=self).update(slug=self.username)
        return super().save(*args, **kwargs)


class Profile(models.Model):
    full_name = models.CharField(max_length=200, blank=True)
    user = models.OneToOneField(SiteUser, on_delete=models.CASCADE)
    bio = models.TextField(default="Just Vibin'", max_length=300)
    avatar = models.ImageField(default='avatar.png', upload_to='avatars')
    following = models.ManyToManyField(SiteUser, blank=True, related_name='following')
    followers = models.ManyToManyField(SiteUser, blank=True, related_name='followers')
    slug = models.SlugField(unique=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def number_following(self):
        return self.following.all().count()

    def number_followers(self):
        return self.followers.all().count()

    def __str__(self):
        return f"{self.user}"

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)

        img = Image.open(self.avatar.path)

        if img.height > 603 or img.width > 643:
            output_size = (643, 603)
            img.thumbnail(output_size)
            img.save(self.avatar.path)



STATUS_CHOICES = (
    ('send', 'send'),
    ('accepted', 'accepted'),
    ('ignore', 'ignore')
)
class Friendship(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='receiver')
    status = models.CharField(max_length=8, choices=STATUS_CHOICES)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender} sent to {self.receiver} -- {self.pk}'


class Notifications(models.Model):
    NOTIFICATION_TYPES = (
        ('Like', 'Like'),
        ('Comment', 'Comment'),
        ('Follow', 'Follow')
    )

    # To avoid that import loop error, import a model like this. <appName.modelName>
    post = models.ForeignKey('posts.Post', on_delete=models.CASCADE, related_name='notification_post', blank=True, null=True)
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='notification_sender')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='notification_receiver')
    notificationType = models.CharField(max_length=7, choices=NOTIFICATION_TYPES)
    message = models.TextField(max_length=200, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'
        ordering = ('-created',)

    def __str__(self):
        return f'{self.receiver}: {self.message}'