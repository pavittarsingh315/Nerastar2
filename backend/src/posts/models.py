from django.db import models
from users.models import Profile


class Post(models.Model):
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='posts')
    content = models.CharField(max_length=150)
    media = models.FileField(upload_to='posts', blank=True)
    liked = models.ManyToManyField(Profile, blank=True, related_name='likes')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.creator} - {self.id}"

    def number_of_likes(self):
        return self.liked.all().count()

    def number_of_comments(self):
        return self.comment_set.all().count()

    class Meta:
        ordering = ('-created',)


class Comment(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    body = models.TextField(max_length=300)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.post} -- comment"


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