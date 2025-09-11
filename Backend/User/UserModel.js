import mongoose,{Schema, model} from "mongoose";

const userSchema = new Schema(
    {
        FirstName:{type:String, required:true},
        LastName:{type:String, required:true},
        Email:{type:String, required:true, unique:true},
        Password:{type:String, required:true},
        isAdmin:{type:Boolean, default:false}
    }
);
    

export default model("User", userSchema);