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

const edit = async (req, res) => {
    const user = req.authData.user

    const { title, text } = req.body
    const blogId = parseInt(req.params.id)

    await prisma.blog.update({
        where: { id: blogId, authorId: user.id },
        data: { title, text }
    })

    res.json({ message: 'Blog Edited Successfully!' })
}

module.exports = {
    index,
    create,
    edit
}