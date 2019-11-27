define(['jquery'], function ($) {
    function goodsInit(type, data) {
        // console.log(type,data)
        var $parent = $(`#${type}`);
        var tmp = `
        <h2>${data.title}<a href="#">荣耀</a><a href="#">HUAWEI P系列</a><a href="#">HUAWEI Mate系列</a><a href="#">荣耀畅玩系列</a><a
        href="#">HUAWEI nova系列</a><a href="#">华为畅享系列</a><a href="#">HUAWEI 麦芒系列</a><a href="#">移动4G+专区</a><a
        href="#">查看更多 ></a></h2>
        <ul class="clearfix">
     ${
            data.goods_list.map((v, i) => {
                return `
             <li>
                 <a href="./detail.html?type=${type}&id=${v.goodsId}" target="_blank">
                     <div><img src="${v.goodsImg}" alt=""></div>
                     <h3>${v.goodsName}</h3>
                     <p>￥${v.goodsPrice}</p>
                 </a>
             </li>
             `
            }).join('').repeat(3)
            }
            </ul> 
        `;

        var tmp2 = `
        <h2>${data.title}<a href="#">平板电脑</a><a href="#">笔记本电脑</a><a href="#">笔记本配件</a><a href="#">查看更多 ></h2>
        <ul class="clearfix">
     ${
            data.goods_list.map((v, i) => {
                return `
             <li>
                 <a href="./detail.html?type=${type}&id=${v.goodsId}" target="_blank">
                     <div><img src="${v.goodsImg}" alt=""></div>
                     <h3>${v.goodsName}</h3>
                     <p>￥${v.goodsPrice}</p>
                 </a>
             </li>
             `
            }).join('').repeat(3)
            }
            </ul> 
        `;

        if(`${type}`==`phone`){
            $parent.html(tmp);

        }
        else{
            $parent.html(tmp2);

        }
    }

    return {
        goodsInit
    }
});