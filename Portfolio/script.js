// ナビ　追走-------------------
//基準点の準備
var elemTop = [64];

//現在地を取得するための設定を関数でまとめる
function PositionCheck() {
  //headerの高さを取得
  var headerH = $("#header").outerHeight(true);

  //.scroll-pointというクラス名がついたエリアの位置を取得する設定
  $(".scroll-point").each(function (i) {
    //.scroll-pointクラスがついたエリアからトップまでの距離を計算して設定
    elemTop[i] = Math.round(parseInt($(this).offset().top - headerH)); //追従するheader分の高さ（70px）を引き小数点を四捨五入
  });
}

//ナビゲーションに現在地のクラスをつけるための設定
function ScrollAnime() {
  //スクロールした際のナビゲーションの関数にまとめる
  var scroll = Math.round($(window).scrollTop());
  var NavElem = $(".nav__list-item"); //ナビゲーションのliの何番目かを定義するための準備
  $(".nav__list-item").removeClass("current"); //全てのナビゲーションの現在地クラスを除去
  if (scroll >= 0 && scroll < elemTop[1]) {
    $(NavElem[0]).addClass("current"); //1つめのliに現在地クラスを付与
  } else if (scroll >= elemTop[1] && scroll < elemTop[2]) {
    //.scroll-point 1つめ（area-1）以上.scroll-point 2つめ（area-2）未満
    $(NavElem[1]).addClass("current"); //2つめのliに現在地クラスを付与
  } else if (scroll >= elemTop[2] && scroll < elemTop[3]) {
    //.scroll-point 2つめ（area-2）以上.scroll-point 3つめ（area-3）未満
    $(NavElem[2]).addClass("current"); //3つめのliに現在地クラスを付与
  } else if (scroll >= elemTop[3] && scroll < elemTop[4]) {
    //.scroll-point 2つめ（area-2）以上.scroll-point 3つめ（area-3）未満
    $(NavElem[3]).addClass("current"); //3つめのliに現在地クラスを付与
  } else if (scroll >= elemTop[4] && scroll < elemTop[5]) {
    //.scroll-point 2つめ（area-2）以上.scroll-point 3つめ（area-3）未満
    $(NavElem[4]).addClass("current"); //3つめのliに現在地クラスを付与
  } else if (scroll >= elemTop[5] && scroll < elemTop[6]) {
    //.scroll-point 2つめ（area-2）以上.scroll-point 3つめ（area-3）未満
    $(NavElem[5]).addClass("current"); //3つめのliに現在地クラスを付与
  } else if (scroll >= elemTop[6]) {
    // .scroll-point 3つめ（area-3）以上.scroll-point 4つめ（area-4）未満
    $(NavElem[6]).addClass("current"); //4つめのliに現在地クラスを付与
  }
}

//ナビゲーションをクリックした際のスムーススクロール
$("#header__nav a").click(function () {
  var elmHash = $(this).attr("href"); //hrefの内容を取得
  var headerH = $("#header").outerHeight(true); //追従するheader分の高さ（70px）を引く
  var pos = Math.round($(elmHash).offset().top - headerH); //headerの高さを引き小数点を四捨五入
  $("body,html").animate({ scrollTop: pos }, 500); //取得した位置にスクロール※数値が大きいほどゆっくりスクロール
  return false; //リンクの無効化
});

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PositionCheck(); /* 現在地を取得する関数を呼ぶ*/
  ScrollAnime(); /* ナビゲーションに現在地のクラスをつけるための関数を呼ぶ*/
});

// // ページが読み込まれたらすぐに動かしたい場合の記述
// $(window).on("load", function () {
//   PositionCheck(); /* 現在地を取得する関数を呼ぶ*/
//   ScrollAnime(); /* ナビゲーションに現在地のクラスをつけるための関数を呼ぶ*/
// });

$(window).resize(function () {
  //リサイズされたときの処理
  PositionCheck();
});
// ナビ　追走おわり-------------------

