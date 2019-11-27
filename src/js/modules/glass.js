define(['jquery'], function ($) {

    function glassInit() {
        let $detail = $('#detail');
        let $detail_gallery_large=$detail.find('.detail_gallery_large');

        let $detail_gallery_normal = $detail.find('.detail_gallery_normal');
        $detail_gallery_normal.hover(function (ev) {
            let $span = $(this).find('span');
            $span.css({
                left: ev.pageX - $(this).offset().left - $span.width() / 2,
                top: ev.pageY - $(this).offset().top - $span.height() / 2
            })
            $span.show();
            $detail_gallery_large.show();
        }, function () {
            let $span = $(this).find('span');
            $span.hide()
            $detail_gallery_large.hide();
        }).mousemove(function (ev) {
            let $span = $(this).find('span');
            var L = ev.pageX - $(this).offset().left - $span.width() / 2
            var T = ev.pageY - $(this).offset().top - $span.height() / 2
            if(L<0){
                L=0;
            }
            else if(L>$(this).width()-$span.width()){
                L=$(this).width()-$span.width()
            }
            if(T<0){
                T=0;
            }
            else if(T>$(this).height()-$span.height()){
                T=$(this).height()-$span.height()
            }

            $span.css({
                left: L,
                top: T
            });
            let scaleX=L/($(this).width()-$span.width());    //0~1 比例值
            let scaleY =T/($(this).height()-$span.height());

           let $largeImg=$detail_gallery_large.find('img');
           $largeImg.css({
               left:-scaleX*($largeImg.width()-$detail_gallery_large.width()),
               top: -scaleY*($largeImg.height()-$detail_gallery_large.height())
           
           })

        })
    }

    return { glassInit }
})