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
POST /auth/signup HTTP/1.1
Host: ec2-35-169-227-105.compute-1.amazonaws.com
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache
Postman-Token: b14952e6-7d5e-7645-97e4-159d931adbc6

name=Ruslan&email=nikolaevra%40gmail.com&password=12345678
```
