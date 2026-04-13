const { prisma } = require('../lib/prisma')

const index = async (req, res) => {
    const blogId = parseInt(req.params.id)

    const comments = await prisma.comment.findMany({
        where: { blogId }
    })

    res.json({ comments })
}

module.exports = {
    index
}