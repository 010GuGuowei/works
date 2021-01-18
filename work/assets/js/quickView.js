function quickView (gId) {
    // console.log('商品详情页');



    // console.log(gId, '详情页');
    // 获取节点

    let home = $('.home');      // 获取body的节点
    let firstChild = $('.moorabi-menu-clone-wrap')

    // 各种创建节点追加节点
    // 各种创建节点追加节点
    // 各种创建节点追加节点
    // 各种创建节点追加节点
    // 各种创建节点追加节点

    let mfpBg = document.createElement('div');
    mfpBg.className = 'mfp-bg mfp-ready';
    let mfpWrap = document.createElement('div');
    mfpWrap.className = 'mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready';
    mfpWrap.style.overflow = 'hidden auto';
    mfpWrap.setAttribute('tabindex', '-1');

    let mfpContainer = $$$('div');
    mfpContainer.className = 'mfp-container mfp-s-ready mfp-inline-holder';
    mfpWrap.appendChild(mfpContainer);

    let mfpContent = $$$('div');
    mfpContent.className = 'mfp-content';
    mfpContainer.appendChild(mfpContent);

    let ktPopupQuickView = $$$('div');
    ktPopupQuickView.className = 'kt-popup-quickview';
    mfpContent.appendChild(ktPopupQuickView);

    /************************************ */
    /***********详情页左边区************** */
    /************************************ */

    let detailsThumb = $$$('div');          // detailsThumb
    detailsThumb.className = 'details-thumb';
    ktPopupQuickView.appendChild(detailsThumb);

    let sliderProduct = $$$('div');
    sliderProduct.className = 'slider-product slider-for slick-initialized slick-slider';
    detailsThumb.appendChild(sliderProduct);

    let slickList = $$$('div');
    slickList.className = 'slick-list draggable';
    slickList.setAttribute('aria-live', 'polite');
    sliderProduct.appendChild(slickList);

    let slickTrack = $$$('div');
    slickTrack.className = 'slick-track';
    slickTrack.style.opacity = 1;
    slickTrack.style.width = '1516px';
    slickTrack.setAttribute('role', 'listbox');
    sliderProduct.appendChild(slickTrack);

    let detailsItem = $$$('div');
    detailsItem.className = 'details-item slick-slide slick-current slick-active';
    detailsItem.setAttribute('data-slick-index', "0");
    detailsItem.setAttribute('aria-hidden', "false");
    detailsItem.setAttribute('tabindex', "-1");
    detailsItem.setAttribute('role', "option");
    detailsItem.setAttribute('aria-describedby', "slick-slide60");
    detailsItem.style.width = '379px';
    detailsItem.style.position = 'relative';
    detailsItem.style.left = '0';
    detailsItem.style.top = '0';
    detailsItem.style.zIndex = '999';
    detailsItem.style.opacity = '1';
    sliderProduct.appendChild(detailsItem);

    let img = $$$('img');
    // 调用getVal方法找出对应Id的图片地址 
    GoodsList.getVal(gId, 'goodsImg').then(data => {
        img.src = data;
        // console.log(data);
    })
    detailsItem.appendChild(img);





    /********************************** */
    /************ 详情页右区 *********** */
    /********************************** */
    let detailsInfo = $$$('div');
    detailsInfo.className = 'details-infor'
    ktPopupQuickView.appendChild(detailsInfo);

    // 商品名称的渲染
    let productTitle = $$$('h1');
    productTitle.className = 'product-title';
    // 获取服务器中的对应id的goodsName
    GoodsList.getVal(gId, 'goodsName').then(data => {
        productTitle.innerHTML = data;
    });
    detailsInfo.appendChild(productTitle);

    let starsRating = $$$('div');
    starsRating.className = 'stars-rating';
    detailsInfo.appendChild(starsRating);

    // 星星的渲染
    let startRating = $$$('div');
    startRating.className = 'star-rating';
    starsRating.appendChild(startRating);

    let stars5 = $$$('span');
    stars5.className = 'stars-5';
    startRating.appendChild(stars5);

    let countStar = $$$('div');
    countStar.className = 'count-star';
    // countStar.style.width = '20px'
    countStar.innerText = '(999+)';
    starsRating.appendChild(countStar);

    // 存货的渲染
    let availability = $$$('div');
    availability.className = 'availability';
    availability.innerHTML = `
    availability:<a href="#">in Stock</a>`;
    detailsInfo.appendChild(availability);

    // 价格的渲染
    let priceObj = $$$('div');
    priceObj.className = 'price';
    // priceObj.innerHTML = `<span>$45</span>`;
    // 从服务器获取
    GoodsList.getVal(gId, 'price').then(data => {
        priceObj.innerHTML = `<span>$${data}</span>`;
    });
    detailsInfo.appendChild(priceObj);

    let productDetailsDescription = $$$('div');
    productDetailsDescription.className = 'product-details-description';
    productDetailsDescription.innerHTML = `
      <ul>
          <li>Vestibulum tortor quam</li>
          <li>Imported</li>
          <li>Art.No. 06-7680</li>
      </ul>`
    detailsInfo.appendChild(productDetailsDescription);

    // 商品尺码的渲染
    let variations = $$$('div');
    variations.className = 'variations';
    variations.innerHTML = `
    <div class="attribute attribute_color">
    <div class="color-text text-attribute">
        Color:
        <span>White/</span>
        <span>Black/</span>
        <span>Teal/</span>
        <span>Brown</span>
    </div>
    <div class="list-color list-item">
    <a href="javascript:" class="color1"></a>
    <a href="javascript:" class="color2"></a>
    <a href="javascript:" class="color3 active"></a>
    <a href="javascript:" class="color4"></a>
    </div>
    </div>
    <div class="attribute attribute_size">
    <div class="size-text text-attribute">Size:</div>
    <div class="list-size list-item">
    <a href="javascript:" class="">xs</a>
    <a href="javascript:" class="">s</a>
    <a href="javascript:" class="active">m</a>
    <a href="javascript:" class="">l</a>
    <a href="javascript:" class="">xl</a>
    <a href="javascript:" class="">xxl</a>
    </div>
</div>`
    detailsInfo.appendChild(variations);

    // 加入购物车 和增加减少数量的渲染
    let groupButton = $$$('div');
    groupButton.className = 'group-button';
    groupButton.innerHTML = `
    <div class="yith-wcwl-add-to-wishlist">
    <div class="yith-wcwl-add-button">
    <a href="javascript:">Add to Wishlist</a>
    </div>
    </div>
    <div class="size-chart-wrapp">
    <div class="btn-size-chart">
    <a id="size_chart" href="assets/images/size-chart.jpg" class="fancybox" target="_blank">View Size Chart</a>
    </div>
    </div>
    <div class="quantity-add-to-cart">
    <div class="quantity">
        <div class="control">
        <a class="btn-number qtyminus quantity-minus" href="javascript:">-</a>
        <input type="text" data-step="1" data-min="0" value="1" title="Qty" class="input-qty qty" size="4">
        <a href="javascript:" class="btn-number qtyplus quantity-plus">+</a>
        </div>
    </div>
    <button class="single_add_to_cart_button button">
    Add to cart
    </button>
    </div>`;
    detailsInfo.appendChild(groupButton)

    let mpfClose = $$$('button');
    mpfClose.className = 'mfp-close';
    mpfClose.innerHTML = 'x';
    mpfClose.title = 'Close';
    detailsInfo.appendChild(mpfClose);
    mpfClose.onclick = function () {
        close();
    }



    // availability:<a href="#">in Stock</a>
    // detailsInfo.appendChild



    // 追加
    // console.log(mfpWrap);
    home.insertBefore(mfpBg, firstChild);
    home.insertBefore(mfpWrap, firstChild);


    // 商品颜色点击效果
    let listColor = $('.list-color');
    // console.log(listColor);
    // 事件委托
    listColor.onclick = function (e) {
        // console.log(e.target);
        let target = e.target;
        if (target.nodeName == 'A') {
            // 调用选中的函数
            active1(listColor, 'active', target);
        }
    }


    // 商品尺码点击效果
    let listSize = $('.list-size');
    listSize.onclick = function (e) {
        let target = e.target;
        // 判断点击的是否为a标签
        // console.log(target.nodeName);.
        if (target.nodeName == 'A') {
            // 调用选中函数
            active1(listSize, 'active', target)
        }

    }



    // add to cart 的点击加入购物车事件
    let addToCart = $('.single_add_to_cart_button');
    // console.log(addToCart);
    addToCart.onclick = function () {
        // console.log('加入购物车')
        // 获取旁边数量框的内容
        let num = $('.input-qty').value - 0;
        // console.log(num);
        // 加入购物车
        GoodsList.addCart(gId, num)
    }

    // 禁用滚动条事件
    document.documentElement.style.overflowY = 'hidden';


    /********* 数量框增加的实现 **********/
    let quantityPlus = $('.quantity-plus');
    quantityPlus.onclick = function () {
        // 调用增减input内容的方法
        changeInputValue(quantityPlus, 'previous')
    }

    /******* 数量框减少的实现 ***********/
    let quantityMinus = $('.quantity-minus');
    quantityMinus.onclick = function () {
        // 调用增减input内容的方法
        changeInputValue(quantityMinus, 'next');
    }




    // 设置每周精选运动开关为false
    listMoveOnOff = false;

}





// 点击关闭详情页的方法
function close () {
    let home = $('.home');
    // console.log(home.children[0], home.children[1])
    home.removeChild(home.children[0]);
    home.removeChild(home.children[0]);     // 第一个已被移出,所以要移除的还是第一个
    // 还原滚动条事件
    document.documentElement.style.overflowY = 'scroll';
    // 开始每周精选的运动事件
    // 设置每周精选运动开关为true

    listMoveOnOff = true;
    clearInterval(listMoveTimes);
    WeeklyFeatured.ListAutoMove(-3, 30);
}


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




// 数量框增加减少的方法
function changeInputValue (obj, attr) {
    if (attr == 'previous') {
        let input = obj.previousElementSibling
        input.value = input.value - 0 + 1;
        return input;
    };
    if (attr == 'next') {
        let input = obj.nextElementSibling;
        if (input.value < 2) return;
        input.value = input.value - 1;
        return input;
    };
};



