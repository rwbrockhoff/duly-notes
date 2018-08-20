module.exports = {
    checkuser: (req, res, next) => {
        const dbInstance = req.app.get('db');
        
        dbInstance.check_user(sub).then(userStatus => {
    
            res.status(200).send(userStatus)
        })
    },

    register: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {given_name, family_name} = req.session.user;
        let fullName = given_name + " " + family_name;

        const { sub, email } = req.session.user;
        
        dbInstance.create_user([sub, fullName, email]).then( res => {
            res.sendStatus(200)
        })
    },
    logout: (req, res, next) => {
        req.session.destroy()
        res.sendStatus(200);
    },
    getnotes: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { sub } = req.session.user;

        
        
        dbInstance.get_notes(sub).then( notes => {
            for(let i = 0; i < notes.length; i++){
                dbInstance.insert_timestamp(notes[i].note_id, sub)
            }
            dbInstance.get_notes(sub).then( notesupdated => {
                
                res.status(200).send(notesupdated)
            })
            
        })
    },

    updatenote: (req, res, next) => {
        const dbInstance = req.app.get('db');
        
        const {title, content, note_id} = req.body;
        const {sub} = req.session.user;
        
        dbInstance.update_note([title, content,sub, note_id]).then( notes => {
            res.status(200).send(notes);
        })
    },

    updatenotetitle: (req, res, next) => {
        const dbInstance = req.app.get('db');
        
        const {title, note_id} = req.body;
        const {sub} = req.session.user;
        
        dbInstance.update_notetitle([title, sub, note_id]).then( notes => {
            res.status(200).send(notes);
        })
    },

    deleteNote: (req, res, next) => {
        const dbInstance = req.app.get('db');
        
        const {id} = req.params
        const {sub} = req.session.user;
       
        dbInstance.delete_note([sub, id]).then( notes => {
            res.status(200).send(notes)
        })
    },

    createnote: (req, res, next) => {
        const dbInstance = req.app.get('db');

        const {title, content} = req.body;
        const {sub} = req.session.user;


        dbInstance.create_note([title, content, sub]).then( notes => {
            res.status(200).send(notes)
        })
    },

    changetheme: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {theme} = req.body;
        const {sub} = req.session.user;
        
        dbInstance.changetheme([theme, sub]).then(data => {
            res.sendStatus(200)
        })
    },

    addpomodoro: (req, res, next) => {
        const dbInstance = req.app.get('db');

        const {sub} = req.session.user
        const {sessionCount} = req.body

        dbInstance.insertpomodoro([sub, sessionCount]).then(pomo => {
           res.sendStatus(200);
        })
    },

    getpomodoro: (req, res, next) => {
        
        const dbInstance = req.app.get('db');
        const {sub} = req.session.user

        dbInstance.getpomodoro(sub).then(pomo => {
            
            for(let i = 0; i < pomo.length; i++){
                dbInstance.insert_pomodate(pomo[i].pomodoro_id, sub)
            }     
        }).then( () => {
            dbInstance.getpomodoro(sub).then(updatedpomo => {
                res.status(200).send(updatedpomo)
            })
        })
    }, 
    
    pomodorotoggle: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {sub} = req.session.user
        const {pomodoroToggle} = req.body;
        
        dbInstance.pomodorotoggle([pomodoroToggle, sub]).then( () => {
            res.sendStatus(200)
        })
    },

    memorygradient: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {sub} = req.session.user;
        const {memorygradient, note_id} = req.body;

        dbInstance.memorytoggle([memorygradient, sub, note_id]).then( notes => {
            res.status(200).send(notes)
        })
    }
}