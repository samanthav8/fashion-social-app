from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Relationships
    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    channels = db.relationship('UserChannel', back_populates='user')

    serialize_rules = ('-posts.user', '-comments.user', '-channels.user')

    def __repr__(self):
        return f'<User {self.username}>'

class Channel(db.Model, SerializerMixin):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Relationships
    posts = db.relationship('Post', back_populates='channel')
    users = db.relationship('UserChannel', back_populates='channel')

    serialize_rules = ('-posts.channel', '-users.channel')

    def __repr__(self):
        return f'<Channel {self.title}>'


class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Foreign keys and relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'))

    user = db.relationship('User', back_populates='posts')
    channel = db.relationship('Channel', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post')

    serialize_rules = ('-user.posts', '-channel.posts', '-comments.post')

    def __repr__(self):
        return f'<Post {self.title}>'

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Foreign keys and relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')

    serialize_rules = ('-user.comments', '-post.comments')

    def __repr__(self):
        return f'<Comment {self.content}>'

class UserChannel(db.Model, SerializerMixin):
    __tablename__ = 'user_channels'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'))

    user = db.relationship('User', back_populates='channels')
    channel = db.relationship('Channel', back_populates='users')

    serialize_rules = ('-user.channels', '-channel.users')

    def __repr__(self):
        return f'<UserChannel User: {self.user_id}, Channel: {self.channel_id}>'
