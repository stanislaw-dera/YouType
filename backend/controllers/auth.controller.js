const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports.postSignIn = async (req, res) => {
    res.status(200).send()
}

module.exports.postSignUp = async (req, res) => {
    res.status(200).send()
}
