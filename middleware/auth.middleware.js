export const isAuthorized=async(req, res, next)=>{
    try {
        const bearer=req?.header?.authorization;
        if(!bearer){
            res.status(403).json("Invalid token bearer")
        }
        const token=bearer.split(' ')[1] || '';
        if(!token){
            res.status(403).json("Invoalid token ")
        }
    } catch (error) {
        
    }
}