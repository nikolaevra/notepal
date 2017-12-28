# notepal

##Completed:
* Build authentication, login/logout/signup functionality + DB CRUD operations
* Build algorithm to merge changes of other people into the existing file 

##TODO:
* Build a basic text editor (markdown?)
* Build react router
* Build file storage solution S3?
* Build file access APIs

# API Documentation
User Signup
```
POST /auth/signup HTTP/1.1
Host: ec2-35-169-227-105.compute-1.amazonaws.com
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache
Postman-Token: b14952e6-7d5e-7645-97e4-159d931adbc6

name=Ruslan&email=nikolaevra%40gmail.com&password=12345678
```

User Login
```
POST /auth/login HTTP/1.1
Host: ec2-35-169-227-105.compute-1.amazonaws.com
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache
Postman-Token: a757a573-c9b0-12d5-a580-e49803f77e99

email=nikolaevra%40gmail.com&password=12345678
```

Get all User Posts
```
GET /api/files HTTP/1.1
Host: ec2-35-169-227-105.compute-1.amazonaws.com
Authorization: Bearer <User-Token>
Cache-Control: no-cache
Postman-Token: f65979e3-388a-5bea-6588-5777edd66354

```

POST: `/file/new`
```
POST /api/file/new HTTP/1.1
Host: ec2-35-169-227-105.compute-1.amazonaws.com
Authorization: Bearer <User-Token>
Cache-Control: no-cache
Postman-Token: ade067bc-ea03-e78d-f1c4-f9bfb9d4f812
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

```

GET: `/file/:fileid`
