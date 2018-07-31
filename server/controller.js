module.exports = {
    checkuser: (req, res, next) => {
        const dbInstance = req.app.get('db');

        const {sub} = req.body
        console.log(sub)

        dbInstance.check_user().then(userStatus => {
            console.log(userStatus);
            res.status(200).send(userStatus)
        })
    },

    register: (req, res, next) => {
        const dbInstance = req.app.get('db');

        
        dbInstance.create_user().then( res => {
            res.sendStatus(200)
        })
    },

    login: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.login_user().then( res => {
            res.sendStatus(200);
        })
    }, 

    getnotes: (req, res, next) => {
        const dbInstance = req.app.get('db');

        let {userid} = req.params

        dbInstance.get_notes(userid).then( notes => {
            res.status(200).send(notes)
        })
    }
}