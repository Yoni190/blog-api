const { prisma } = require('../lib/prisma')

const index = async (req, res) => {
    const userId = req.authData.user.id

    const blogs = await prisma.blog.findMany({
        where: { authorId: userId }
    })

    res.json({ blogs })
}

module.exports = {
    index
}