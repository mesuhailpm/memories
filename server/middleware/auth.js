import jwt from 'jsonwebtoken'
const secret = 'confidential'

export default async(req,res,next) => {
    const token = await req.headers['authorization'].split(' ')[1]
    console.log(req.headers, ' is req.headers')
    console.log(token,' is token from auth middleware')

    try{
        const decoded = jwt.verify(token,secret)
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
