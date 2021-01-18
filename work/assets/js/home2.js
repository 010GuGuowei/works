/********* 轮播图的实现 **********/
let slideShowTime = '';             // 轮播图的定时器
let slideShowOnOff = true;          // 轮播图的开关
let index = 0;
let slickTrack = $('.slick-track');     // 所有图片容器的节点
let sliderItem = $$('.slider-item');    // 所有图片div的节点
let slickDots = $('.slick-dots');
let screenW = 1519;
let isClick = true;     // 右箭头的开关,防止点击过快
let isClick1 = true;

class SlideShow {
    constructor () {
        this.addUlList();
        // console.log(slickDots);
        this.clone();
        // 自动播放
        // this.autoPlay();
    }
    // 添加轮播图的索引
    addUlList () {
        if (slickTrack) {
            for (let i = 0; i < slickTrack.children.length; i++) {
                let li = document.createElement('li');
                // 添加class名
                li.className = 'last-slick';
                // 添加自定义属性
                li.key = i;
                li.innerHTML = i;
                // 默认第一个选中状态
                if (i == 0) {
                    li.classList.add('slick-active');
                    SlideShow.active(slickTrack, 'slick-active');
                }
                // console.log(li);
                // 追加到页面
                slickDots.appendChild(li);
                // 绑定点击事件
                li.onclick = function () {
                    index = li.key
                    // console.log(this.index);
                    // 调用被选中的函数
                    SlideShow.active(slickDots, 'slick-active');
                    SlideShow.active(slickTrack, 'slick-active');
                    // 设置运动目标值
                    let distance = - index * screenW;
                    // console.log(distance)

                    startMove(slideShowTime, slickTrack, { transform: distance }, slideShowOnOff, null, 10)
                }

            }
        }
    }


    /************* 克隆第一张图片放到最后 **************/
    clone () {
        // let slickTrack =slickTrack;

        let cloneDiv = slickTrack.children[0].cloneNode(true);
        slickTrack.appendChild(cloneDiv);
    }


    /**************** 右箭头的点击效果 ****************/
    static arrowRightClick () {
        // console.log(123)
        // console.log(arrowRight);
        if (isClick) {
            isClick = false;
            index++
            // console.log(slickDots.children.length)
            // 判断是否为索引最大值
            if (index == slickDots.children.length) {
                // 切换到克隆的第一张
                // active(slickTrack, 'slick-active');

                let distance = -screenW * index;
                // 调用运动函数
                startMove(slideShowTime, slickTrack, { transform: distance }, slideShowOnOff, function () {
                    // 设置slickTrack的transform值为 0s
                    slickTrack.style.transform = 'translate3d( 0px,0px,0px)'
                }, 10)

                // 设置索引
                index = 0;
            } else {
                let distance = -screenW * index;
                // 调用运动函数
                startMove(slideShowTime, slickTrack, { transform: distance }, slideShowOnOff, null, 10)
                // move(slickTrack, { transform: distance }, null, 30)

            }
            // 设置样式
            SlideShow.active(slickDots, 'slick-active');
            SlideShow.active(slickTrack, 'slick-active');

            setTimeout(function () {
                isClick = true;
            }, 1700)

        }


    }

    /************** 左箭头的点击效果 ***************/

    static arrowLeftClick () {
        if (isClick1) {
            isClick1 = false;
            index--;
            if (index == -1) {
                //设置slickTrack的transform值为 4557
                slickTrack.style.transform = 'translate3d(-4557px,0px,0px)';
                // 设置运动距离
                let distance = -screenW * (slickDots.children.length - 1);
                // 运动
                startMove(slideShowTime, slickTrack, { transform: distance }, slideShowOnOff, null, 10)
                // move(slickTrack, { transform: distance }, null, 30);
                // 设置index为最大索引
                index = slickDots.children.length - 1;

            } else {
                let distance = -screenW * index;
                // 调用运动函数
                startMove(slideShowTime, slickTrack, { transform: distance }, slideShowOnOff, null, 10)
                // move(slickTrack, { transform: distance }, null, 30)
            }
            SlideShow.active(slickDots, 'slick-active');
            SlideShow.active(slickTrack, 'slick-active');
            setTimeout(function () {
                isClick = true;
            }, 1700)
        }

    }


