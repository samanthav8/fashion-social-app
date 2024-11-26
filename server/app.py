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

@app.route('/channels/<string:name>')
def channel(name):
    channel = Channel.query.filter(Channel.name == name).first()
    channel_response = {
        "name": channel.name,
        "description": channel.description
    }
    response = make_response(
        channel_response,
        200
    )
    return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)

