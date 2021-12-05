const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports.getPosts = async (req, res) => {
    const allPosts = await prisma.post.findMany()
    res.json(allPosts)
}