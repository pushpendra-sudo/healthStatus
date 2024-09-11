const mongoose = require('mongoose');

const HealthStatusSchema = mongoose.Schema({
    moodRatting :{
    	type:String,
    	default:""
    } ,
    anxietyLevels :{
    	type:String,
    	default:""
    } ,
    sleepPattern :{
    	type:String,
    	default:""
    } ,
    socalInteractions:{
    	type:String,
    	default:""
    } ,
    physicalActivity:{
    	type:String,
    	default:""
    } ,
    stressLevel:{
    	type:String,
    	default:""
    } ,
    symptomsOfDeoression :{
    	type:String,
    	default:""
    } ,
    deletedAt:{
    	type: String,
        default: "0"
    } 
}, {
    timestamps: true
});


module.exports = mongoose.model('HealthStatus', HealthStatusSchema);