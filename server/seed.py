#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Channel, Post, Comment, UserChannel

with app.app_context():
    User.query.delete()
    Channel.query.delete()
    Post.query.delete()
    Comment.query.delete()
    UserChannel.query.delete()
    db.session.commit()

    u1 = User(username="sam.vill", email="sam@gmail.com", password="123Sam")
    u2 = User(username="justin", email="justin@gmail.com", password="321Justin")

    c1 = Channel(title="Welcome", description="Welcome to Fashion Social App")
    c2 = Channel(title="Hottest Trends", description="Discuss the latest trends.")

    p1 = Post(title="Margiela Tabi", content="I want a pair of tabi's so bad", channel=c1, user=u1)
    p2 = Post(title="Faux fur jackets", content="Fauz fur jackets are everywhere", channel=c2, user=u2)

    com1 = Comment(content="Me too!", post=p1, user=u2)
    com2 = Comment(content="I have seen them all over my fyp", post=p2, user=u1)

    uc1 = UserChannel(user=u1, channel=c1)
    uc2 = UserChannel(user=u1, channel=c2)
    uc3 = UserChannel(user=u2, channel=c1)
    uc4 = UserChannel(user=u2, channel=c2)


    db.session.add_all([u1, u2, c1, c2, p1, p2, com1, com2, uc1, uc2, uc3, uc4])
    db.session.commit()




if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
