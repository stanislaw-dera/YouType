require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto');

const prisma = new PrismaClient()

const SALT_ROUNDS = 10
const ACCESS_COOKIE_MAX_AGE = 120
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_COOKIE_MAX_AGE = 60 * 60 * 24 * 90
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET


module.exports.postSignIn = async (req, res) => {

    // find user by email
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })

    // return error if user doesn't exist    
    if (user == null) {
        res.status(400).json({
            error: "user-not-found"
        })
        return 0;
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) {
        res.status(400).json({
            error: "invalid-password"
        })
        return 0;
    }

    // create refresh token
    const refreshTokenInDb = await prisma.token.create({
        data: {
            userId: user.id
        }
    })

    const refreshToken = jwt.sign({ id: refreshTokenInDb.id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_COOKIE_MAX_AGE })
    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_COOKIE_MAX_AGE })

    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: ACCESS_COOKIE_MAX_AGE * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: REFRESH_COOKIE_MAX_AGE * 1000 });

    res.status(200).send()
}

module.exports.postSignUp = async (req, res) => {

    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS)

    await prisma.user.create({
        data: {
            email: req.body.email,
            password: hash
        }
    })

    res.status(200).send()
}
