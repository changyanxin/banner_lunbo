$(function(){
    var $box = $("#box");       
    var imgs =  [ 'img/b1.png','img/b2.png','img/b3.png','img/b4.png','img/b5.png'];
    var len = imgs.length;   
    var time =  2000; 
    var currentImage = 0;                
    var timer;                      // 定时器
  
    var $slider = $('<div class="slider" id="slider"></div>');
    var $leftBtn = $('<span id="left"><</span>');
    var $rightBtn = $('<span id="right">></span>');
    var $nav = $('<ul class="nav" id="navs"></ul>');
    $box.append($slider).append($leftBtn).append($rightBtn).append($nav);

   
    for (var i = 0; i < len; i++) {
      var $slide = $('<div class="slide"><img src="' + imgs[i] + '" alt=""></div>');
      $slider.append($slide);
    }
    $slider.prepend($(".slide").last().clone());//在选中元素的开头添加
    $slider.append($(".slide").first().clone());
  
    var $li = [];
    for (var i = 0; i < len; i++) {
      $li[i] = $('<li>' + (i + 1) +'</li>');
      if(i == 0){
        $li[i].addClass("active");
      }
      $nav.append($li[i]);
    }

    // 移动函数
    function move(toImage, callback=null) {
      var spacing = toImage - currentImage;
      if (spacing > 0) {
        spacing = '-=' + (spacing * 1200);
      } else if (spacing < 0) {
        spacing = '+=' + (spacing * -1200);
      } else {
        return 0;
      }
      $slider.animate({'left': spacing}, 1000, callback);
    }
  
    // 上一张图片及指示点变化
    function prev() {
      if (currentImage == 0) {
        $li[$li.length-1].addClass("active");
        $li[0].removeClass("active");
        move(-1, function() {
          $slider.css('left', -1200 * len);
        });
        currentImage = len - 1;
      } else {
        $li[currentImage - 1].addClass("active");
        $li[currentImage].removeClass("active");
        move(currentImage - 1);
        currentImage--;
      }
    }
  
    // 下一张图片及指示点变化
    function next() {
      if (currentImage == len - 1) {
        $li[0].addClass("active");
        $li[$li.length-1].removeClass("active");
        move(len, function() {
          $slider.css('left', -1200);
        });
        currentImage = 0;
      } else {
        $li[currentImage + 1].addClass("active");
        $li[currentImage].removeClass("active");
        move(currentImage + 1);
        currentImage++;
      }
    }

    // 鼠标移入移出事件
    $box.mouseover(function(){
        clearInterval(timer);
        $leftBtn.css({ 'opacity': 0.5});
        $rightBtn.css({'opacity': 0.5});
    })
    $box.mouseout(function(){
        timer=setInterval(next, time);
        $leftBtn.css({ 'opacity': 0});
        $rightBtn.css({'opacity': 0});
    })
  
    // 左右span点击事件
    $leftBtn.click(prev);
    $rightBtn.click(next);    
  
    // 指示点点击事件
    for (var i = 0; i < len; i++) {
      (function(j) {
        $li[j].click(function() {
          for (var k = 0; k < len; k++) {
              $li[k].removeClass("active");
          }
          $li[j].addClass("active")
          move(j);
          currentImage = j;
        });
      })(i);
    }
  
    timer = setInterval(next, time);
  
    
}());