// ヒストリー　追走-------------------
//線が伸びるための設定を関数でまとめる
function ScrollTimelineAnime() {
  $(".timeline li").each(function () {
    // それぞれのli要素の
    var elemPos = $(this).offset().top; // 上からの高さ取得
    var scroll = $(window).scrollTop(); // スクロール値取得
    var windowHeight = $(window).height(); // windowの高さ取得
    var startPoint = 300; //線をスタートさせる位置を指定
    if (scroll >= elemPos - windowHeight - startPoint) {
      var H = $(this).outerHeight(true); //liの余白と高さを含めた数値を取得
      //スクロール値から要素までの高さを引いた値を、liの高さの半分のパーセントで出す
      var percent = ((scroll + startPoint - elemPos) / (H / 2)) * 100; //liの余白と高さの半分で線を100％に伸ばす

      // 100% を超えたらずっと100%を入れ続ける
      if (percent > 100) {
        percent = 100;
      }
      // ボーダーの長さをセット
      $(this)
        .children(".border-line")
        .css({
          height: percent + "%", //CSSでパーセント指定
        });
    }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).on("scroll", function () {
  ScrollTimelineAnime(); // 線が伸びる関数を呼ぶ
});

// // ページが読み込まれたらすぐに動かしたい場合
// $(window).on('load', function(){
// 	ScrollTimelineAnime();// 線が伸びる関数を呼ぶ
// });

// ヒストリー　追走おわり-------------------

// モーダルウィンドウ　-------------------
///初回のみモーダルをすぐ出す判定。flagがモーダル表示のstart_open後に代入される
var access = $.cookie("access");
if (!access) {
  flag = true;
  $.cookie("access", false);
} else {
  flag = false;
}

//モーダル表示
$(".modal-open").modaal({
  start_open: flag, // ページロード時に表示するか
  overlay_close: true, //モーダル背景クリック時に閉じるか
  before_open: function () {
    // モーダルが開く前に行う動作
    $("html").css("overflow-y", "hidden"); /*縦スクロールバーを出さない*/
  },
  after_close: function () {
    // モーダルが閉じた後に行う動作
    $("html").css("overflow-y", "scroll"); /*縦スクロールバーを出す*/
  },
});
// モーダルウィンドウおわり　-------------------

// フェードイン　-------------------
// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime() {
  // ふわっ
  $(".fadeUpTrigger").each(function () {
    //fadeUpTriggerというクラス名が
    var elemPos = $(this).offset().top + 80; //要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("fadeUp"); // 画面内に入ったらfadeUpというクラス名を追記
    }
  });
}
// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  fadeAnime(); /* アニメーション用の関数を呼ぶ*/
});
// // 画面が読み込まれたらすぐに動かしたい場合は以下を使う
//   $(window).on('load', function(){
//     fadeAnime();/* アニメーション用の関数を呼ぶ*/
//   });
// フェードインおわり　-------------------

// タイプライター　-------------------
// TextTypingというクラス名がついている子要素（span）を表示から非表示にする定義
function TextTypingAnime() {
  $(".typing").each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var thisChild = "";
    if (scroll >= elemPos - windowHeight) {
      thisChild = $(this).children(); //spanタグを取得
      //spanタグの要素の１つ１つ処理を追加
      thisChild.each(function (i) {
        var time = 120;
        //時差で表示する為にdelayを指定しその時間後にfadeInで表示させる
        $(this)
          .delay(time * i)
          .fadeIn(time);
      });
    } else {
      thisChild = $(this).children();
      thisChild.each(function () {
        $(this).stop(); //delay処理を止める
        $(this).css("display", "none"); //spanタグ非表示
      });
    }
  });
}

// // 画面をスクロールをしたら動かしたい場合の記述
// $(window).scroll(function () {
//   TextTypingAnime();/* アニメーション用の関数を呼ぶ*/
// });

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  //spanタグを追加する
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

  TextTypingAnime(); /* アニメーション用の関数を呼ぶ*/
});
// タイプライターおわり　-------------------

// スキルセット　-------------------
window.addEventListener("DOMContentLoaded", () => {
  // DOM要素を取得
  const skillEls = document.querySelectorAll(".skill__box-item");

  // カウントアップの設定
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

  // Intersection observerに渡すコールバック関数
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

  // Intersection observerに渡すオプション
  const options = {
    rootMargin: "-50px 0px",
  };

  // IntersectionObserver初期化
  const io = new IntersectionObserver(cb, options);
  io.POLL_INTERVAL = 100; // Polyfillの設定
  skillEls.forEach((el) => {
    io.observe(el);
  });
});

// スキルセットおわり　-------------------

// ページぬるっと移動　-------------------
$('#page-link a[href*="#"]').click(function () {
  var elmHash = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  var pos = $(elmHash).offset().top; //idの上部の距離を取得
  $("body,html").animate({ scrollTop: pos }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
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
$(function () {
  $("#js-hamburger-menu, .navigation__link").on("click", function () {
    $(".navigation").slideToggle(500);
    $(".hamburger-menu").toggleClass("hamburger-menu--open");
  });
});
// ハンバーガーメニューおわり　-------------------
