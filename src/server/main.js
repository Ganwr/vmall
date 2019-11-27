define(['jquery'],function($){

    function getBannerData(){
       return  $.ajax('../mock/banner.json')
    }
    function getGoodsData(type){
        return $.ajax(`../mock/${type}.json`)
    }
    function getDetailData(type,goodsId){
        var promise =new Promise(function(resolve,reject){


            $.ajax(`../mock/${type}.json`).then((res)=>{
                var goods_list=res.goods_list;
              var result=  goods_list.filter(function(v,i){
                    return v.goodsId==goodsId;
                });
                resolve(result[0]);
            })

        });

return promise;
    
    }
   
    return {
        getBannerData,
        getGoodsData,
        getDetailData
    }
})