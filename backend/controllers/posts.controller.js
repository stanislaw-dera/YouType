const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports.getPosts = async (req, res) => {
    const allPosts = await prisma.post.findMany()
    res.json(allPosts)
}

module.exports.postPost = async (req, res) => {

    await prisma.post.create({
        data: {
            title: req.body.title,
            content: req.body.content,
            published: req.body.published,
            authorId: req.decodedToken.id
        }
    })

    res.status(200).send()
}
