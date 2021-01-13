const express = require('express')

var router = express.Router()
// 要引入 user的数据库架构完成的状态
const user = require('../sql/user')


router.get('/',function(req,res,next){
    console.log('login  /')
    res.render('login')
})


router.post('/in',function(req,res,next){
    console.log('我进入 login  in里面了')
    let obj = req.body
    user.findOne(obj,(err,data)=>{
        if(err){
            console.log('err',err)
        }
        if(data) {
            // 如果到了这一步  意味着用户买过门票 就是注册过 是我们的用户 
            //所以我们要往用户身上藏cookie了
            // res.cookie('isLogin','ok')
            req.session.isLogin = 'ok'
            console.log('登录成功')
            res.redirect('/pro')
        }else {
            res.redirect('/register')
        }
    })

})

module.exports = router;