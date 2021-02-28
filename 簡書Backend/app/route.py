from flask import request
from app import app,db,bcrypt
from PostgreSQLDB.db import Users,Posts,Event,Comments
from PIL import Image
from base64 import encodebytes
import io
from datetime import datetime
from sqlalchemy import desc


@app.route("/")
def test():
    return {"success":"101"}

@app.route("/initDB")
def initDB():
    db.create_all()
    db.session.commit()
    return {"success":"102"}

@app.route('/InitPage')
def initPage():
    post = Posts.query.order_by(desc(Posts.id)).limit(3).all()
    articleList = []
    for item in post:
        object = {
            "title": item.title,
            "image": item.image,
            "content": item.content,
            "id": item.id,
            "thumb":len(item.liker),
            "comment":len(item.comments)
        }
        articleList.append(object)
    return {'topicList': [{
        "id": 1,
        "title": "社會熱點",
    },
        {
            "id": 2,
            "title": "手繪",
        }],
        "articleList1":articleList
    }

@app.route("/getMoreList/<int:page>")
def getMore(page):
    post = Posts.query.order_by(desc(Posts.id)).limit(9).all()
    if (page > 2):
        return {"list": []}
    elif(page == 1):
        result = []
        for index,item in enumerate(post):
            if index not in [3,4,5]:
                continue
            object = {
                "title": item.title,
                "image": item.image,
                "content": item.content,
                "id": item.id,
                "thumb": len(item.liker),
                "comment": len(item.comments)
            }
            result.append(object)
        return {"list":result}
    elif (page == 2):
        result = []
        for index,item in enumerate(post):
            if index not in [6,7,8]:
                continue
            object = {
                "title": item.title,
                "image": item.image,
                "content": item.content,
                "id": item.id,
                "thumb": len(item.liker),
                "comment": len(item.comments)
            }
            result.append(object)
        return {"list":result}

@app.route("/login",methods=["POST"])
def login():
    req = request.get_json(force=True)
    account = req["account"]
    password = req["password"]
    user = Users.query.filter_by(account = account).first()
    if not user:
        user = Users.query.filter_by(email = account).first()
    if user:
        check = bcrypt.check_password_hash(user.password,password)
        if check:
            return {"success":"100","username":user.username,"userPic":user.picture,"userEmail":user.email,"userid":user.id,"userPostNum":user.post_number}
        else:
            return {"success":'400',"message":"密碼錯誤"}
    return {"success":"400","message":"帳戶不存在"}


@app.route("/register",methods=['POST'])
def register():
    req = request.get_json(force = True)
    username = req['username']
    account = req["account"]
    password = bcrypt.generate_password_hash(req["password"]).decode("utf-8")
    if Users.validate_account(account):
        return {"success":'400',"message":"帳戶已使用"}
    if Users.validate_username(username):
        return {"success":"400","message":'用戶名已使用'}
    user = Users(username=username,account=account,password=password,post_number=0)
    db.session.add(user)
    db.session.commit()
    return {"success":"100"}

@app.route("/changeUserSetting",methods=["POST"])
def changeUserSetting():
    time_now = datetime.now()
    dt_string = time_now.strftime("%Y-%m-%d %H:%M:%S")
    image = request.files.get('userPic')
    username = request.form["username"]
    userNewName = request.form["userNewName"]
    userEmail = request.form.get("userEmail")
    user = Users.query.filter_by(username=username).first()
    if userEmail:
        if userEmail!=user.email:
            if Users.validate_account(userEmail):
                return {"success":"400","message":"信箱已使用"}
            user.email = userEmail
            db.session.add(user)
            event = Event(user_id=user.id, content="綁定信箱 : %s" % userEmail, time=dt_string)
            db.session.add(event)
            db.session.commit()
    else:
        userEmail = ""
    if image != None:
        img = Image.open(image)
        byte_arr = io.BytesIO()
        img.save(byte_arr,format="PNG")
        encode_img = encodebytes(byte_arr.getvalue()).decode("ascii")
        user.picture = encode_img
        if user.username != userNewName:
            if Users.validate_username(userNewName):
                return {"success": "400", "message": "用戶名已使用"}
            user.username = userNewName
            event = Event(user_id=user.id, content="更換了暱稱 : %s" % userNewName, time=dt_string)
            db.session.add(event)
            db.session.commit()
        db.session.add(user)
        db.session.commit()
        event = Event(user_id=user.id, content="更換了大頭貼照片", time=dt_string)
        db.session.add(event)
        db.session.commit()
        return {"success":"100","userPic":encode_img,"userEmail":userEmail,"userNewName":userNewName}
    if user.username != userNewName:
        if Users.validate_username(userNewName):
            return {"success": "400", "message": "用戶名已使用"}
        user.username = userNewName
        event = Event(user_id=user.id, content="更換了暱稱 : %s" % userNewName, time=dt_string)
        db.session.add(event)
        db.session.commit()
    return {"success":"100","userEmail": userEmail, "userNewName": userNewName}

