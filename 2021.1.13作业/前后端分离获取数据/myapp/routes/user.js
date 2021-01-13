var express = require('express');
var router = express.Router();
const user = require('../sql/user')
/* GET home page. */
router.get('/', function(req, res, next) {
  user.find({},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)

    res.render('user', {
      index:2,
      data:data
    });
  })
  
});

module.exports = router;
