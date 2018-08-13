select * from notes
join users
on notes.author_id = users.id
where author_id = $1
order by timestamp desc;


