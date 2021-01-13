
const db = require('./db.js') 

const adminSchema = new db.mongoose.Schema({
    "username":{type:String},
    "password":{type:String}
    
})


module.exports = db.mongoose.model("users",adminSchema)






// const yuangong = new db.mongoose.Schema({
//     "username":{type:String},
//     "age":{type:String},
//     "salary":{type:Number},
//     "year":{type:Number},
//     "sex":{type:String},
    
// })
