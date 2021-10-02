$(function () {
  var goods = JSON.parse(window.localStorage.getItem("goods")) || [];
  // 判断goods里面是否有数据
  if (goods.length > 0) {
    // 当本地存储有数据时，隐藏购物车为空模块和显示总价格模块
    $(".empty-tip").hide();
    $(".total-of").removeClass("hidden");
    // 用于判断勾选的商品数量
    var goodsNumber = 0;
    // 用于判断勾选的商品价格
    var goodsMoney = 0;
    // 将商品信息渲染到页面上
    newPage(goods);
    //设置商品数量和价钱总额
    setMoney(goods);
  } else {
    $(".empty-tip").show();
    $(".total-of").addClass("hidden");
  }


  // 设置商品数量和价钱总额的封装方法
  function setMoney(goods) {
    goodsMoney = 0;
    goodsNumber = 0;
    goods.forEach(item => {
      if (item.checked != false) {
        goodsNumber++;
        goodsMoney += item.goodsNumber * item.price;
      }
    });
    // 商品数量
    $(".selected").html(goodsNumber);
    // 商品价格
    $(".total-money").html(goodsMoney);
  }
  //购物车商品的重新渲染方法包装
  function newPage(goods) {
    // 创建页面模板
    var content = "";
    // 遍历goods,渲染页面
    goods.forEach(function (item) {
      content += `<div class="item" data-id="${item.id}">
          <div class="row">
            <div class="cell col-1 row">
              <div class="cell col-1">
                <input type="checkbox" class="item-ck"  ${item.checked ? 'checked' : ""}>
              </div>
              <div class="cell col-4">
                <img src="${item.imgSrc}" alt="">
              </div>
            </div>
            <div class="cell col-4 row">
              <div class="item-name">${item.name}</div>
            </div>
            <div class="cell col-1 tc lh70">
              <span>￥</span>
              <em class="price">${item.price}</em>
            </div>
            <div class="cell col-1 tc lh70">
              <div class="item-count">
                <a href="javascript:void(0);" class="reduce fl">-</a>
                <input autocomplete="off" type="text" class="number fl" value="${item.goodsNumber}">
                <a href="javascript:void(0);" class="add fl">+</a>
              </div>
            </div>
            <div class="cell col-1 tc lh70">
              <span>￥</span>
              <em class="computed">${item.goodsNumber * item.price}</em>
            </div>
            <div class="cell col-1">
              <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
            </div>
          </div>
        </div> `
      // 判断全选按钮是否勾选
      if (item.checked == false) {
        $(".pick-all").prop("checked", false);
      }
    });
    // 将数据渲染到页面
    $(".item-list").html(content);
  }

  // 全选按钮设置
  $(".pick-all").click(function () {
    // 判断当前复选框的状态
    let bl = $(this).prop("checked");
    // 遍历全选复选框， 设置复选框的状态
    $(".pick-all").each(function (index, item) {
      $(item).prop("checked", bl);
    });
    // 遍历商品复选框，统一设置状态
    $(".item-ck").each(function (index, item) {
      $(item).prop("checked", bl);
    });
    var goods = JSON.parse(window.localStorage.getItem("goods")) || [];
    // 改变本地存储里的商品状态
    goods.forEach(item => {
      item.checked = bl;
    });
    //设置商品数量和价钱总额
    setMoney(goods);
    window.localStorage.setItem("goods", JSON.stringify(goods));


  });

  // 当取消当个商品全选按钮不勾选
  $(".item-list").on("click", ".item-ck", function () {
    // 判断当前复选框的状态
    let bl = $(this).prop("checked");
    var goods = JSON.parse(window.localStorage.getItem("goods")) || [];
    // 根据商品所在的索引， 给goods里相对应的对象改变checked状态
    goods[$(this).parents(".item").index()].checked = bl;
    // 判定全选框是否勾选
    let isCheck = true;
    goods.forEach(item => {
      if (item.checked == false) {
        isCheck = false;
      }
    });
    // 设置全选复选框
    $(".pick-all").prop("checked", isCheck);
    //设置商品数量和价钱总额
    setMoney(goods);
    window.localStorage.setItem("goods", JSON.stringify(goods));
  });
  // 删除
  // 运用了jQuery的事件委托
  $(".item-list").on("click", ".item-del", function () {
    // 找到点击元素的.item父类在.item - list里的索引
    var goodsIndex = $(this).parents(".item").index();
    var goods = JSON.parse(window.localStorage.getItem("goods")) || [];
    // 删除goods里对应索引的数据
    goods.splice(goodsIndex, 1);
    //设置商品数量和价钱总额
    setMoney(goods);
    window.localStorage.setItem("goods", JSON.stringify(goods));
    // 将商品信息渲染到页面上
    newPage(goods);
  });
  // 加号键
  $(".item-list").on("click", ".add", function () {
    var val = parseInt($(this).siblings("input").val()) + 1;
    $(this).siblings("input").val(val);
    // 改变本地存储
    var goods = JSON.parse(window.localStorage.getItem("goods")) || [];
    goods[$(this).parents(".item").index()].goodsNumber = val;
    //设置商品数量和价钱总额
    setMoney(goods);
    window.localStorage.setItem("goods", JSON.stringify(goods));
  });
  // 减号键
  $(".item-list").on("click", ".reduce", function () {
    var val = parseInt($(this).siblings("input").val());
    if (val == 1) {
      val = 1;
    } else {
      val--;
    }
    $(this).siblings("input").val(val);
    // 改变本地存储
    var goods = JSON.parse(window.localStorage.getItem("goods")) || [];
    goods[$(this).parents(".item").index()].goodsNumber = val;
    //设置商品数量和价钱总额
    setMoney(goods);
    window.localStorage.setItem("goods", JSON.stringify(goods));
  });
  // 直接输入框修改数量
  $(".item-list").on("blur", ".number", function () {
    var val = $(this).val();
    if (val < 1 || isNaN(val)) {
      val = 1;
    }
    $(this).val(val);
    // 改变本地存储
    var goods = JSON.parse(window.localStorage.getItem("goods")) || [];
    goods[$(this).parents(".item").index()].goodsNumber = val;
    //设置商品数量和价钱总额
    setMoney(goods);
    window.localStorage.setItem("goods", JSON.stringify(goods));
  });
})