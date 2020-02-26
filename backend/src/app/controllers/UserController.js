import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const client = new PrismaClient({debug: true});

class UserController {
    async store(req,res) {
        const {email, name, password} = req.body;
        const hashed_password = await bcrypt.hash(password, 15);
        const user = await client.user.create({
            data: {
                email: email,
                name: name,
                password: hashed_password,
            }
        });

        return res.send(user);
    }

    async login(req, res) {
        const {user, password} = req.body;
        const data = await client.user.findMany({
            where: {
                OR: 
                [
                    {
                        name: user
                    },
                    {
                        email: user
                    }
                ]
            },
        })
        const [uniqueUser] = data;
        const checkLogin = await bcrypt.compare(password, uniqueUser.password);
        if(checkLogin) {
            uniqueUser.password = "";
            const token = jwt.sign(uniqueUser, '2d51571fa2269a26e4a987d83e0d2a45', {
                expiresIn: 600
            })
            return res.send({uniqueUser, token});
        }
        return res.send(403,{message: 'User dont exists'})
    }
}

module.exports = new UserController();