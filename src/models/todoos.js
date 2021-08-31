const mongoose = require('mongoose')

const todoosSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    createdAt:{
        type:String,
        required:true
    }
})

const ToDoos = mongoose.model('ToDoos',todoosSchema)
module.exports = ToDoos