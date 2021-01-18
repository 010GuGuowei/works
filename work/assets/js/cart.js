class Cart {
    constructor () {

        this.getCartGoods();     // 获取商品列表的方法

    }

    /************ 获取商品列表的方法 ***************/
    async getCartGoods () {
        // console.log(11231);
        let goodsData = localStorage.getItem('cart');
        // console.log(goodsData);
        if (!goodsData || (goodsData == '[]')) {   // 没有数据显示图片
            let cartBottom = $('.page-main-content');
            let cartList = $('.main-content-cart');
            let kongCart = $$$('img');
            kongCart.src = 'assets/images/kongcart.gif';
            kongCart.style.display = 'block';
            kongCart.style.width = '1170px';
            cartList.insertBefore(kongCart, cartBottom)
        };
        if (goodsData) {


            // 有数据
            let goodsIdStr = '';    // 声明变量保存数据的Id
            // 保存拿到的id和数量
            let tmpIdNum = {};
            // 转化数据
            JSON.parse(goodsData).forEach(goodsObj => {
                // 拿到商品Id和数量
                tmpIdNum[goodsObj.id] = goodsObj.num;
                // 保存Id
                goodsIdStr += goodsObj.id + ',';
            });
            // console.log(tmpIdNum);
            // 发送请求
            let { meta, data } = await axios.post(baseUrl + 'cart.php?fn=lst', 'goodsId=' + goodsIdStr);
            // console.log(data);


            // 

            //    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm">Small modal</button>

            //     <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            //       <div class="modal-dialog modal-sm" role="document">
            //         <div class="modal-content">
            //                     ...
            //         </div>
            //       </div>
            //     </div>

            // 渲染到页面
            let html = '';
            data.forEach(element => {
                let { id, goodsImg, goodsName, price } = element;
                let goodsNum = tmpIdNum[id];
                html += `
            <tr class="cart_item">
            <td class="product-remove">

            <a href="javascript:" class="remove" onclick="Cart.deleteGoods(this,${id})" ></a>
 
            </td>
            <td class="product-thumbnail">
            <a href="javascript:"><img src="${goodsImg}" alt="img"class="attachment-shop_thumbnail size-shop_thumbnail wp-post-image"></a> 
            </td>
            <td class="product-name" data-title="Product">
            <a href="javascript:" class="title">${goodsName}</a>
            <span class="attributes-select attributes-color">Black,</span>
            <span class="attributes-select attributes-size">M</span>
            </td>
            <td class="product-quantity" data-title="Quantity">
            <div class="quantity">
            <div class="control">
            <a class="btn-number qtyminus quantity-minus" href="javascript:" onclick="Cart.reduceGoodsNum(this,${id},${price})">-</a>
            <input type="text" data-step="1" data-min="0" value="${goodsNum}"title="Qty" class="input-qty qty" size="4">
            <a href="javascript:" class="btn-number qtyplus quantity-plus" onclick="Cart.addGoodsNum(this,${id},${price})">+</a>
            </div></div></td>
            <td class="product-price" data-title="Price">
            <span class="woocommerce-Price-amount amount">
            <span class="woocommerce-Price-currencySymbol">$</span>${(price * goodsNum).toFixed(2)}</span></td></tr>`;
            });

            // 追加tbody
            html += `<tr>
        <td class="actions">
        <div class="coupon">
        <label class="coupon_code">Coupon Code:</label>
        <input type="text" class="input-text" placeholder="Promotion code here">
        <a href="javascript:" class="button"></a></div>
        <div class="order-total">
		<span class="title">Total Price:</span>
        <span class="total-price">$
		</span></div></td></tr>`;
            // 追加
            let tbodyObj = $('tbody');
            // console.log(tbodyObj);
            if (tbodyObj) {
                tbodyObj.innerHTML = html;
                // 调用获取商品总价的方法
                Cart.getTotalPrice();
            }
        };

    }




    /********** 获取商品总价的方法 **************/
    static getTotalPrice () {
        // console.log(then)
        let totalPriceObj = $('.total-price');

        // 循环遍历所有商品列表获取所有商品的小计
        let totalPrice = 0;
        // let aaa = $$('.woocommerce-Price-amount');
        // console.log(aaa);
        $$('.woocommerce-Price-amount').forEach(v => {
            // console.log(v);
            // 获取内容,截取字符串,转化为数字
            totalPrice += v.innerText.slice(1) - 0;
            // console.log(totalPrice)
        });
        // 更新商品总价
        totalPriceObj.innerText = `$${totalPrice}`;
        // console.log(totalPrice)
    };



    /************** 数量增加的实现 *****************/
    static addGoodsNum (then, gId, price) {
        // console.log(then, gId, price);
        changeInputValue(then, 'previous');
        let goodsNum = then.previousElementSibling.value - 0;
        // console.log(goodsNum);
        // 将商品数量更新到localStorage
        Cart.upDataLocal(then, goodsNum, gId, price);
        // 更新总价
        Cart.getTotalPrice();

    }

    /************ 数量减少的实现 *************/
    static reduceGoodsNum (then, gId, price) {
        // console.log(then, gId, price);
        changeInputValue(then, 'next')
        let goodsNum = then.nextElementSibling.value - 0;
        // 将商品数量更新到localStorage
        Cart.upDataLocal(then, goodsNum, gId, price);
        // 更新总价
        Cart.getTotalPrice();
    }



    /******** 更新商品数量的方法 **********/
    static upDataLocal (then, goodsNum, gId, price) {
        // console.log(goodsNum, gId)
        // 获取localStorage中的数据
        let goodsData = localStorage.getItem('cart');
        goodsData = JSON.parse(goodsData);
        // console.log(goodsData);
        // 遍历localStorage中的数据增加数量
        goodsData.forEach(goodsObj => {
            // 找到对应Id的商品
            if (goodsObj.id == gId) {
                // 更新商品数量
                goodsObj.num = goodsNum - 0;
            }
        });
        // 将更新后的数量存进localStorage中
        localStorage.setItem('cart', JSON.stringify(goodsData));
        // console.log(localStorage.getItem('cart'));
        //更新小计
        let xiaoJi = (goodsNum * price).toFixed(2);
        // console.log(xiaoJi);
        // 找到当前节点的父父父父节点
        let ele = then.parentNode.parentNode.parentNode.parentNode
        // console.log(ele);
        // 找到小计
        let productPrice = ele.querySelector('.product-price');
        // console.log(productPrice);
        productPrice.innerHTML = `
        <span class="woocommerce-Price-amount amount">
        <span class="woocommerce-Price-currencySymbol">$</span>${xiaoJi}</span>`;


    }

    // 删除的实现
    // static deleteGoods (then, gId) {
    //     // console.log(then);
    //     let tr = then.parentNode.parentNode;
    //     // console.log(tr);
    //     // 自宫
    //     tr.remove();
    //     // 更新总价
    //     Cart.getTotalPrice();
    //     // 获取localStorage
    //     let goodsData = localStorage.getItem('cart');
    //     // 转化为对象
    //     goodsData = JSON.parse(goodsData);
    //     // console.log(goodsData);
    //     // 遍历找到当前id对应的商品
    //     goodsData.forEach((v, k) => {
    //         // console.log(v, k)
    //         if (v.id == gId) {
    //             // console.log(gId, k, v)
    //             goodsData.splice(k, 1);

    //         };

    //     });
    //     localStorage.setItem('cart', JSON.stringify(goodsData));

    //     let newData = localStorage.getItem('cart');
    //     // console.log(newData);
    //     if (!newData || (newData == '[]')) {   // 没有数据显示图片
    //         let cartBottom = $('.page-main-content');
    //         let cartList = $('.main-content-cart');
    //         let kongCart = $$$('img');
    //         kongCart.src = 'assets/images/kongcart.gif';
    //         kongCart.style.display = 'block';
    //         kongCart.style.width = '1170px';
    //         cartList.insertBefore(kongCart, cartBottom);
    //     };
    // }


    // 删除的实现
    static deleteGoods (then, gId) {

        if (confirm("确认要删除吗")) {
            // console.log(then);
            let tr = then.parentNode.parentNode;
            // console.log(tr);
            // 自宫
            tr.remove();
            // 更新总价
            Cart.getTotalPrice();
            // 获取localStorage
            let goodsData = localStorage.getItem('cart');
            // 转化为对象
            goodsData = JSON.parse(goodsData);
            // console.log(goodsData);
            // 遍历找到当前id对应的商品
            goodsData.forEach((v, k) => {
                // console.log(v, k)
                if (v.id == gId) {
                    // console.log(gId, k, v)
                    goodsData.splice(k, 1);

                };

            });
            localStorage.setItem('cart', JSON.stringify(goodsData));
        }
        let newData = localStorage.getItem('cart');


        // console.log(newData);
        if (!newData || (newData == '[]')) {   // 没有数据显示图片
            let cartBottom = $('.page-main-content');
            let cartList = $('.main-content-cart');
            let kongCart = $$$('img');
            kongCart.src = 'assets/images/kongcart.gif';
            kongCart.style.display = 'block';
            kongCart.style.width = '1170px';
            cartList.insertBefore(kongCart, cartBottom);
        };
    }




}

new Cart();


// 继续购物,跳转到商品列表页面
let btnContinueShopping = $('.btn-continue-shopping')
// console.log(btnContinueShopping)
if (btnContinueShopping) btnContinueShopping.onclick = function () {
    window.location.href = './gridproducts.html';
}
