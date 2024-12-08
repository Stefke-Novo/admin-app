function check_role(user_role, wanted_role){
    return user_role===wanted_role
}
async function user_request_check(req,res,next){
    role = req.body.user.role
    if(!(check_role(role,"user"))){
        res.status(401).send("Unauthorized role");
        return;
    }
    next();
}
async function admin_request_check(req,res,next){
    role = req.body.admin.role
    if(!(check_role(role,"admin"))){
        res.status(401).send("Unauthorized role");
        return;
    }
    next();
}
module.exports = {user_request_check, admin_request_check};