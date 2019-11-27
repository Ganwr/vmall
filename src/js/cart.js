define(['jquery', './modules/cartStorage'], function ($, { setCartStorage, getCartStorage }) {

    var $cart = $('#cart');
    var $cart_list = $cart.find('.cart_list');
    var $cart_title_selectAll = $cart.find('.cart_title_selectAll');
    var cartList = []
    cartInit()
    cartBind()
    function cartInit() {
        cartList = getCartStorage() || [];

        let tmp = `
          ${
            cartList.map((v, i) => {
                return `
                <li>
                    <div>
                    ${v.goodsChecked ? `<input type="checkbox"checked >` : `<input type="checkbox" >`}
                    </div>
                   
                    <div>${v.goodsName} (${v.goodsColor})</div>
                    <div>￥${v.goodsPrice}</div>
                    <div>
                        <span>-</span>
                        <input  class="cart_list_text"type="text"value="${v.goodsNumber}">
                        <span>+</span>
                    </div>
                    <div>￥${v.goodsPrice * v.goodsNumber}</div>
                    <div class="delete_item">删除</div>
                    </li>
                    `;
            }).join('')
            }
            `;
        $cart_list.html(tmp)

        var $checkbox = $cart_list.find('input[type="checkbox"]');
        var allFlag = true;
        var allNumber = 0;
        var allPrice = 0;
        $checkbox.each(function (i, elem) {
            if ($(elem).prop('checked') == false) {  //检测check 如果是选中的就是true 如果是取消的就是false 
                allFlag = false;
            }
            else {
                allNumber += cartList[i].goodsNumber;
                allPrice += cartList[i].goodsNumber * cartList[i].goodsPrice;
            }
        })
        if(!cartList.length){
            allFlag=false
        }
        setALLselect(allFlag)
        setALLComputed(allNumber, allPrice)

    }
    //全选按钮操作
    function setALLselect(allFlag) {
        $cart_title_selectAll.prop('checked', allFlag);
    }
    //总计
    function setALLComputed(allNumber, allPrice) {
        var $cart_computed_price = $cart.find('.cart_computed_price p')
        $cart_computed_price.eq(0).html(`总计：￥${allPrice}.00`)
        $cart_computed_price.eq(1).html(`已选择 ${allNumber}件商品`)
    }
    //购物车改变状态方法
    function cartBind() {
        $cart_list.on('click', 'input[type=checkbox]', function () {
            var index = $(this).closest('li').index();
            cartList[index].goodsChecked = $(this).prop('checked');
            setCartStorage(cartList);
            cartInit();
        });
        $cart_title_selectAll.on('click', function () {
            if ($(this).prop('checked')) {
                for (var i = 0; i < cartList.length; i++) {
                    cartList[i].goodsChecked = true;
                }
            } else {
                for (var i = 0; i < cartList.length; i++) {
                    cartList[i].goodsChecked = false;
                }
            }
            setCartStorage(cartList);
            cartInit();
        })
        //-个数
        $cart_list.on('click','span:first-of-type',function(){
            var index=$(this).closest('li').index();
            var $input=$(this).prev();   //下面的兄弟
            var number= parseInt($input.val());
                if(cartList[index].goodsNumber==1){
                  return
                }
             cartList[index].goodsNumber--;
             setCartStorage(cartList);
             cartInit();
       
           
        })
        //+个数
        $cart_list.on('click','span:last-of-type',function(){
            var index=$(this).closest('li').index();
           var $input=$(this).prev();   //下面的兄弟
           var number= parseInt($input.val());
            cartList[index].goodsNumber++;
            setCartStorage(cartList);
            cartInit();
        })
        //删除
        $cart_list.on('click','.delete_item',function(){
            var index=$(this).closest('li').index();
            cartList.splice(index,1)
            setCartStorage(cartList);
            cartInit();
        });


    }
})