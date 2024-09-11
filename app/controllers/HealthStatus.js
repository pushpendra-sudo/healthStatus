const HealthStatus = require('../models/HealthStatusModel.js');


exports.postHealthStatus = async (req, res) => {
    try {
        let item = await HealthStatus.create({
            moodRatting:req.body.moodRatting,
            anxietyLevels:req.body.anxietyLevels,
            sleepPattern:req.body.sleepPattern,
            socalInteractions:req.body.socalInteractions,
            physicalActivity:req.body.physicalActivity,
            stressLevel:req.body.stressLevel,
            symptomsOfDeoression:req.body.symptomsOfDeoression
        });
    
        res.status(200).json({
            'status': 200,
            'data': item ,
            'message': "Health status post successfully"
        });
    } catch (error) {
        console.error(error);
    }
}

exports.getHealthStatus = async (req, res) => {
    try {
        let healthStatus = await HealthStatus.find({ deletedAt: "0"});
        res.status(200).json({
            'status': "200",
            'data': healthStatus ,
            'message': "All health status"
        });
    } catch (error) {
        console.error(error);
    }
}

// exports.updateItemType = async (req, res) => {
//     try {
//         let item = await ItemType.findOneAndUpdate({ _id:req.params.itemId, deletedAt:"0"},{ '$set': { itemName: req.body.itemName } },{ new: true });
//         console.log("item---->", item)
//         if(!item){
// 			return res.status(200).json({
//                // "status_code": 400,
//                 "status": "0",
//                 "data":{},
//                 "message": "you are not a valid user!!"
//             });
// 		}
//         res.status(200).json({
//         	//"status_code": 200,
//             'status': "1",
//             'data': item ,
//             'message': "Delivery item update successfully"
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }

// exports.deleteItemType = async (req, res) => {
//      try {
//         let item = await ItemType.findOneAndUpdate({ _id:req.params.itemId , deletedAt:"0" },{
//         	deletedAt: "1"
//         },{
//         	new: true
//         });
//         if(!item){
// 			return res.status(200).json({
//                // "status_code": 400,
//                 "status": "0",
//                 "data": {},
//                 "message": "you are not a valid user!!"
//             });
// 		}
//         //console.log("item---->", item)
//         res.status(200).json({
//         	//"status_code": 200,
//             'status': "1",
//             'data': item ,
//             'message': "Delivery item deleted successfully"
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }