import jwt  from "jsonwebtoken"
const resetSecretKey=process.env.RESET_TOKEN

export const verifyResetToken=(token)=>{
try {
    const data=jwt.verify(token,resetSecretKey)
    if(data){
        return Promise.resolve({data})
    }
} catch (error) {
    return Promise.reject(error)
    
}
}

