update notes
set memorygradient = $1
where author_id = $2
and note_id = $3;

select * from notes
where author_id = $2
order by timestamp desc;

