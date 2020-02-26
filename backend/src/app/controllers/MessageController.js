import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const client = new PrismaClient();

class MessageController {
    async index(req,res) {
        const data = await client.message.findMany({
            include: {
                user: {
                    select: {password: false, id: true, email: true, name: true}
                }
            }
        });
        return res.send({data});
    }

    async store(req,res) {
        const {content} = req.body;
        const {authorization} = req.headers;
        const [_, token] = authorization.split(' ');
        const verified = jwt.verify(token,'2d51571fa2269a26e4a987d83e0d2a45');
        const message = await client.message.create({
            data: {
                content,
                user: {
                    connect: {
                        id: verified.id
                    }
                }
            },
            include: {
                user: true,
            }
        })
        return res.send(message);
    }
}

module.exports = new MessageController();