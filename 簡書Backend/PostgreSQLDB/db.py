from app import db

followers = db.Table(
    "followers",
    db.Column("follower_id",db.Integer, db.ForeignKey("Users.id")),
    db.Column("followed_id",db.Integer, db.ForeignKey("Users.id")),
)

likes = db.Table(
    "likes",
    db.Column("postid",db.Integer,db.ForeignKey("Posts.id")),
    db.Column("userid",db.Integer,db.ForeignKey("Users.id")),
)

class Comments(db.Model):
    __tablename__ = "Comments"
    id = db.Column(db.Integer,primary_key=True,nullable=False)
    time = db.Column(db.String,nullable=False)
    content = db.Column(db.String,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)
    post_id = db.Column(db.Integer,db.ForeignKey("Posts.id"),nullable=False)

    def __repr__(self):
        return '<Comment %s>' % self.content


class Posts(db.Model):
    __tablename__ = "Posts"
    id = db.Column(db.Integer,primary_key=True,nullable=False)
    content = db.Column(db.ARRAY(db.String),nullable=False)
    title = db.Column(db.String,nullable=False)
    image = db.Column(db.String,nullable=False)
    time = db.Column(db.String,nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey("Users.id"),nullable=False)
    comments = db.relationship("Comments", backref=db.backref("comments", lazy = True))

    def __repr__(self):
        return "<Post %s>"%self.title

class Event(db.Model):
    __tablename__ = "Event"
    id = db.Column(db.Integer,primary_key=True,nullable=False)
    content = db.Column(db.String,nullable=False)
    time = db.Column(db.String,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)

    def __repr__(self):
        return "<Event %s>" % self.content


class Users(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.Integer,primary_key=True,nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    account = db.Column(db.String(), unique=True,nullable=False)
    password = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    picture = db.Column(db.String,nullable=True)
    post = db.relationship("Posts", backref=db.backref("author", lazy = True))
    post_number = db.Column(db.Integer,nullable=False)
    likes_post = db.relationship(
        "Posts", secondary=likes, backref=db.backref("liker"))
    followed = db.relationship(
        "Users", secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref("followers",lazy=True)
    )

    def __repr__(self):
        return "<User %s>"%self.username

    @staticmethod
    def validate_username(username):
        if Users.query.filter_by(username=username).first():
            return True
        else:
            return False

    @staticmethod
    def validate_account(account):
        if Users.query.filter_by(account=account).first():
            return True
        else:
            return False

    @staticmethod
    def validate_email(email):
        if Users.query.filter_by(email=email).first():
            return True
        else:
            return False

