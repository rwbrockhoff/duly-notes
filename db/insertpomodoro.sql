insert into pomodoro(user_id, sessioncount, timestamp)
VALUES ($1, $2, localtimestamp);

select sessioncount, timestamp from pomodoro 
where user_id = $1;

