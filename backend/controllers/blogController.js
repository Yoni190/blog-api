const { prisma } = require('../lib/prisma')

const index = async (req, res) => {
    const userId = req.authData.user.id

    const blogs = await prisma.blog.findMany({
        where: { authorId: userId }
    })

    res.json({ blogs })
}

const create = async (req, res) => {
    const user = req.authData.user

    if(user.role !== 'AUTHOR') {
        return res.sendStatus(403)
    }

    const { title, text } = req.body

    await prisma.blog.create({
        data: {
            title,
            text,
            authorId: user.id
        }
    })

    res.json({ message: 'Message Created' })
}

module.exports = {
    index,
    create
}