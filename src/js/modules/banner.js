define(['jquery'], function ($) {    //引入模块 （）里分别对应4个文件提供的接口
    var $banner = $('#banner')
    var $banner_imgs = $('#banner').find('.banner_imgs');
    var $banner_dots = $('#banner').find('.banner_dots');
    var $next = $('.right')
    var $prev = $('.left')
    console.log($prev)

    function bannerInit(data) {   //接收后端数据的
        // console.log(data)
        let banner_list = data.banner_list;
        let tmp = `
        ${
            banner_list.map((v, i) => {
                if (i == 0) {
                    return ` <li class="active"><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>`
                }
                else {

                    return `<li><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>`
                }
            }).join('')
            }

        `;
        let tmp2 = `${
            banner_list.map((v, i) => {
                if (i == 0) {
                    return ` <li class="white"></li>`
                }
                else {

                    return `<li></li>`
                }
            }).join('')
            }`
        $banner_imgs.html(tmp);
        $banner_dots.html(tmp2);

        bannerBind();
        // auto()
        var auto = setInterval(move, 5000)



        function bannerBind() {
            $banner_dots.on('mouseover', 'li', function () {
                $(this).attr('class', 'white').siblings().attr('class', '');
                $banner_imgs.find('li').eq($(this).index()).fadeIn().siblings().fadeOut();
                clearInterval(auto)
                index = $(this).index()
            });

        }
        var index = 0

        function move() {
            index++
            if (index == 6) {
                index = 0
            }
            $banner_imgs.find('li').eq(index).fadeIn().siblings().fadeOut();
            $banner_dots.find('li').eq(index).attr('class', 'white').siblings().attr('class', '')
            // console.log(index)
        }

        $banner.hover(function () {
            clearInterval(auto)
            // console.log(02dsa2)
        }, function () {
            auto = setInterval(move, 5000);
        })

        $next.on('click', function () {
            move();
        })

        $prev.on('click',function () {
            index--
            $banner_imgs.find('li').eq(index).fadeIn().siblings().fadeOut();
            $banner_dots.find('li').eq(index).attr('class', 'white').siblings().attr('class', '')
            if (index == -1) {
                index = 5
            }
        })



    }
    return {   //提供对外接口
        bannerInit
    }
})