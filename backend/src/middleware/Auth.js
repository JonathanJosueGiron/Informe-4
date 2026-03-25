import jwt from 'jsonwebtoken'

export function auth(req, res, next){
    const token = req.cookies.token
    if (!token) return res.sendStatus(401)
    try{
        const decoded = jwt.verify(token, "secret")
        req.user = decoded
        next()
    } catch {
        res.sendStatus(403)
    }
}