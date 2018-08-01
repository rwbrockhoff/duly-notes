select * from notes
where author_id = $1
order by timestamp desc;


