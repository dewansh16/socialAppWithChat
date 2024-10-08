const chatData = require("../models/chatData.js");

exports.addNewGroup = (req,res)=>{
    const dbData = req.body
    
    chatData.create(dbData,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
}

exports.getAllGroups = (req,res)=>{
    chatData.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else
        {
            let groups = []
            data.map((groupData)=>{
                const groupInfo = {
                    id: groupData._id,
                    chatName: groupData.chatName
                }
                groups.push(groupInfo)
            })

            res.status(200).send(groups)
        }
    })
}

exports.test = (req,res)=>{
    res.json({"status":"ok"})
}