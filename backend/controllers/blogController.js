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

    const { title, text, isPublished } = req.body

    await prisma.blog.create({
        data: {
            title,
            text,
            isPublished,
            authorId: user.id
        }
    })

    res.json({ message: 'Message Created' })
}

const edit = async (req, res) => {
    const user = req.authData.user

    const { title, text, isPublished } = req.body
    const blogId = parseInt(req.params.id)

    await prisma.blog.update({
        where: { id: blogId, authorId: user.id },
        data: { title, text, isPublished }
    })

    res.json({ message: 'Blog Edited Successfully!' })
}

const destroy = async (req, res) => {
    const user = req.authData.user

    const blogId = parseInt(req.params.id)

    await prisma.blog.delete({
        where: { id: blogId, authorId: user.id }
    })

    res.json({ message: 'Blog Deleted Successfully!' })
}

const updatePublishStatus = async (req, res) => {
    const user = req.authData.user

    const blogId = parseInt(req.params.id)

    const { isPublished } = req.body

    await prisma.blog.update({
        where: { id: blogId, authorId: user.id },
        data: { isPublished }
    })

    res.json({ message: "Blog Publish Status Updated Successfully!" })
}

module.exports = {
    index,
    create,
    edit,
    destroy,
    updatePublishStatus
}