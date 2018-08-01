insert into notes (title, content, author_id, timestamp)
VALUES ($1, $2, $3, localtimestamp);

select * from notes
where author_id = $3
order by timestamp desc;