
// 获取节点的方法
function $ (tag) {
    return document.querySelector(tag);
}
function $$ (tag) {
    return document.querySelectorAll(tag);
}

function $$$ (tag) {
    return document.createElement(tag);
}

// 服务器默认地址
let baseUrl = 'http://localhost/work1/assets/server/'
// 请求服务器的方法
let axios = {
    get (url, dataType) {
        return this.publicFn('get', url)
    },
    post (url, data, dataType) {
        return this.publicFn('post', url, data)
    },

    publicFn (type, url, data = '', dataType = 'json') {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(type, url);
            // post请求设置请求头
            (type == 'post') && xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

            // 发送请求
            xhr.send(data && data);

            // 监听接收
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {  // ajax状态有5个
                    if (xhr.status == 200) {
                        // let res = xhr.response;
                        let res = (dataType == 'json') ? JSON.parse(xhr.response) : xhr.response;

                        // 成功的
                        resolve(res)
                    } else {
                        reject('服务器错误')
                    }

                }
            }
        })
    }
}



// 获取元素的实时位置的函数
function getPos (eleObj, attr) {
    if (eleObj.currentStyle) {   // 判断当前浏览器是否支持
        return eleObj.currentStyle[attr];   // box.curreentStyle.left
    } else {
        return getComputedStyle(eleObj)[attr]  // getComputedStyle(box).left
    }
}

// 新匀速运动函数
function startMove (times, ele, obj, onOff, cb, ms) {
    clearInterval(times);
    // 开关为true
    if (onOff) {
        // 设置开关为false
        onOff = false;
        // 设置定时器
        times = setInterval(function () {
            // 遍历运动属性
            for (let attr in obj) {
                // 获取元素实时位置
                let transX = getPos(ele, attr).split(',')[4] - 0;
                // console.log(transX);
                // 判断运动方向
                if (transX > obj[attr]) {
                    let speed = -30;
                    // 设置到ele上
                    ele.style.transform = 'translate3d(' + (transX + speed) + 'px, 0, 0)';
                    // 判断是否到位
                    if ((transX + speed) <= obj[attr]) {
                        // 强行设置到位
                        ele.style.transform = 'translate3d(' + obj[attr] + 'px,0,0)';
                        // 清空计时器
                        clearInterval(times);
                        // 回调函数
                        cb && cb();
                        // 开关打开
                        onOff = true;
                    }
                }
                if (transX < obj[attr]) {
                    let speed = 30;
                    // 设置到ele上
                    ele.style.transform = 'translate3d(' + (transX + speed) + 'px, 0, 0)';
                    // 判断是否到位
                    if ((transX + speed) >= obj[attr]) {
                        // 强行设置到位
                        ele.style.transform = 'translate3d(' + obj[attr] + 'px,0,0)';
                        // 清空计时器
                        clearInterval(times);
                        // 回调函数
                        cb && cb();
                        // 开关打开
                        onOff = true;
                    }

                }

            }
        }, ms);
    }
}




// 注册请求服务器的方法
let axios1 = {
    get (url) {
        return this.publicFn('get', url)
    },
    post (url, data) {
        return this.publicFn('post', url, data)
    },

    publicFn (type, url, data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(type, url);
            // post请求设置请求头
            (type == 'post') && xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

            // 发送请求
            xhr.send(data && data);
            // console.log(data)
            // 监听接收
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {  // ajax状态有5个
                    if (xhr.status == 200) {
                        let res = xhr.response;
                        // let res = (dataType == 'json') ? JSON.parse(xhr.response) : xhr.response;

                        // 成功的
                        resolve(res)
                    } else {
                        reject('服务器错误')
                    }

                }
            }
        })
    }
}






class GoodsList {
    constructor () {
        this.getData(8);
    }

    // 渲染到页面
    async getData (maxNum) {
        let { meta, data } = await axios.get(baseUrl + 'server.php?fn=lst');
        // console.log((meta, data))
        let html = '';
        let num = 0;

        data.forEach(ele => {
            let { id, goodsImg, goodsName, price } = ele;
            num++;
            // console.log(id)
            // 只需要8条数据
            if (num > maxNum) {
                return;
            }
            // console.log(ele);
            html += `
            <li class="product-item product-type-variable col-lg-3 col-md-4 col-sm-6 col-xs-6 col-ts-12 style-1">
            <div class="product-inner equal-element" style="height: 401px;">
            <div class="product-top">
            <div class="flash">
            <span class="onnew"><span class="text">new</span> </span>
            </div>
            </div>

            <div class="product-thumb">
            <div class="thumb-inner">
            <a href="javascript:;"><img src="${goodsImg}" alt="img"></a>
            <div class="thumb-group">
            <div class="yith-wcwl-add-to-wishlist">
            <div class="yith-wcwl-add-button">
            <a href="javascript:;">Add to Wishlist</a>
            </div>
            </div>
            <a href="javascript:" class="button quick-wiew-button" onclick="quickView(${id})">Quick View</a>
            <div class="loop-form-add-to-cart" onclick="GoodsList.addCart(${id},1)">
            <button class="single_add_to_cart_button button">Add to cart
            </button>
            </div></div></div></div>
            <div class="product-info">
            <h5 class="product-name product_title"><a href="javascript:;">${goodsName}</a></h5>
            <div class="group-info">
            <div class="stars-rating">
            <div class="star-rating">
            <span class="star-5"></span>
            </div>
            <div class="count-star">(5)</div>
            </div>
            <div class="price">
            <del>$${parseInt(price * 1.5)}</del>
            <ins>$${price}</ins>                     
            </div></div></div></div>
            </li>`
        });
        // 追加到页面
        $('#list').innerHTML = html;
    }

    // 添加到购物车的方法
    static addCart (gId, num) {
        // console.log('被点了', gId, num);
        let goodsData = localStorage.getItem('cart');
        // console.log(goodsData);
        // 判断是否有数据
        if (goodsData) {    // 有数据
            // console.log('有数据');
            // 转化为对象
            goodsData = JSON.parse(goodsData);
            // console.log(goodsData);
            // 商品存在的状态   默认为不存在执行下面
            let state = true;
            // 遍历判断当前商品是否存在
            goodsData.forEach((goodsObj, key) => {
                // console.log(goodsObj, key)
                // 商品存在则更新数量
                if (goodsObj.id == gId) {
                    goodsData[key].num = goodsData[key].num - 0 + num;
                    state = false;
                }

            });
            // 商品不存在则添加
            state && goodsData.push({ id: gId, num });
            // 存储到localStorage
            localStorage.setItem('cart', JSON.stringify(goodsData));

        } else {        // 没有数据
            // console.log('没有数据')
            // 构造数据存储到localStorage
            goodsData = [{ id: gId, num }]
            // console.log(goodsData)
            // 存储到localStorage
            localStorage.setItem('cart', JSON.stringify(goodsData))
        }
    }




    /****** 根据id从服务器获取指定数据的方法 ******/
    static async getVal (gId, value) {
        // console.log(gId, value);
        let val = '';

        // 请求服务器获取数据
        let { meta, data } = await axios.post(baseUrl + 'server.php?fn=lst', 'goodsId=' + gId);
        // console.log(meta, data);
        // if (meta != 200) return;

        // 遍历出id相同的商品,拿出图片地址s
        data.forEach((ele) => {
            // console.log(ele);
            if (ele.id == gId) {
                // console.log(ele);
                val = ele[value];
                return;
            }
        })
        // console.log(url);
        return val;
    }

}


