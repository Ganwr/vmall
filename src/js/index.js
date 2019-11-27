define(['jquery', '../server/main', './modules/banner', './modules/goods', './modules/cartStorage','./modules/lazy' ],
    function ($, { getBannerData, getGoodsData }, { bannerInit }, { goodsInit }, { getCartStorage },{showImg}) { //{} 接收接口

    showImg()
;
        //首页Banner 操作
        getBannerData().then(function (res) {   //then 成功之后触发
            bannerInit(res);
            // console.log(res)
        });
        //首页 手机列表操作
        getGoodsData('phone').then(function (res) {
            goodsInit('phone', res);
        })
        //首页 笔记本列表操作
        getGoodsData('book').then(function (res) {
            goodsInit('book', res);
        })
        //首页 平板列表操作
        getGoodsData('pad').then(function (res) {
            goodsInit('pad', res);
        })

        topClose()
        shopInit()



        //购物车下拉菜单
        function shopInit() {
            var cartList = []
            cartList = getCartStorage() || [];

            var $shopping = $('.shopping');
            var $last = $('.shop_last')
            var tmp = `${
                cartList.map((v, i) => {
                    return `         
            <img data-src="${v.goodsImg}" alt="">
            <p>${v.goodsName}&nbsp;&nbsp;${v.goodsColor}</p>
            <p>￥${v.goodsPrice}&nbsp;&nbsp;&nbsp;×${v.goodsNumber}</p>
            <hr>
            `
                })
                }`;

            var tmp0 = `<i class="iconfont icon-icon-test"></i>购物车(${cartList.length})    `

            $shopping.html(tmp)
            $last.html(tmp0)


        }
        return { shopInit }
    })
//顶部广告

function topClose() {

    $top = $('.top');
    $top_close = $top.find('.topClose')

    $top_close.on('click', $top, function () {
        $top.attr('class', 'none')
    })
}

