from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os

secret_key = os.environ.get('SECRET_KEY')
database = os.environ.get('DATABASE_URL')

app = Flask(__name__)
app.config['SECRET_KEY'] = secret_key
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_DATABASE_URI"] = database
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)
from app.route import  *