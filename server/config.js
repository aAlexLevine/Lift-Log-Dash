module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || 'secret key',
    options: {
            expiresIn: '1d'
        },
        cookie: {
            httpOnly: true,
            sameSite: true,
            signed: true,
        }
      }
}