define(['jquery', '../server/main', './modules/glass', './modules/cartStorage'],
    function ($, { getDetailData }, { glassInit }, { addCartStorage }) {


        var type = window.location.search.match(/type=([^&]+)/)[1];
        var id = window.location.search.match(/id=([^&]+)/)[1];
        var $detail = $('#detail');
        var $detailGoods = $('#detailGoods');

        getDetailData(type, id).then((res) => {
            detailInit(res)

        });

        function detailInit(data) {
            var tmp = `
      <div class="detail_gallery l">
                <div class="detail_gallery_normal">
                    <img src="${data.photoNormal}" alt="">
                    <span></span>
                </div>
                <div class="detail_gallery_large">
                    <img src="${data.photoLarge}" alt="">
                </div>
            </div>
            <div class="detail_message l">
                <h2>${data.goodsName}</h2>
                <p>价 格 <span class="detail_message_price">¥${data.goodsPrice}</span></p>
                <p>选择颜色
                    ${
                data.chooseColor.map((v, i) => {
                    if (i == 0) {
                        return ` <span class="detail_message_box active">${v}</span>`;

                    }
                    else {

                        return ` <span class="detail_message_box">${v}</span>`;
                    }
                }).join('')
                }
                </p>
                <div class="detail_message_btn clearfix">
                    <div class="detail_message_num l">
                        <input type="text" value="1">
                        <span>+</span>
                        <span>-</span>
                    </div>
                    <div class="detail_message_cart l"><a href="javascript:;">加入购物车</a></div>
                    <div class="detail_message_computed l"><a href="cart.html">立即下单</a></div>
                </div>
            </div>`;
            var tmp3 = `
                    <h3>-- 商品详情 --</h3>
                   ${
                data.goodsInfo.map((v, i) => {
                    return `
                            <img src="${v}" alt="">
                            `;
                }).join('')
                }
                    `;

            $detail.html(tmp);
            $detailGoods.html(tmp3);
            glassInit();
            chooseColor();
            chooseNumber();
            addCart(data);


        }
        //选择商品颜色
        function chooseColor() {
            var $detail_message_box = $detail.find('.detail_message_box');
            $detail_message_box.click(function () {
                $(this).addClass('active').siblings().removeClass('active')
            })
        }
        //选择商品个数
        function chooseNumber() {
            var $detail_message_num = $detail.find('.detail_message_num');
            var $input = $detail_message_num.find('input');
            var $span = $detail_message_num.find('span');

            $span.eq(0).click(function () {   //+
                var value = $input.val();
                $input.val(++value);                      //(/^[1-9]\d*$/)  只能输入数字正则  
            })
            $span.eq(1).click(function () {   //-
                var value = $input.val();


                if (value == 1) {
                    return;
                }
                $input.val(--value);
            })
        }
        //添加购物车
        function addCart(data) {
            let $detail_message_cart = $detail.find('.detail_message_cart');
            $detail_message_cart.click(function () {

                let result = {
                    goodsName: data.goodsName,
                    goodsPrice: data.goodsPrice,
                    goodsNumber: Number($detail.find('.detail_message_num input').val()),
                    goodsColor: $detail.find('.detail_message_box').filter('.active').html(),  //找出带有active的
                    goodsId: data.goodsId,
                    goodsChecked:true
                };

                addCartStorage(result, function () {
                    var $alert = $('#alert')
                    $alert.removeClass('none')

                    var tmp = `
                    <div class="alert_wrap"></div>
              <div class="alert">
                      <div class="yes"></div>
                      <div class="alert_top "><span>×</span></div>
                  <div class="content">${data.goodsName}  ${$detail.find('.detail_message_box').filter('.active').html()}
                     <br>成功加入购物车！</div>
                    <div class="box_btn">
                          <a  class="l"href="javascript:;">再逛逛</a> 
                          <a  class="r" href="cart.html">立即下单</a>
                          </div>
              </div>
              `;
                    $alert.html(tmp)
                    $alert.find('span').click(function () {
                        $alert.addClass('none')
                    })
                    
                    var $back = $('#alert').find('.l')
                    $back.click(function () {
                        $alert.addClass('none')
                        $alert.addClass('')
                        
                    })
                    // alert('dsdsa')
                });
            })
        }

    });