from flask import request, session, jsonify, request
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_login import login_required, current_user
from config import app, db, api
from models import User, Post , Comment, Like
import requests

# Routes go here!

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/sports')
def sports_page():
    scores = []
    r = requests.get('https://www.balldontlie.io/api/v1/games')
    data = r.json()
    for game in data['data']:
        scores.append({
            'home_team': game['home_team']['full_name'],
            'home_score': game['home_team_score'],
            'away_team': game['visitor_team']['full_name'],
            'away_score': game['visitor_team_score']
        })
    response = jsonify(scores)
    response.status_code = 200
    return response



class Signup(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')
        

        user = User(
            username=username,
            password=password
        )

        
        user.password_hash = password

        print('first')

        try:

            print('here!')

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            print(user.to_dict())

            return user.to_dict(), 201

        except IntegrityError:

            print('no, here!')
            
            return {'error': '422 Unprocessable Entity'}, 422


class CheckSession(Resource):
    
    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401


class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401


class Logout(Resource):
    
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401


class CreatePost(Resource):
    
    @login_required
    def post(self):
        
        text = request.json.get('text')

        if not text:
            return jsonify({'message': 'Post cannot be empty'}), 400

        post = Post(text=text, author=current_user.id)
        db.session.add(post)
        db.session.commit()

        return jsonify({'message': 'Post created!'}), 201
    
class DeletePost(Resource):

    @login_required
    def delete(self, post_id):
        post = Post.query.get(post_id)

        if not post:
            return jsonify({'message': 'Post not found'}), 404

        if post.author != current_user.id:
            return jsonify({'message': 'Not authorized to delete this post'}), 401

        db.session.delete(post)
        db.session.commit()

        return jsonify({'message': 'Post deleted!'}), 200

class CreateComment(Resource):

    @login_required
    def post(self, post_id):
        text = request.json.get('text')

        if not text:
            return jsonify({'message': 'Comment cannot be empty'}), 400

        post = Post.query.get(post_id)

        if not post:
            return jsonify({'message': 'Post not found'}), 404

        comment = Comment(text=text, author=current_user.id, post=post.id)
        db.session.add(comment)
        db.session.commit()

        return jsonify({'message': 'Comment created!'}), 201
    
class Like(Resource):
    @login_required
    def post(self, post_id):
        post = Post.query.get(post_id)

        if not post:
            return jsonify({'message': 'Post not found'}), 404

        if post.author == current_user.id:
            return jsonify({'message': 'Cannot like your own post'}), 401

        like = Like(author=current_user.id, post=post.id)
        db.session.add(like)
        db.session.commit()

        return jsonify({'message': 'Post liked!'}), 201
    
class Unlike(Resource):
    login_required
    def delete(self, post_id):
        post = Post.query.get(post_id)

        if not post:
            return jsonify({'message': 'Post not found'}), 404

        like = Like.query.filter(Like.author == current_user.id, Like.post == post.id).first()

        if not like:
            return jsonify({'message': 'Post not liked'}), 400

        db.session.delete(like)
        db.session.commit()

        return jsonify({'message': 'Post unliked!'}), 200
    


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CreatePost, '/create-post', endpoint='create_post')
api.add_resource(DeletePost, '/delete-post/<int:post_id>', endpoint='delete_post')
api.add_resource(CreateComment, '/create-comment/<int:post_id>', endpoint='create_comment')
api.add_resource(Like, '/like/<int:post_id>', endpoint='like')
api.add_resource(Unlike, '/unlike/<int:post_id>', endpoint='unlike')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


