const jwt = require("jsonwebtoken");
const secretkey = process.env.secretkey;

const verifyToken = async (req, res, next) => {
    const accessToken = req.headers.authorization.split(' ')[1]
    try {
        if (!accessToken) {
            return res.status(400).json({ success: 'false', msg: 'please sign in first' });
        } else {
            const validateToken = await jwt.verify(accessToken, secretkey);
            if (validateToken) {
                req.authenticated = true;
                req.id = validateToken // this is the information response of the user sent to client
                return next()
            }
        }
    } catch (error) {
        if (accessToken.length < 5) {
            return res.status(400).json({ success: "false", msg: "please sign in first", state: "uptodate" })
        } else {
            return res.json({ success: 'false', msg: 'Token has expired.... please sign in', state: "expired" })
        }
    }
}

module.exports = verifyToken;