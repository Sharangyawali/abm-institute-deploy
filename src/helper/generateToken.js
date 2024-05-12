// import jwt  from "jsonwebtoken"
import * as jose from "jose"

const generateToken=async(user)=>{
    try {
        const alg="HS256"
        const signature=new TextEncoder().encode(process.env.AUTH_TOKEN)
        const data={_id:user._id,role:user.role,name:user.name,email:user.email,phone:user.phone}
        const authToken= await new jose.SignJWT(data).setProtectedHeader({alg}).setExpirationTime("30d").sign(signature)
        return Promise.resolve(authToken)
    } catch (error) {
        return Promise.reject(error)
    }
}

export default generateToken