@app.route("/getWriter")
def getWriter():
    user = Users.query.order_by(desc(Users.post_number)).limit(4).all()
    listOutput = []
    for item in user:
        posts = Posts.query.filter_by(user_id = item.id).all()
        thumbCount = 0
        for post in posts:
            thumbCount = thumbCount + len(post.liker)
        object = {
            "username":item.username,
            "info":item.post_number,
            "userPic":item.picture,
            "userid":item.id,
            "userThumb":thumbCount
        }
        listOutput.append(object)
    return {"success":"100","writer":listOutput}

@app.route("/Article",methods=["GET","POST","DELETE"])
def Article():
    if request.method == "GET":
        post_id = request.values["postid"]
        username = request.values["username"]
        user = Users.query.filter_by(username=username).first()
        post = Posts.query.filter_by(id=post_id).first()
        comment = Comments.query.filter_by(post_id=post_id).all()
        comment_list = []
        for item in comment:
            useras = Users.query.filter_by(id=item.user_id).first()
            temp = {
                "username": useras.username,
                "userPic": useras.picture,
                "content": item.content,
                "time": item.time,
                "commentid": item.id,
                "userid": useras.id
            }
            comment_list.append(temp)
        comment_list.reverse()
        if user:
            likeOrNot = post in user.likes_post
            return {"postid": post.id, "postTitle": post.title, "postPic": post.image, "postContent": post.content,
                    "postAuthor": post.author.username, "postTime": post.time, "postThumb": len(post.liker),
                    "like": likeOrNot, "comment": comment_list}
        else:
            return {"postid": post.id, "postTitle": post.title, "postPic": post.image, "postContent": post.content,
                    "postAuthor": post.author.username, "postTime": post.time, "postThumb": len(post.liker),
                    "comment": comment_list}

    elif request.method == "POST":
        username = request.form["username"]
        user = Users.query.filter_by(username=username).first()
        time_now = datetime.now()
        dt_string = time_now.strftime("%Y-%m-%d %H:%M:%S")
        title = request.form["title"]
        image = request.files["image"]
        img = Image.open(image)
        byte_arr = io.BytesIO()
        img.save(byte_arr, format="PNG")
        encode_img = encodebytes(byte_arr.getvalue()).decode("ascii")
        content = request.form["content"]
        content = content.split("\n")
        post = Posts(user_id=user.id,title=title,content=content,image=encode_img,time=dt_string)
        db.session.add(post)
        db.session.commit()
        user.post_number = user.post_number + 1
        db.session.add(user)
        db.session.commit()
        event = Event(user_id=user.id,content="新增新聞 標題為: %s"%title,time=dt_string)
        db.session.add(event)
        db.session.commit()
        return {"success":"100"}
    elif request.method == "DELETE":
        req = request.get_json(force=True)
        time_now = datetime.now()
        dt_string = time_now.strftime("%Y-%m-%d %H:%M:%S")
        postid = req["postid"]
        post = Posts.query.filter_by(id=postid).first()
        comments = post.comments
        for item in comments:
            db.session.delete(item)
        user = post.author
        db.session.delete(post)
        db.session.commit()
        user.post_number = user.post_number - 1
        db.session.add(user)
        db.session.commit()
        event = Event(user_id=user.id, content="刪除新聞 標題為: %s " % post.title, time=dt_string)
        db.session.add(event)
        db.session.commit()
        return {"success": "100"}

@app.route("/userPage")
def userPage():
    userid = request.values["userid"]
    currentUsername = request.values["currentUser"]
    currentUser = Users.query.filter_by(username=currentUsername).first()
    user = Users.query.filter_by(id = userid).first()
    posts = Posts.query.filter_by(user_id = user.id).all()
    alreadtfollow = currentUser in user.followers
    fansCount = len(user.followers)
    followCount = len(user.followed)
    thumbCount = 0
    articleList = []
    for item in posts:
        thumb = len(item.liker)
        object = {
            "title":item.title,
            "image":item.image,
            "content":item.content,
            "id":item.id,
            "thumb": thumb,
            "comment":len(item.comments)
        }
        thumbCount = thumbCount + thumb
        articleList.append(object)
    events = Event.query.filter_by(user_id = user.id).order_by(desc(Event.id)).limit(10).all()
    event_list = []
    for item in events:
        object = {
            "content":item.content,
            "time":item.time,
            "id":item.id
        }
        event_list.append(object)
    return {"success":'100',"eventList":event_list,'articleList':articleList,"username":user.username,'userPic':user.picture,"userPost":user.post_number,"userThumb":thumbCount,"userFans":fansCount,"userFollow":followCount,"alreadyFollow":alreadtfollow}