    /********** 轮播图索引的选中 ***********/
    static active (obj, val) {

        // 获取slickDts下的带有slick-active的节点
        let active = obj.querySelector('.' + val);
        // console.log(active);
        // 移除class名
        active.classList.remove(val);
        // 当前点击的添加class名
        obj.children[index].classList.add(val);
    }


    /********** 自动播放 **********/

    autoPlay () {
        if (isClick) {
            setInterval(function () {
                SlideShow.arrowRightClick()
            }, 4000)
        }
    }

}





new SlideShow();

// 商品详情页的选中效果
function active1 (obj, val, target) {
    // 获取slickDts下的带有slick-actve的节点
    let active = obj.querySelector('.' + val);
    // 判断是否为当前选中的节点
    if (active == target) return;
    // console.log(active);
    // 移除class名
    active.classList.remove(val);
    // 当前点击的添加class名
    target.classList.add(val);
}

/**************************************************************/
/************************ 商品展示页 ***************************/
/**************************************************************/

// class GoodsList {
//     constructor () {
//         this.getData(8);
//     }

//     // 渲染到页面
//     async getData (maxNum) {
//         let { meta, data } = await axios.get(baseUrl + 'server.php?fn=lst');
//         // console.log((meta, data))
//         let html = '';
//         let num = 0;

//         data.forEach(ele => {
//             let { id, goodsImg, goodsName, price } = ele;
//             num++;
//             // console.log(id)
//             // 只需要8条数据
//             if (num > maxNum) {
//                 return;
//             }
//             // console.log(ele);
//             html += `
//             <li class="product-item product-type-variable col-lg-3 col-md-4 col-sm-6 col-xs-6 col-ts-12 style-1">
//             <div class="product-inner equal-element" style="height: 401px;">
//             <div class="product-top">
//             <div class="flash">
//             <span class="onnew"><span class="text">new</span> </span>
//             </div>
//             </div>

//             <div class="product-thumb">
//             <div class="thumb-inner">
//             <a href="javascript:;"><img src="${goodsImg}" alt="img"></a>
//             <div class="thumb-group">
//             <div class="yith-wcwl-add-to-wishlist">
//             <div class="yith-wcwl-add-button">
//             <a href="javascript:;">Add to Wishlist</a>
//             </div>
//             </div>
//             <a href="javascript:" class="button quick-wiew-button" onclick="quickView(${id})">Quick View</a>
//             <div class="loop-form-add-to-cart" onclick="GoodsList.addCart(${id},1)">
//             <button class="single_add_to_cart_button button">Add to cart
//             </button>
//             </div></div></div></div>
//             <div class="product-info">
//             <h5 class="product-name product_title"><a href="javascript:;">${goodsName}</a></h5>
//             <div class="group-info">
//             <div class="stars-rating">
//             <div class="star-rating">
//             <span class="star-5"></span>
//             </div>
//             <div class="count-star">(5)</div>
//             </div>
//             <div class="price">
//             <del>$${parseInt(price * 1.5)}</del>
//             <ins>$${price}</ins>                     
//             </div></div></div></div>
//             </li>`
//         });
//         // 追加到页面
//         $('#list').innerHTML = html;
//     }

