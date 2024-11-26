#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Channel, Post, Comment


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route("/channels", methods=["GET", 'POST'])
def show_channels():
    if request.method == "GET":
        channels = Channel.query.all()
        all_channels = []

        for channel in channels:
            channel_data = {
                "id": channel.id,
                "title": channel.title,
                "description": channel.description,
                "created_at": channel.created_at,
                "posts": [{"id": post.id, "title": post.title} for post in channel.posts],
                "users": [{"username": user.user.username} for user in channel.users]
            }
            all_channels.append(channel_data)

        return make_response(all_channels, 200)
    
    elif request.method == "POST":
        data = request.get_json()
        print(data)
        new_channel = Channel(
            title=data["title"],
            description=data["description"]
        )
        db.session.add(new_channel)
        db.session.commit()
        return new_channel.to_dict(), 201

        

@app.route('/channels/<string:title>')
def channel(title):
    channel = Channel.query.filter(Channel.title == title).first()
    channel_response = {
        "title": channel.title,
        "description": channel.description
    }
    response = make_response(
        channel_response,
        200
    )
    return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)

