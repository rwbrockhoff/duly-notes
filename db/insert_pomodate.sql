update pomodoro
set date = (select date_part('day', age(localtimestamp, 
(select timestamp from pomodoro
where pomodoro_id = $1 and user_id = $2)
)))
where pomodoro_id = $1
and user_id = $2;

