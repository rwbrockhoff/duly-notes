update notes
set memory = (select date_part('day', age(localtimestamp, 
(select timestamp from notes
where note_id = $1 and author_id = $2)
)))
where note_id = $1
and author_id = $2;