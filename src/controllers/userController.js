export const getJoin=(req,res)=>res.render("join",{pageTitle:"Join"});
export const postJoin=(req,res)=>{
    console.log(req.body);
};
export const editUser=(req,res)=>res.send("Edit User");
export const removeUser=(req,res)=>res.send("Remove User");
export const logout=(req,res)=>res.send("Log Out");
export const login=(req,res)=>res.send("login");
export const see=(req,res)=>res.send("See");
