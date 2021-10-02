$(function () {
  // 字符串方式添加
  // var contentStr = "";
  // dataMock.forEach(item => {
  //     contentStr += `<li class="goods-list-item">
  //         <a href="detail.html?id=${item.id}">
  //           <div class="item-img">
  //             <img src="${item.imgSrc}" alt="">
  //           </div>
  //           <div class="item-title">
  //             ${item.name}
  //           </div>
  //           <div class="item-price">
  //             <span class="now">¥ ${item.price}</span>
  //           </div>
  //           <div class="sold">
  //             <span> 已售 <em>${item.percent}% </em></span>
  //             <div class="scroll">
  //               <div class="per" style="width:${item.percent}%;"></div>
  //             </div>
  //             <span>剩余<i>${item.left}</i>件</span>
  //           </div>
  //         </a>
  //         <a href="detail.html?id=${item.id}" class="buy">
  //           查看详情
  //         </a>
  //       </li>`
  // });
  // console.log(contentStr)
  // 数组方式添加
  var contentStr = [];
  dataMock.forEach(item => {
    contentStr.push(`<li class="goods-list-item">
        <a href="detail.html?id=${item.id}">
          <div class="item-img">
            <img src="${item.imgSrc}" alt="">
          </div>
          <div class="item-title">
            ${item.name}
          </div>
          <div class="item-price">
            <span class="now">¥ ${item.price}</span>
          </div>
          <div class="sold">
            <span> 已售 <em>${item.percent}% </em></span>
            <div class="scroll">
              <div class="per" style="width:${item.percent}%;"></div>
            </div>
            <span>剩余<i>${item.left}</i>件</span>
          </div>
        </a>
        <a href="detail.html?id=${item.id}" class="buy">
          查看详情
        </a>
      </li>`);
  });
  // console.log(contentStr)
  // 渲染到页面
  $(".goods-list ul").html(contentStr);

})