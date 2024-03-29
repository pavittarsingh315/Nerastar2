import os
import uuid
from django.db import models
from users.models import Profile
from django.template.defaultfilters import slugify
from PIL import Image


class Post(models.Model):
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='posts')
    content = models.CharField(max_length=150)
    media = models.FileField(upload_to='posts', blank=True)
    media_url = models.CharField(max_length=200, blank=True)
    liked = models.ManyToManyField(Profile, blank=True, related_name='likes')
    slug = models.SlugField(unique=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.creator} - {self.id}"

    def number_of_likes(self):
        return self.liked.all().count()

    def number_of_comments(self):
        return self.comment_set.all().count()

    def extension(self):
        name, extension = os.path.splitext(self.media.name)
        if extension in ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG', '.gif', '.GIF']:
            return 'image'
        if extension in ['.mp4', '.MP4', '.MOV', '.mov']:
            return 'video'
        return 'none'

    def save(self, *args, **kwargs):
        post_slug = slugify(str(self.creator.user.username) + " " + str(uuid.uuid4())[:15].replace('-', '').lower())
        slugExists = Profile.objects.filter(slug=post_slug).exists()
        while slugExists:
            post_slug = slugify(str(self.creator.user.username) + " " + str(uuid.uuid4())[:15].replace('-', '').lower())
            slugExists = Profile.objects.filter(slug=to_slug).exists()
        self.slug = post_slug
        # this has to be after slug save but before image resize
        super(Post, self).save(*args, **kwargs)

        try:
            img = Image.open(self.media.path)

            if img.height > 600 or img.width > 600:
                output_size = (600, 600)
                img.thumbnail(output_size)
                img.save(self.media.path)
        except:
            pass

    class Meta:
        ordering = ('-created',)


class Comment(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    likes = models.ManyToManyField(Profile, blank=True, related_name='commentLikes')
    body = models.TextField(max_length=300)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment #{self.pk}"

    def number_of_likes(self):
        return self.likes.all().count()

    def number_of_replies(self):
        return self.replies_set.all().count()
    
    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'


class Replies(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, default=None)
    likes = models.ManyToManyField(Profile, blank=True, related_name='replyLikes')
    body = models.TextField(max_length=300)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reply #{self.pk}"

    def number_of_likes(self):
        return self.likes.all().count()

    class Meta:
        verbose_name = 'Reply'
        verbose_name_plural = 'Replies'


# To get the like unlike functionality, create a view that checks if request.user is in post's likes and if not then like.
# I already made this view its in ProtoSocial in github in the api/views.py
LIKE_CHOICES = (
    ('Like', 'Like'),
    ('Unlike', 'Unlike')
)


class Like(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    value = models.CharField(choices=LIKE_CHOICES, max_length=8)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} -- {self.post} -- {self.value}"


class Bookmark(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.owner.slug}'s Bookmark #{self.pk}"

    class Meta:
        verbose_name = 'Bookmark'
        verbose_name_plural = 'Bookmarks'
        ordering = ('-created',)
