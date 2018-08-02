update users
SET customer_id = $1
where id = $2;

select * from users
where id = $2;
