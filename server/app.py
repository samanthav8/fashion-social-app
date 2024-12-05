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
# Resources
class ChannelResource(Resource):
    def get(self, channel_id=None):
        if channel_id is None:
            channels = Channel.query.all()
            all_channels = [
                {
                    "id": channel.id,
                    "title": channel.title,
                    "description": channel.description,
                    "created_at": channel.created_at,
                    "posts": [{"id": post.id, "title": post.title} for post in channel.posts],
                    "users": [{"username": user.user.username} for user in channel.users]
                }
                for channel in channels
            ]
            return make_response(all_channels, 200)
        
        # Fetch a single channel with its posts
        channel = Channel.query.get_or_404(channel_id)
        channel_data = {
            "id": channel.id,
            "title": channel.title,
            "description": channel.description,
            "posts": [
                {
                    "id": post.id,
                    "title": post.title,
                    "content": post.content,
                    "comments": [{"id": comment.id, "content": comment.content} for comment in post.comments]
                }
                for post in channel.posts
            ]
        }
        return make_response(channel_data, 200)

    def post(self):
        data = request.get_json()
        new_channel = Channel(
            title=data["title"],
            description=data["description"]
        )
        db.session.add(new_channel)
        db.session.commit()
        return make_response(new_channel.to_dict(), 201)


class PostResource(Resource):
    def get(self, channel_id=None):
        if channel_id is not None:
            posts = Post.query.filter_by(channel_id=channel_id).all()
            channel_posts = [
                {
                    "id": post.id,
                    "title": post.title,
                    "content": post.content,
                    "channel_id": post.channel_id,
                    "comment_count": len(post.comments)  # Add comment count
                }
                for post in posts
            ]
            return make_response(channel_posts, 200)

        posts = Post.query.all()
        all_posts = [
            {
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "channel_id": post.channel_id,
                "comment_count": len(post.comments)
            }
            for post in posts
        ]
        return make_response(all_posts, 200)

class SinglePostResource(Resource):
    def get(self, post_id):
        post = Post.query.get_or_404(post_id)
        post_data = {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "comments": [{"id": comment.id, "content": comment.content} for comment in post.comments]
        }
        return make_response(post_data, 200)



class CommentResource(Resource):
    def get(self, user_id):
        comments = Comment.query.filter_by(user_id=user_id).all()
        user_comments = [
            {
                "id": comment.id,
                "content": comment.content,
                "post_id": comment.post_id
            }
            for comment in comments
        ]
        return make_response(user_comments, 200)

    def post(self):
        data = request.get_json()
        new_comment = Comment(
            content=data["content"],
            user_id=data["user_id"],
            post_id=data["post_id"]
        )
        db.session.add(new_comment)
        db.session.commit()
        return make_response(new_comment.to_dict(), 201)

    def patch(self, comment_id):
        comment = Comment.query.get_or_404(comment_id)
        data = request.get_json()
        if "content" in data:
            comment.content = data["content"]
        db.session.commit()
        return make_response(comment.to_dict(), 200)

    def delete(self, comment_id):
        comment = Comment.query.get_or_404(comment_id)
        db.session.delete(comment)
        db.session.commit()
        return make_response({"message": "Comment deleted successfully"}, 200)


# API Routes
api.add_resource(ChannelResource, '/channels', '/channels/<int:channel_id>')
api.add_resource(PostResource, '/posts', '/posts/channel/<int:channel_id>') 
api.add_resource(SinglePostResource, '/posts/<int:post_id>')
api.add_resource(CommentResource, '/comments/<int:user_id>', '/comments', '/comments/<int:comment_id>')


# Base route
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)
