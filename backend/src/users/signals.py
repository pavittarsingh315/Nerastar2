from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile, SiteUser, Friendship


@receiver(post_save, sender=SiteUser)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, full_name=instance.full_name, slug=instance.username)


@receiver(post_save, sender=Friendship)
def add_friends_when_inv_accepted(sender, instance, created, **kwargs):
    inv_sender = instance.sender
    inv_receiver = instance.receiver
    if instance.status == 'ignore':
        Friendship.objects.get(sender=inv_sender, receiver=inv_receiver).delete()
    elif instance.status == 'accepted':
        inv_sender.following.add(inv_receiver.user)
        inv_receiver.followers.add(inv_sender.user)
        inv_sender.save()
        inv_receiver.save()
        Friendship.objects.get(sender=inv_sender, receiver=inv_receiver).delete()