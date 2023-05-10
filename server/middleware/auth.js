import jwt from 'jsonwebtoken'
const secret = 'confidential'

export default async(req,res,next) => {
    const token = req.headers['authorization'].split(' ')[1]

    try{
        const decoded = await jwt.verify(token,secret)
        console.log(decoded,' is decoded')
        req.userId = decoded?.id

        next()
    }
    catch(error){
        console.log(error)
    }
    // console.log(token)
    //console.log(token)
    // console.log(req.headers[tokenHeaderKey])
}
