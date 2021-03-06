import mongoose , { Schema } from 'mongoose';
import { USER } from '../constants/index';
const UserSchema = new Schema({
    id:String,
    name:String,
    email:String,
    password:String,
    registerTime:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        default:USER.ROLE.NORMAL
    },
    status:{
        type:String,
        default:USER.STATUS.ACTIVE
    },
    score:{
        type:Number,
        default:0
    },
    tag:{
        type:String,
        default:""
    }

});
UserSchema.statics.findByName=function(params,cb){
    return this.findOne(params,cb);
}


mongoose.model('User',UserSchema);
