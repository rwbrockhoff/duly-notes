create table users (
id varchar(80) primary key,
fullName text,
email varchar(120)
)

//------//

insert into users (id, fullName, email)
VALUES ($1, $2, $3)

//-----//


age (date, current_date),
date current_date



create table notes (

note_id serial primary key,
title text,
content text,
author_id varchar(80) references users(id),
access_date date,
age interval

)

select * from users
left join notes 
on users.id = notes.author_id
where id = 'google-oauth2|103947273324697076686'