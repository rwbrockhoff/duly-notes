UPDATE notes
SET title = $1, content = $2, timestamp = LOCALTIMESTAMP
WHERE author_id = $3
and note_id = $4;

select * from notes
where author_id = $3
order by timestamp desc;