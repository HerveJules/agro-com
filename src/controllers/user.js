import db from '../models';

const { users } = db;

class Users {
    static async createUser(req, res) {
        const {
            email, password, jobtitle, tin
        } = req.body
        try {
            const userFind = await users.findOne({ where: { email }})
            if(userFind) {
              return res.status(400).send({
                status:400,
                errorMessage: 'The User with that email exists'
              })
            }

            const userSave = await users.create({ email, password, jobtitle, tin});
            if(userSave) {
              return res.status(201).send({
                status:201,
                message: 'User has been created',
                user: {
                  email: userSave.email,
                  jobtitle: userSave.jobtitle,
                  tin: userSave.tin
                }
              })
            }

        }
        catch(err) {
          console.log(err);
        }
    }
}

export default Users;