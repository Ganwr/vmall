define(['jquery'], function ($) {

    
    $(document).scroll(showImg)

    function showImg(){
        var viewH = $(window).height();
        var scrollT = $(document).scrollTop();

        $('img').each(function (i, elem) {
            if ($(elem).offset().top <= viewH + scrollT) {
                var imgSrc = $(elem).attr('data-src'); //找到图片们
                $(elem).attr('src', imgSrc);
            }
        });
    };

    return { 
        showImg 
    }
});
