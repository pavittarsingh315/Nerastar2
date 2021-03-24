from django.contrib import admin
from .models import Post, Comment, Like, Replies


admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Replies)