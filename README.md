# node-angular-crud-tutorial
Tutorial for witing CRUD with NodeJs-Angularjs on Mysql database

## Before we start: Create project and the database

I created database "crud" with table "messagetable"
'''
create database crud;
use crud;
create table messagetable(id int not null auto_increment primary key, username varchar(100) not null, message varchar(100) not nul);
'''

##  #1 lesson: Saving message to database
For saving data to the database you should create service witch makes request to the server.
On the server you have to catch this request and make responce actions.
