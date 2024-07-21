const jwt = require("jsonwebtoken")
const jwtKey = process.env.jwtKey
const auth= (req, res, next)=>{
    const token = req.headers.authorization
    if(token){
        try{
            const decoded = jwt.verify(token.split(' ')[1], jwtKey)
            // console.log(decoded)
            if(decoded){
                req.body.userName = decoded.userName
                req.body.userID = decoded.userID
                next()
            }else{
                res.send({'msg':'Please Login!'})
            }
        }catch(err){
            res.send({'err':err.message})
        }
    }else{
        res.send('Please Login!')
    }
}

module.exports = {auth}