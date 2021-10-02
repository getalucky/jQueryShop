$(function () {
    var myId = location.search.split("=")[1];
    // console.log(myId);
    // 判断是否获得商品ID，判断是否非法进入
    if (myId == undefined) {
        alert("非法进入！");
        window.location.href = "./list.html";
    }
    let pro = dataMock.filter(function (item) {
        return item.id == myId;
    })[0];
    // console.log(pro)
    $(".preview-img img").prop("src", pro.imgSrc);
    $(".sku-name").text(pro.name);
    $(".summary-price .dd em").text(pro.price)


    // 点击加入购物车
    $(".addshopcar").click(function () {
        var goods = JSON.parse(window.localStorage.getItem("goods")) || [];
        var goodsNumber = +$(".choose-number").val();
        // 判断是否第一次写入存储 bl == true 事是第一次，为false不是第一次
        var bl = true;
        goods.forEach(item => {
            if (item.id == myId) {
                // 改变数组里的goodsNumber的值
                item.goodsNumber += goodsNumber;
                bl = false;
            }
        });
        if (bl) {
            pro.goodsNumber = goodsNumber;
            pro.checked = true;
            goods.unshift(pro);
        }
        // 写入本地存储
        window.localStorage.setItem("goods", JSON.stringify(goods));
        // 跳转到购物车页面
        window.location.href = "cart.html";
    });

    // 加商品键
    $(".add").click(function () {
        var goodsVal = +$(".choose-number").val();
        goodsVal += 1;
        $(".choose-number").val(goodsVal);
        $(".reduce").removeClass("disabled");
    });
    // 减商品键
    $(".reduce").click(function () {
        var goodsVal = +$(".choose-number").val();
        goodsVal -= 1;
        if (goodsVal == 1) {
            $(".reduce").addClass("disabled");
        }
        $(".choose-number").val(goodsVal);
    });

})