@app.route("/thumbArticle",methods=["POST"])
def thumbArticle():
    req = request.get_json(force=True)
    time_now = datetime.now()
    dt_string = time_now.strftime("%Y-%m-%d %H:%M:%S")
    username = req["username"]
    articleid = req["articleid"]
    thumb = req["thumb"]
    user = Users.query.filter_by(username = username).first()
    post = Posts.query.filter_by(id = articleid).first()
    if thumb:
        user.likes_post.append(post)
        db.session.add(user)
        db.session.commit()
        event = Event(user_id=user.id, content="點讚了標題為 %s 的新聞" % post.title, time=dt_string)
        db.session.add(event)
        db.session.commit()
        return {"success": "100","result":"add"}
    else:
        user.likes_post.remove(post)
        db.session.add(user)
        db.session.commit()
        event = Event(user_id=user.id, content="收回讚了標題為 %s 的新聞" % post.title, time=dt_string)
        db.session.add(event)
        db.session.commit()
        return {"success":"100","result":"minus"}

@app.route("/follow",methods=["POST"])
def follow():
    req = request.get_json(force=True)
    time_now = datetime.now()
    dt_string = time_now.strftime("%Y-%m-%d %H:%M:%S")
    username = req["username"]
    targetUserID = int(req["targetUserid"])
    follow = req["follow"]
    user_following = Users.query.filter_by(username=username).first()
    user_followed = Users.query.filter_by(id=targetUserID).first()
    if follow:
        user_following.followed.append(user_followed)
        event = Event(user_id=user_following.id, content="關注了 %s " % user_followed.username, time=dt_string)
        db.session.add(event)
        db.session.commit()
    else:
        user_following.followed.remove(user_followed)
        event = Event(user_id=user_following.id, content="取消關注了 %s " % user_followed.username, time=dt_string)
        db.session.add(event)
        db.session.commit()
    db.session.add(user_followed)
    db.session.commit()
    return {"result":follow}

@app.route("/Comment",methods=["POST","DELETE","PUT"])
def Comment():
    if request.method == "POST":
        time_now = datetime.now()
        dt_string = time_now.strftime("%Y-%m-%d %H:%M:%S")
        req = request.get_json(force=True)
        userid = req["userid"]
        user = Users.query.filter_by(id=userid).first()
        content = req["content"]
        post_id = req["postid"]
        comment = Comments(user_id=userid,time=dt_string,content=content,post_id=post_id)
        db.session.add(comment)
        event = Event(user_id=userid, content="於 %s 發佈了一則新評論" % dt_string, time=dt_string)
        db.session.add(event)
        db.session.commit()
        return {"success":'100',"username":user.username,"userPic":user.picture,"time":dt_string,"userid":user.id,"commentid":comment.id}
    elif request.method == "DELETE":
        time_now = datetime.now()
        dt_string = time_now.strftime("%Y-%m-%d %H:%M:%S")
        req = request.get_json(force=True)
        commentid = req["commentid"]
        userid = req["userid"]
        event = Event(user_id=userid, content="於 %s 刪除了一則評論" % dt_string, time=dt_string)
        db.session.add(event)
        comment = Comments.query.filter_by(id = commentid).first()
        db.session.delete(comment)
        db.session.commit()
        return {"success":"100"}
    elif request.method == "PUT":
        time_now = datetime.now()
        dt_string = time_now.strftime("%Y-%m-%d %H:%M:%S")
        req = request.get_json(force=True)
        userid = req["userid"]
        commentid = req["commentid"]
        editContent = req["editContent"]
        comment = Comments.query.filter_by(id=commentid).first()
        comment.content = editContent
        comment.time = dt_string
        db.session.add(comment)
        event = Event(user_id=userid, content="於 %s 編輯了一則評論" % dt_string, time=dt_string)
        db.session.add(event)
        db.session.commit()
        return {"success":"100","time":dt_string}


