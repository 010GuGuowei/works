// console.log(12312);

// 商品列表区的节点
let goodsUl = $('#goods-list');     // 商品列表区
// console.log(goodsUl);
// 发送请求从服务器获取数据

async function getGoods () {

    let { data } = await axios.get(baseUrl + 'server.php?fn=lst');
    // console.log(data);
    // 遍历
    let html = '';
    data.forEach(goods => {
        // 拿出需要的数据
        let { id, price, goodsImg, goodsName } = goods;

        // ./assets/images/lazy.gif
        html += `
        <li class="product-item  col-lg-3 col-md-4 col-sm-6 col-xs-6 col-ts-12 style-1">
        <div class="product-inner equal-element" style="height: 359px;">
        <div class="product-top">
        <div class="flash">
        <span class="onnew"><span class="text">new</span></span>
        </div></div>
        <div class="product-thumb">
        <div class="thumb-inner">
        <a href="javascript:;">
        <img src="./assets/images/lazy.gif" data-src="${goodsImg}" alt="img" class="lazy"></a>
        <div class="thumb-group">
        <div class="yith-wcwl-add-to-wishlist">
        <div class="yith-wcwl-add-button">
        <a href="javascript:;">Add to Wishlist</a>
        </div></div>
        <a href="javascript:;" class="button quick-wiew-button" onclick="quickView(${id})">Quick View</a>
        <div class="loop-form-add-to-cart" onclick="GoodsList.addCart(${id},1)">
        <button class="single_add_to_cart_button button" >Add to cart</button>
        </div></div></div></div>
        <div class="product-info">
        <h5 class="product-name product_title">
        <a href="javascript:;">${goodsName}</a></h5>
        <div class="group-info">
        <div class="stars-rating">
        <div class="star-rating">
        <span class="star-5"></span></div>
        <div class="count-star">(5)</div></div>
        <div class="price"><del>$${price * 1.5}</del><ins>$${price}</ins>
        </div></div></div></div></li>`
    });
    goodsUl.innerHTML = html;
}

getGoods();

// // 页面加载完成之后再执行
// window.onload = function () {
//     // 获取所有的li标签o
//     let imgs = $$('.lazy');
//     // console.log(imgs);
//     // 获取元素到浏览器顶端
//     function getTop (e) {
//         return e.getBoundingClientRect().top;
//     }
//     // 懒加载的实现
//     function lazyLoad (imgs) {
//         // 获取可视区的高度
//         let innerH = window.innerHeight;
//         // 滚动区的高度
//         let sTop = document.documentElement.scrollTop || document.body.scrollTop;
//         for (let i = 0; i < imgs.length; i++) {
//             // console.log(getTop(imgs[i]));
//             // 图片距离顶部的距离大于可视区和滚动区域之和时懒加载
//             if (getTop(imgs[i]) > ((innerH + sTop) + 200)) {
//                 (function (i) {
//                     // setTimeout(function () {
//                     //创建一个临时图片，这个图片在内存中不会到页面上去。实现隐形加载
//                     var temp = new Image();
//                     temp.src = imgs[i].getAttribute('data-src');//只会请求一次
//                     // onload判断图片加载完毕，真是图片加载完毕，再赋值给dom节点
//                     temp.onload = function () {
//                         // 获取自定义属性data-src，用真图片替换假图片
//                         imgs[i].src = imgs[i].getAttribute('data-src')
//                     }
//                     // }, 1000)
//                 })(i)
//             }
//         }
//     }
//     lazyLoad(imgs);


//     // 滚屏函数
//     window.onscroll = function () {
//         lazyLoad(imgs);

//     }


// }





// 图片懒加载类
class LazyLoad {
    constructor (el) { //这里的el是传进来的图片的class名
        // console.log(this.imgList);
        this.imgList = Array.from(document.querySelectorAll(el)); // 需使用懒加载的图片集合
        this.init(); // 初始化
    }
    // 判断该图片是否可以加载)
    canILoad () {
        let imgList = this.imgList;
        for (let i = imgList.length; i--;) {
            // 缩写，相当于if true
            this.getBound(imgList[i]) && this.loadImage(imgList[i], i);
        }
    }
    // 获取图片与窗口的信息
    getBound (el) { //这里的el是当滚动条滚动时参与懒加载的图片
        // console.log(el);
        let bound = el.getBoundingClientRect(); //el.getBoundingClientRect判断el这个元素到可视区上下左右的距离
        let clientHeight = window.innerHeight;
        // 图片距离顶部的距离 <= 浏览器可视化的高度，从而推算出是否需要加载
        return bound.top <= clientHeight - 200; // -200是为了看到效果，
    }
    // 加载图片
    loadImage (el, index) {
        // console.log(el);
        // 获取之前设置好的data-src值
        let src = el.getAttribute('data-src');
        // 赋值到src，从而请求资源
        el.src = src;
        // 避免重复判断，已经确定加载的图片应当从imglist移除
        this.imgList.splice(index, 1);
    }
    // 当浏览器滚动的时候，继续判断
    bindEvent () {
        window.addEventListener('scroll', () => {
            this.imgList.length && this.canILoad();
        });
    }
    // 初始化
    init () {
        this.canILoad();
        this.bindEvent();
    }
}
// 实例化对象，参数则是需要使用懒加载的图片类名
window.onload = function () {

    const lazy = new LazyLoad('.lazy')

}


