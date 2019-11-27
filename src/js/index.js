define(['jquery', '../server/main', './modules/banner', './modules/goods'],
    function ($, { getBannerData, getGoodsData }, { bannerInit }, { goodsInit }) { //{} 接收接口


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
  
    })
//顶部广告
function topClose() {

    $top = $('.top');
    $top_close = $top.find('.topClose')

    $top_close.on('click', $top, function () {
        $top.attr('class', 'none')
    })

}
