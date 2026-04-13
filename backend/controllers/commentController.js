const { prisma } = require('../lib/prisma')

const index = async (req, res) => {
    const blogId = parseInt(req.query.blogId)

    const comments = await prisma.comment.findMany({
        where: { blogId }
    })

    res.json({ comments })
}

const create = async (req, res) => {
    const user = req.authData.user
    const blogId = parseInt(req.query.blogId)
    const { text } = req.body

    await prisma.comment.create({
        data: {
            text,
            blogId,
            userId: user.id
        }
    })

    res.json({ message: 'Comment Created Successfully!' })
}

module.exports = {
    index,
    create
}