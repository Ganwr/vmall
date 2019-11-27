define(['jquery'], function ($) {

    function addCartStorage(data,cb) {
        var cartList = getCartStorage() || [];     //读出已有的
        var flag = true;
        var index=-1;
        for (var i = 0; i < cartList.length; i++) {
            if (cartList[i].goodsId == data.goodsId && cartList[i].goodsColor == data.goodsColor) {    //累加
                flag = false;
                index=i;
            }

        }

        if (flag) {        //添新的
            cartList.push(data);
            setCartStorage(cartList);
        }
        else {       //累加number
            cartList[index].goodsNumber += data.goodsNumber;
            setCartStorage(cartList)
        }
        cb()  //添加购物车触发的函数
    }
    function setCartStorage(data) {
        window.localStorage.setItem('cart', JSON.stringify(data))

    }
    function getCartStorage() {
    
        return JSON.parse(window.localStorage.getItem('cart'));

    }


    return {
        addCartStorage,
        setCartStorage,
        getCartStorage
    }
})