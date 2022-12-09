const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bountySchema = new Schema ({
    name: {
        type:String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }, 
    region: String,
    amount: {
        type: Number,
        required: true
    }, 
    isLiving: Boolean
})


module.exports = mongoose.model("Bounty", bountySchema)