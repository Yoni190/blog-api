const { prisma } = require('../lib/prisma')

const index = async (req, res) => {
    const blogId = parseInt(req.query.blogId)

    const comments = await prisma.comment.findMany({
        where: { blogId },
        include: { user: {
            select: {
                username: true
            }
        } }
    })

    res.json({ comments })
}

const create = async (req, res) => {
    const user = req.authData.user
    // const blogId = parseInt(req.query.blogId)
    const { text, blogId } = req.body

    await prisma.comment.create({
        data: {
            text,
            blogId,
            userId: user.id
        }
    })

    res.json({ message: 'Comment Created Successfully!' })
}

const edit = async (req, res) => {
    const user = req.authData.user
    const commentId = parseInt(req.params.id)
    const { text } = req.body

    await prisma.comment.update({
        where: { id: commentId, userId: user.id},
        data: { text }
    })

    res.json({ message: 'Comment Updated Successfully!' })
}

const destroy = async (req, res) => {
    const user = req.authData.user
    const commentId = parseInt(req.params.id)
    
    await prisma.comment.delete({
        where: { id: commentId, userId: user.id }
    })

    res.json({ message: 'Comment Deleted Successfully!' })
}

module.exports = {
    index,
    create,
    edit,
    destroy
}