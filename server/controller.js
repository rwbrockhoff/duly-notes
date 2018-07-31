module.exports = {
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