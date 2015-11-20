# node-angular-crud-tutorial
Tutorial for witing CRUD with NodeJs-Angularjs on Mysql database

## Before we start: Create project and the database

I created database "crud" with table "messagetable"
```
create database crud;
use crud;
create table messagetable(id int not null auto_increment primary key, username varchar(100) not null, message varchar(100) not nul);
```

Install node modules (express, mysql, body-parser, jade)
`
npm install
`
##  #1 lesson: Saving message to database
For saving data to the database you should create service witch makes request to the server.
On the server you have to catch this request and make responce actions.

## #2 lesson: Show list of all message
For showing list of all messages, make service with GET request.
Also create this GET request on server side.
Create new partial template with message table and create routing for it.

## #3 lesson: Remove item from database
make DELETE mysql query in server.js
create removeMessage(id) function in your service
run this service function by controller

## #4 lesson: Edit and show single message from database
-write routes for single page and edit page, then create templates for them
-create 2 requests on the server and
-create 2 services for requests above
-include new services to new controller