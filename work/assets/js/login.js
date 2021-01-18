


/**************** 注册 *********************/


let register = $('#register');
// console.log(register)
let inputsObj = register.querySelectorAll('.input-text');   // 获取注册的三个信息栏
// console.log(inputsObj);

let emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;       // 匹配邮箱

// 判断邮箱是否格式正确
let spanEmail = document.createElement('span');     // 提示节点
// console.log(emailRegex.test(inputsObj[0].value))
inputsObj[0].parentNode.appendChild(spanEmail);      // 追加
inputsObj[0].onblur = function () {
    // 判断是否格式正确
    if (emailRegex.test(inputsObj[0].value)) {      // 正确
        spanEmail.innerHTML = ' 邮箱格式正确';

    } else {        // 错误
        spanEmail.innerHTML = " 邮箱格式错误";

    }
};

// 匹配以字母开头的任意4-16个字符
let userNameRegex = /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/;
let spanUserName = $$$('span');     // 用户名提示节点
inputsObj[1].parentNode.appendChild(spanUserName);      // 追加
inputsObj[1].onblur = function () {
    // console.log(inputsObj[1].value)
    // 判断是否格式正确
    if (userNameRegex.test(inputsObj[1].value)) {      // 正确
        spanUserName.innerHTML = ' 用户名格式正确';

    } else {        // 错误
        spanUserName.innerHTML = " 用户名格式错误";

    }
};

// 判断密码强度
let spanPassword = $$$('span');
inputsObj[2].parentNode.appendChild(spanPassword);      // 追加
inputsObj[2].onblur = function () {
    // console.log(inputsObj[2].value)
    // 保存 密码强度
    var a, b, c = 0;
    if (inputsObj[2].value.length >= 6 && inputsObj[2].value.length <= 15) {
        // console.log(inputsObj[2].value);
        // 判断是否有数字
        let reg1 = /\d+/g;
        a = reg1.test(inputsObj[2].value) ? 1 : 0;
        // 判断是否有字母
        let reg2 = /[a-z]|[A-Z]/;
        b = reg2.test(inputsObj[2].value) ? 1 : 0;

        // 判断是否有特殊字符
        let reg3 = /\W/;
        c = reg3.test(inputsObj[2].value) ? 1 : 0

        //判断强度
        let str = '';
        switch (a + b + c) {
            case 1:
                str = '弱';
                break;
            case 2:
                str = "中";
                break;
            case 3:
                str = "强";
                break;
        }
        spanPassword.innerHTML = str;
    } else {
        spanPassword.innerHTML = '请输入正确的密码';
    }
}

// || inputsObj[1].value || inputsObj[2].value


async function clickRegister () {
    // console.log(123123);
    // 文本框内是否都有值
    let OnOff = !!(inputsObj[0].value && inputsObj[1].value && inputsObj[2].value);
    // console.log(OnOff);
    let agreeObj = $('#cb2');       // 同意条款的单选框
    // console.log(agreeObj.checked)
    if (!agreeObj.checked) {
        // 条款未勾选
        alert('请勾选"同意条款"')
    };
    // 判断是否有空的
    if (!inputsObj[0].value) {
        alert('请填写邮箱');
    }
    if (!inputsObj[1].value) {
        alert('请填用户名');
    }
    if (!inputsObj[2].value) {
        alert('请填写密码');
    }

    if (OnOff && agreeObj.checked) {    // 全都有值且已勾选条款

        // 构造数据请求服务器
        let data = `email=${inputsObj[0].value}`;
        // console.log(data);
        // 拿到请求服务器获取结果
        let result = '';

        // selectUser1(data).then(res => 
        //     result = res;
        // })

        await server('login1.php', data).then(res => {
            result = res;
        })
        // console.log(result)
        // 检查是否存在重复数据
        if (result == 1) {
            alert('邮箱已存在');

        } else {
            // 构造数据
            let userInfo = `userName=${inputsObj[1].value}&userPwd=${inputsObj[2].value}&email=${inputsObj[0].value}`;
            // 存入服务器
            // insertIntoUser(userInfo);
            server('goods_res.php', userInfo)
            // 清空input框
            inputsObj[0].value = inputsObj[1].value = inputsObj[2].value = '';
            alert('注册成功,请登录');
        }





        // // let data = [{ email: inputsObj[0].value, username: inputsObj[1].value, password: inputsObj[2].value }]
        // // 获取localStorage中的数据
        // let data = localStorage.getItem('user');
        // if (data) {     // 有数据
        //     // 转化,遍历查询userName和email是否存在
        //     data = JSON.parse(data);
        //     // 存在的状态
        //     let status = true;
        //     data.forEach(user => {
        //         // 判断是否存在相同用户名
        //         if (user.username == inputsObj[1].value) {
        //             alert('用户名已存在');
        //             status = false;
        //         };
        //         if (user.email == inputsObj[0].value) {
        //             alert('邮箱已被注册');
        //             status = false;
        //         };
        //     })
        //     // 用户名和邮箱都没被使用则添加
        //     if (status) {
        //         data.push({ email: inputsObj[0].value, username: inputsObj[1].value, password: inputsObj[2].value });
        //         // 存到localStorage

        //         localStorage.setItem('user', JSON.stringify(data));
        //         // 清空input框
        //         inputsObj[0].value = inputsObj[1].value = inputsObj[2].value = '';
        //         // 注册成功请登录
        //         alert('注册成功,请登录');
        //     }

        // } else {        // 没有数据
        //     // 构造添加
        //     // console.log(data)
        //     data = [{ email: inputsObj[0].value, username: inputsObj[1].value, password: inputsObj[2].value }];
        //     localStorage.setItem('user', JSON.stringify(data));
        //     // 清空input框
        //     inputsObj[0].value = inputsObj[1].value = inputsObj[2].value = '';
        //     alert('注册成功,请登录');
        // }
    }
}



