var express = require('express');
var router = express.Router();
const user = require('../sql/user')
/* GET home page. */



// 这是get
router.get('/', function(req, res, next) {
    console.log(req.query)
  user.find({},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)


    res.send(data)

    // res.render('user', {
      
    //   data:data
    // });
  })
  
});



router.get('/a2', function(req, res, next) {
    // user.find({},(err,data)=>{
    //   if(err){
    //     console.log(err)
    //   }
    //   console.log(data)
  
  
     
   
    // })
    var data = {
        msg:'前端请求成功',
        code:200,
        msg:'这个用户是正确的 我们的用户'
    }

    res.send(data)
    
  });













  //以下post  vue接口
  router.post('/', function(req, res, next) {
   console.log(req.body)
  user.find({},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)


    res.send(data)

    // res.render('user', {
      
    //   data:data
    // });
  })
  
});



module.exports = router;
