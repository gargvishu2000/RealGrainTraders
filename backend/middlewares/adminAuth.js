import jwt from 'jsonwebtoken';

const adminAuth = async (req,res,next)=>{
    try {
        const {token} = req.headers;
        if(!token){
            return res.json({success:false, message:"Unauthorized Admin User"});
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);   
        if(decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASS){
            return res.json({success:true, message: "Not authorized login again"})
        }
        next();     
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

export default adminAuth;