//     // 添加到购物车的方法
//     static addCart (gId, num) {
//         // console.log('被点了', gId, num);
//         let goodsData = localStorage.getItem('cart');
//         // console.log(goodsData);
//         // 判断是否有数据
//         if (goodsData) {    // 有数据
//             // console.log('有数据');
//             // 转化为对象
//             goodsData = JSON.parse(goodsData);
//             // console.log(goodsData);
//             // 商品存在的状态   默认为不存在执行下面
//             let state = true;
//             // 遍历判断当前商品是否存在
//             goodsData.forEach((goodsObj, key) => {
//                 // console.log(goodsObj, key)
//                 // 商品存在则更新数量
//                 if (goodsObj.id == gId) {
//                     goodsData[key].num = goodsData[key].num - 0 + num;
//                     state = false;
//                 }

//             });
//             // 商品不存在则添加
//             state && goodsData.push({ id: gId, num });
//             // 存储到localStorage
//             localStorage.setItem('cart', JSON.stringify(goodsData));

//         } else {        // 没有数据
//             // console.log('没有数据')
//             // 构造数据存储到localStorage
//             goodsData = [{ id: gId, num }]
//             // console.log(goodsData)
//             // 存储到localStorage
//             localStorage.setItem('cart', JSON.stringify(goodsData))
//         }
//     }




//     /****** 根据id从服务器获取指定数据的方法 ******/
//     static async getVal (gId, value) {
//         // console.log(gId, value);
//         let val = '';

//         // 请求服务器获取数据
//         let { meta, data } = await axios.post(baseUrl + 'server.php?fn=lst', 'goodsId=' + gId);
//         // console.log(meta, data);
//         // if (meta != 200) return;

//         // 遍历出id相同的商品,拿出图片地址s
//         data.forEach((ele) => {
//             // console.log(ele);
//             if (ele.id == gId) {
//                 // console.log(ele);
//                 val = ele[value];
//                 return;
//             }
//         })
//         // console.log(url);
//         return val;
//     }

// }

new GoodsList();



// Weekly Featured 每周精选列表的渲染


let weeklyFeaturedIndex = 0;
let listMoveTimes = '';
// 控制点击商品详情页的时候运动停止
let listMoveOnOff = true;
class WeeklyFeatured {
    constructor () {
        this.weeklyList(6);    // 渲染6条
        WeeklyFeatured.ListAutoMove(-1, 20);  // 传入毫秒
    }

    // 每周精选商品列表的渲染

    async weeklyList (maxNum) {
        let { meta, data } = await axios.get(baseUrl + 'server.php?fn=lst');
        // console.log((meta, data))
        let html = '';
        let num = 0;
        data.forEach(ele => {
            let { id, goodsImg, goodsName, price } = ele;
            num++;
            // console.log(id)
            // 只需要6条数据
            if (num > maxNum) {
                return;
            }
            // console.log(ele);
            html += `
            <div class="product-item style-1 product-type-variable slick-slide slick-current slick-active first-slick" style="width: 300px;" data-slick-index="0" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide20">
             <div class="product-inner equal-element" style="height: 359px;" >
             <div class="product-top">
             <div class="flash"><span class="onnew">
             <span class="text">new</span></span>
             </div></div>
             <div class="product-thumb">
             <div class="thumb-inner">
             <a href="javascript:" tabindex="0"><img src="${goodsImg}" alt="img"></a>
             <div class="thumb-group">
             <div class="yith-wcwl-add-to-wishlist">
             <div class="yith-wcwl-add-button">
             <a href="javascript:" tabindex="0">Add to Wishlist</a>
             </div></div>
             <a href="javascript:" class="button quick-wiew-button" tabindex="0"
             onclick="quickView(${id})">Quick View</a>
             <div class="loop-form-add-to-cart" onclick="GoodsList.addCart(${id},1)">
             <button class="single_add_to_cart_button button" tabindex="0">Add to cart</button>
             </div></div></div></div>
             <div class="product-info">
             <h5 class="product-name product_title">
             <a href="javascript:" tabindex="0">${goodsName}</a></h5>
             <div class="group-info">
             <div class="stars-rating">
             <div class="star-rating">
             <span class="star-5"></span>
             </div><div class="count-star">(5)</div></div>
             <div class="price"><del>$${price * 1.5}</del><ins>$${price}</ins>
             </div></div></div></div></div>`;
        });
        html += html;   // 复制一份;
        // 追加到页面
        $('#weekly-featured').innerHTML = html;
    }

