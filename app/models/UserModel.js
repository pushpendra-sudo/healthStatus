const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const UserSchema = mongoose.Schema({
    username :{
    	type:String,
        default:""
    } ,
    email:{
    	type:String,
         default:""
    } ,
    password:{
    	type:String,
        default:""
    } ,
    first_name:{
        type:String,
        default:""
    },
    last_name :{
    	type:String,
         default:""
    } ,
    phone:{
    	type:String,
         default:""
    } ,
    gender:{
    	type:String,
         default:""
    } ,
    deviceToken:{
        type:String,
        default:""
    },
    deletedAt:{
    	type: String,
        default:"0"
    } 
}, {
    timestamps: true
});

UserSchema.pre('save', function(next){
        this.password = bcrypt.hashSync(this.password, saltRounds);
        next();	
     });

module.exports = mongoose.model('User', UserSchema);