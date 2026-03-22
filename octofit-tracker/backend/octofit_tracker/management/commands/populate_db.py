from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import connection
from djongo import models

from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users (superheroes)
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', first_name='Tony', last_name='Stark'),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='password', first_name='Peter', last_name='Parker'),
            User.objects.create_user(username='batman', email='batman@dc.com', password='password', first_name='Bruce', last_name='Wayne'),
            User.objects.create_user(username='superman', email='superman@dc.com', password='password', first_name='Clark', last_name='Kent'),
        ]

        # Assign users to teams
        marvel.members.add(users[0], users[1])
        dc.members.add(users[2], users[3])

        # Create Activities
        Activity.objects.create(user=users[0], type='Run', duration=30, distance=5)
        Activity.objects.create(user=users[1], type='Swim', duration=45, distance=2)
        Activity.objects.create(user=users[2], type='Cycle', duration=60, distance=20)
        Activity.objects.create(user=users[3], type='Yoga', duration=40, distance=0)

        # Create Workouts
        Workout.objects.create(name='Morning Cardio', description='Cardio session for all')
        Workout.objects.create(name='Strength Training', description='Strength session for all')

        # Create Leaderboard
        Leaderboard.objects.create(user=users[0], points=100)
        Leaderboard.objects.create(user=users[1], points=90)
        Leaderboard.objects.create(user=users[2], points=80)
        Leaderboard.objects.create(user=users[3], points=70)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