/*************** 登录 ******************/

let loginForm = $('#login');        // 登录表单的节点
// console.log(loginForm);
let loginName = loginForm.querySelectorAll('input')[0];     // 用户名的节点
let loginPassword = loginForm.querySelectorAll('input')[1]; // 密码的节点
// console.log(loginPassword, loginName);

$('#login-button').onclick = async function () {
    // 构造数据请求服务器

    let data = `userName=${loginName.value}&userPwd=${loginPassword.value}`;
    // console.log(data);
    let result = '';
    // 拿到请求服务器获取结果
    // await selectUser(data).then(res => {
    //     result = res;
    // })
    await server('goods_login.php', data).then(res => {
        result = res;
    })
    // console.log(result);
    // 判断是否正确
    if (result == 1) {      // 登陆成功
        // 清空input框,跳转
        inputsObj[0].value = inputsObj[1].value = inputsObj[2].value = '';
        alert('登录成功,跳转至主页');
        // 跳转至home2
        window.location.href = "./home2.html";
    } else {
        // console.log(22222222222)
        alert('账号或密码不正确,请重新输入')
    }

    // 获取localStorage中的数据
    // let data = localStorage.getItem('user');
    // if (!data) {
    //     alert('服务器中没有数据');

    // } else {
    //     // 转化
    //     data = JSON.parse(data);
    //     // 遍历获取到的数据,跟文本框中的对比
    //     let name = '';      // 用户名的状态
    //     let password = '';  // 密码的状态
    //     data.forEach(user => {
    //         if (user.username == loginName.value) {
    //             name = true;    // 状态为true

    //         };
    //         if (user.password == loginPassword.value) {
    //             password = true;    // 状态为true
    //         }

    //     });
    //     console.log(name);
    //     if (name && password) {
    //         // 清空input框
    //         inputsObj[0].value = inputsObj[1].value = inputsObj[2].value = '';
    //         alert('登录成功,跳转至主页');
    //         // 跳转至home2
    //         window.location.href = "./home2.html";
    //     } else {
    //         alert('账号或密码不正确,请重新输入')
    //     }

    // }

}


// 'userName=zhoujielun&userPwd=123456789'

// 注册请求服务器
// async function selectUser1 (data) {
//     let select = await axios1.post('http://localhost/work1/assets/php/login1.php', data)
//     select = JSON.parse(select);
//     let { result } = select;
//     // console.log(select)
//     // console.log(result);
//     return result;
// }

// // 注册,往服务器添加数据
// async function insertIntoUser (data) {
//     let Info = await axios1.post('http://localhost/work1/assets/php/goods_res.php', data);
//     // Info = JSON.parse(Info);
//     let { result } = Info;
//     // console.log(Info);
//     return result;
// }
// insertIntoUser()


// 登录,请求服务器
// async function selectUser (data) {
//     let select = await axios1.post('http://localhost/work1/assets/php/goods_login.php', data)
//     select = JSON.parse(select);
//     let { result } = select;
//     // console.log(result);
//     return result;
// }
// selectUser()


// 一顶三的请求函数
async function server (url, data) {
    let select = await axios1.post(`http://localhost/work1/assets/php/${url}`, data);
    select = JSON.parse(select);
    let { result } = select;
    return result;
}
