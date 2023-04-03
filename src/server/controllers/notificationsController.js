const User = require("../models/user");
const Job = require("../models/Job")
const { db } = require("../models/user");
var sesh;


//SendNotification controller
const sendNotification = async (req,res) =>{

    let userPreferences;
    let userGlobal;
    const userID = req.params.userID;
    
    try{
        const user = await User.findOne({_id: userID}).then((user) =>{
        userGlob = user;
        userPreferences = user.preferences;
    })}
    catch(err){
        console.log(err)
    }

    if(userPreferences.category.length == 0 && userPreferences.work_type.length == 0 && userPreferences.location.length== 0 ){
        res.send(401).json({message:"User has not set any preferences"})
    }

    const userJob = await Job.find({category: userPreferences.category, location: userPreferences.location, work_type:userPreferences.work_type}).then((UserJob) =>{
        if (UserJob){
            const latestJob = UserJob.pop();
            res.status(200).json({latestJob});
        }
        else{
            return res.status(400).json({ message: "No jobs exist" });
        }
    })
}


module.exports = {
    sendNotification
}