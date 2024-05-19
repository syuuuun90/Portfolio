// ナビ　追走-------------------
var elemTop = [64];

function PositionCheck() {
  var headerH = $("#header").outerHeight(true);

  $(".scroll-point").each(function (i) {
    elemTop[i] = Math.round(parseInt($(this).offset().top - headerH)); 
  });
}

function ScrollAnime() {
  var scroll = Math.round($(window).scrollTop());
  var NavElem = $(".nav__list-item"); 
  $(".nav__list-item").removeClass("current"); 
  if (scroll >= 0 && scroll < elemTop[1]) {
    $(NavElem[0]).addClass("current"); 
  } else if (scroll >= elemTop[1] && scroll < elemTop[2]) {
    $(NavElem[1]).addClass("current"); 
  } else if (scroll >= elemTop[2] && scroll < elemTop[3]) {
    $(NavElem[2]).addClass("current"); 
  } else if (scroll >= elemTop[3] && scroll < elemTop[4]) {
    $(NavElem[3]).addClass("current"); 
  } else if (scroll >= elemTop[4] && scroll < elemTop[5]) {
    $(NavElem[4]).addClass("current"); 
  } else if (scroll >= elemTop[5] && scroll < elemTop[6]) {
    $(NavElem[5]).addClass("current"); 
  } else if (scroll >= elemTop[6]) {
    $(NavElem[6]).addClass("current"); 
  }
}

//ナビクリック時スムーススクロール
$("#header__nav a").click(function () {
  var elmHash = $(this).attr("href"); 
  var headerH = $("#header").outerHeight(true); 
  var pos = Math.round($(elmHash).offset().top - headerH); 
  $("body,html").animate({ scrollTop: pos }, 500); 
  return false; 
});

$(window).scroll(function () {
  PositionCheck(); 
  ScrollAnime(); 
});

$(window).resize(function () {
  PositionCheck();
});
// ナビ　追走おわり-------------------

// ヒストリー　追走-------------------
function ScrollTimelineAnime() {
  $(".timeline li").each(function () {
    var elemPos = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var startPoint = 300;
    if (scroll >= elemPos - windowHeight - startPoint) {
      var H = $(this).outerHeight(true); 
      var percent = ((scroll + startPoint - elemPos) / (H / 2)) * 100;
      if (percent > 100) {
        percent = 100;
      }
      $(this)
        .children(".border-line")
        .css({
          height: percent + "%",
        });
    }
  });
}

$(window).on("scroll", function () {
  ScrollTimelineAnime();
});

// ヒストリー　追走おわり-------------------

// モーダルウィンドウ　-------------------

$(".modal-open").modaal({
  overlay_close: true, 
  before_open: function () {
    $("html").css("overflow-y", "hidden");
  },
  after_close: function () {
    $("html").css("overflow-y", "scroll");
  },
});
// モーダルウィンドウおわり　-------------------

// フェードイン　-------------------
function fadeAnime() {
  $(".fadeUpTrigger").each(function () {
    var elemPos = $(this).offset().top + 80;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("fadeUp");
    }
  });
}

$(window).scroll(function () {
  fadeAnime();
});
// フェードインおわり　-------------------

// タイプライター　-------------------
function TextTypingAnime() {
  $(".typing").each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var thisChild = "";
    if (scroll >= elemPos - windowHeight) {
      thisChild = $(this).children();
      thisChild.each(function (i) {
        var time = 120;
        $(this)
          .delay(time * i)
          .fadeIn(time);
      });
    } else {
      thisChild = $(this).children();
      thisChild.each(function () {
        $(this).stop();
        $(this).css("display", "none");
      });
    }
  });
}

setTimeout( function () {
  var element = $(".typing");
  element.each(function () {
    var text = $(this).html();
    var textbox = "";
    text.split("").forEach(function (t) {
      if (t !== " ") {
        textbox += "<span>" + t + "</span>";
      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);
  });

  TextTypingAnime();
},1400);
// タイプライターおわり　-------------------

// スキルセット　-------------------
window.addEventListener("DOMContentLoaded", () => {
  const skillEls = document.querySelectorAll(".skill__box-item");

  const animationDuration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(animationDuration / frameDuration);
  const easeOut = (t) => t * (2 - t);
  const animateCountUp = (el) => {
    let frame = 0;
    const countTo = parseInt(el.innerHTML, 10);
    const counter = setInterval(() => {
      frame++;
      const progress = easeOut(frame / totalFrames);
      const currentCount = Math.round(countTo * progress);

      if (parseInt(el.innerHTML, 10) !== currentCount) {
        el.innerHTML = currentCount;
      }

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };

  const cb = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const proficiencyVal = entry.target.dataset.proficiency;
        const skillBar = entry.target.querySelector(".skill-bar");
        const percentage = entry.target.querySelector(".skill-percentage");
        const countup = entry.target.querySelector(".countup");

        skillBar.style.width = proficiencyVal + "%";
        percentage.style.opacity = 1;
        countup.textContent = proficiencyVal;
        animateCountUp(countup);

        observer.unobserve(entry.target);
      }
    });
  };

  const options = {
    rootMargin: "-50px 0px",
  };

  const io = new IntersectionObserver(cb, options);
  io.POLL_INTERVAL = 100;
  skillEls.forEach((el) => {
    io.observe(el);
  });
});

// スキルセットおわり　-------------------

// ページぬるっと移動　-------------------
$('#page-link a[href*="#"]').click(function () {
  var elmHash = $(this).attr("href");
  var pos = $(elmHash).offset().top;
  $("body,html").animate({ scrollTop: pos }, 500);
  return false;
});
// ページぬるっと移動おわり　-------------------

// topページぬるっと移動　-------------------
$(function () {
  $("#js__page-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
      $("#js__page-top").fadeIn(500).css("display", "flex");
    } else {
      $("#js__page-top").fadeOut(200);
    }
  });
});
// topページぬるっと移動おわり　-------------------

// ハンバーガーメニュー　-------------------
$(".open_btn").click(function () {
  $(this).toggleClass('active');
    $(".g-nav").toggleClass('panelactive');
});
$(".g-nav a").click(function () {
    $(".open_btn").removeClass('active');
    $(".g-nav").removeClass('panelactive');
});

// ハンバーガーメニューおわり　-------------------

// フォーム文字カウント確認　-------------------

function testCheck() {
  var test = document.getElementById("inquiry").value;
  if (test.length < 30) {
    var validate = "入力内容を確認してください。";
    document.getElementById("validate_msg").innerHTML = validate;
    return false;
  }
}

// フォーム文字カウント　おわり-------------------

//logoの表示
$(window).on('load',function(){
  $("#splash").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
  $("#splash_logo").delay(1200).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
});
