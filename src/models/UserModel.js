const { default: mongoose } = require("mongoose");

const UserSchema=new mongoose.Schema({
    UserName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
});
const User= mongoose.models.User || mongoose.model("User",UserSchema);

export default User;