    /************* 跑马灯 **************/
    static ListAutoMove (speed, ms) {
        // console.log(123);
        let weeklyFeatured = $('#weekly-featured');
        // console.log(weeklyFeatured);
        listMoveTimes = setInterval(function () {
            // console.log(123)
            let transX = getPos(weeklyFeatured, 'transform').split(',')[4] - 0
            // console.log(transX)
            // console.log(speed)
            weeklyFeatured.style.transform = 'translate3d(' + (transX + speed) + 'px, 0, 0)';
            // console.log(weeklyFeatured.style.transform)
            // 判断是否走完一半
            if (transX <= -1800) {
                // console.log('返回');
                weeklyFeatured.style.transform = 'translate3d( 0px,0px,0px)';
            }
        }, ms)

    }

    /********** 鼠标移入停止运动 **********/
    static stopListMove () {
        // console.log(123)
        clearInterval(listMoveTimes);
    }


    /******** 鼠标移出开始运动 ********/
    static startListMove () {
        // console.log(123);
        if (listMoveOnOff) {
            clearInterval(listMoveTimes);
            WeeklyFeatured.ListAutoMove(-3, 30);
        }
    }


}
// WeeklyFeatured.arrowRightClick()
new WeeklyFeatured();



/*************************  news letter list 的运动效果 **************************/
let newsLetterMoveObj = $('#news-letter-list');
// console.log(newsLetterMoveObj)
// 运动开关,防止点击过快
let newsLetterMoveOnOff = true;
let newsLetterMoveTime = '';        // newsletter的定时器变量


function newsLetterMove (speed, val, then) {    // 传入速度,目标值,当前节点
    // tartMove(slideShowTime, slickTrack, { transform: distance }, slideShowOnOff, null, 10)
    // startMove(newsLetterMoveTime,newsLetterMoveObj{transform:val},newsLetterMoveOnOff,null,20)
    if (newsLetterMoveOnOff) {
        // 开关关闭
        newsLetterMoveOnOff = false;
        // 获取当前元素的父元素下的所有class名带有slick-active的节点
        let removeClass = then.parentNode.querySelector('.slick-active');
        // console.log(removeClass);
        removeClass.classList.remove('slick-active');
        // 给当前节点添加
        then.classList.add('slick-active');
        // 运动
        newsLetterMoveTime = setInterval(function () {
            // let speeds = -10;
            // console.log(123)
            let transX = getPos(newsLetterMoveObj, 'transform').split(',')[4] - 0
            newsLetterMoveObj.style.transform = 'translate3d(' + (transX + speed) + 'px, 0, 0)';
            // console.log(weeklyFeatured.style.transform)
            // 判断是否走完
            if (transX == val) {
                // 开关打开
                newsLetterMoveOnOff = true;
                // console.log('完了...');
                newsLetterMoveObj.style.transform = 'translate3d( ' + val + 'px,0px,0px)';
                clearInterval(newsLetterMoveTime);
            }
        }, 20)
    }

}



// 回到顶部的节点
let backToTop = $('.backtotop')
// console.log(backToTop)
// 监听滚动条
window.onscroll = function () {
    console.log(document.documentElement.scrollTop);
    // 如果滚动高度大于1000则显示
    if (document.documentElement.scrollTop >= 1000) {
        backToTop.classList.add('show');
    } else {    // 否则隐藏
        backToTop.classList.remove('show');
    }
};

// 返回顶部按钮的实现
backToTop.onclick = function () {
    let times = "";
    times = setInterval(function () {
        document.documentElement.scrollTop -= 50;
        // 到顶则停止
        if (document.documentElement.scrollTop == 0) {
            clearInterval(times);
        }
    }, 5)
}


