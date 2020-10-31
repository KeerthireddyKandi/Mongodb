const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique : true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        minlength : 6,
        required : true 
    }
},{collection: 'part2collection'})

module.exports = mongoose.model('part2collection', schema);