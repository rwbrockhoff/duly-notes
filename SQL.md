create table users (
id text, 
fullName text,
email varchar(120)
)

//------//

insert into users (id, fullName, email)
VALUES ($1, $2, $3)

