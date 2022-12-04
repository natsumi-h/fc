jQuery(function () {
  jQuery.noConflict();
  var $ = jQuery;

  $(function () {
    SmoothScroll();
    ToTop();
    FormSubmit();
    ChangeSelectOptionColor();
  });

  // スムーススクロール
  const SmoothScroll = () => {
    $('a[href^="#"]').click(function () {
      if (window.matchMedia("(min-width: 415px)").matches) {
        // PC表示の時の処理
        var headerHight = 0;
      } else {
        // スマホ表示の時の処理
        var headerHight = 65;
      }

      //ヘッダーの高さが可変するときは上を下の記述に置き換える
      //var headerHight = jQuery("header").outerHeight();
      var speed = 300;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? "html" : href);
      var position = target.offset().top - headerHight;
      $("body,html").animate({ scrollTop: position }, speed, "swing");
      return false;
    });
  };

  // トップへ戻る
  const ToTop = () => {
    $(function () {
      var top = $("#totop");
      top.click(function () {
        $("body,html").animate(
          {
            scrollTop: 0,
          },
          300
        );
        return false;
      });
    });
  };

  // フォームバリデーション
  //submitクリックのときにバリデーションをする。
  const FormSubmit = () => {
    $('[id="form"]').submit(function (e) {
      e.preventDefault();

      //名前
      const validateName = () => {
        if ($('input[id="name"]').val().length == 0) {
          $(".txt-error.name").css("display", "block");
          // $('input[id="name"]').addClass("input-error");
          return false;
        } else {
          $(".txt-error.name").css("display", "none");
          // $('input[id="name"]').removeClass("input-error");
          return true;
        }
      };

      //お問合せ内容
      const validateType = () => {
        if ($('select[id="type"]').find("option:selected").val() == "") {
          $(".txt-error.type").css("display", "block");
          // $('select[id="type"]').addClass("input-error");
          return false;
        } else {
          $(".txt-error.type").css("display", "none");
          // $('select[id="type"]').removeClass("input-error");
          return true;
        }
      };

      //メールアドレス
      let emailEmpty = $('input[id="email"]').val().length == 0;
      let emailIncorrect = !$('input[id="email"]')
        .val()
        .match(
          /^((?:(?:(?:(?:(?:(?:[\x20\x09])+)?(?:\((?:(?:(?:[\x20\x09])+)?(?:[\x09\x20-\x28\x2a-\x7e]))*(?:(?:[\x20\x09])+)?\)))*(?:(?:(?:(?:[\x20\x09])+)?(?:\((?:(?:(?:[\x20\x09])+)?(?:[\x09\x20-\x28\x2a-\x7e]))*(?:(?:[\x20\x09])+)?\)))|(?:(?:[\x20\x09])+)))?(?:(?:[A-Za-z0-9!#\$\%&amp;'*+\-/=?\^_`{|}~])+(?:[A-Za-z0-9!#\$\%&amp;'*+\-/=?\^_`{|}~\.])*)(?:(?:(?:[A-Za-z0-9!#\$\%&amp;'*+\-/=?\^_`{|}~])+(?:[A-Za-z0-9!#\$\%&amp;'*+\-/=?\^_`{|}~\.])*)|(?:\((?:(?:(?:[\x20\x09])+)?(?:[\x09\x20-\x28\x2a-\x7e]))*(?:(?:[\x20\x09])+)?\)))*)|(?:(?:(?:(?:(?:[\x20\x09])+)?(?:\((?:(?:(?:[\x20\x09])+)?(?:[\x09\x20-\x28\x2a-\x7e]))*(?:(?:[\x20\x09])+)?\)))*(?:(?:(?:(?:[\x20\x09])+)?(?:\((?:(?:(?:[\x20\x09])+)?(?:[\x09\x20-\x28\x2a-\x7e]))*(?:(?:[\x20\x09])+)?\)))|(?:(?:[\x20\x09])+)))?"(?:(?:\((?:(?:(?:[\x20\x09])+)?(?:[\x09\x20-\x28\x2a-\x7e]))*(?:(?:[\x20\x09])+)?\))|(?:[A-Za-z0-9!#\$\%&amp;'*+\-/=?\^_`{|}~\.]))*"(?:\((?:(?:(?:[\x20\x09])+)?(?:[\x09\x20-\x28\x2a-\x7e]))*(?:(?:[\x20\x09])+)?\))*))\@(?:(?:\((?:(?:(?:[\x20\x09])+)?(?:[\x09\x20-\x28\x2a-\x7e]))*(?:(?:[\x20\x09])+)?\))*(?:(?:[A-Za-z0-9!#\$\%&amp;'*+/=?\^_`{|}~])+(?:\-+(?:[A-Za-z0-9!#\$\%&amp;'*+/=?\^_`{|}~])+)*(?:\.(?:[A-Za-z0-9!#\$\%&amp;'*+/=?\^_`{|}~])+(?:\-+(?:[A-Za-z0-9!#\$\%&amp;'*+/=?\^_`{|}~])+)*)+)(?:(?:(?:(?:[\x20\x09])+)?(?:\((?:(?:(?:[\x20\x09])+)?(?:[\x09\x20-\x28\x2a-\x7e]))*(?:(?:[\x20\x09])+)?\)))*(?:(?:(?:(?:[\x20\x09])+)?(?:\((?:(?:(?:[\x20\x09])+)?(?:[\x09\x20-\x28\x2a-\x7e]))*(?:(?:[\x20\x09])+)?\)))|(?:(?:[\x20\x09])+)))?))$/
        );
      const validateEmail = () => {
        //空欄時
        if (emailEmpty) {
          $(".txt-error.email").css("display", "block");
          $(".txt-error.email-wrong").css("display", "none");
          return false;
        }
        //空欄ではなく、非正規表現のとき
        else if (!emailEmpty && emailIncorrect) {
          $(".txt-error.email-wrong").css("display", "block");
          $(".txt-error.email").css("display", "none");
          return false;
        }
        //空欄でもなく、非正規表現でもないとき
        else {
          $(".txt-error.email-wrong").css("display", "none");
          $(".txt-error.email").css("display", "none");
          return true;
        }
      };

      //利用規約が確認されていない
      const validatePolicyAgreement = () => {
        if (!$('input[id="privacyPoicy"]').is(":checked")) {
          $(".txt-error.privacyPolicy").css("display", "block");
          return false;
        } else {
          $(".txt-error.privacyPolicy").css("display", "none");
          return true;
        }
      };

      //お問合せ詳細
      const validateMessage = () => {
        if ($('textarea[id="message"]').val().length == 0) {
          $(".txt-error.message").css("display", "block");
          // $('input[id="name"]').addClass("input-error");
          return false;
        } else {
          $(".txt-error.message").css("display", "none");
          // $('input[id="name"]').removeClass("input-error");
          return true;
        }
      };

      // バリデーション実行
      validateName();
      validateType();
      validateEmail();
      validateMessage();
      validatePolicyAgreement();

      // Ajax通信中
      $(document).ajaxSend(function () {
        $(".loading").css("display", "block");
      });

      // バリデーション問題なければ、Ajax通信
      if (
        validateName() &&
        validateType() &&
        validateEmail() &&
        validateMessage() &&
        validatePolicyAgreement()
      ) {
        $(".txt-error.wrongInputs").css("display", "none");
        var formData = $("#form").serialize();
        $.ajax({
          url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfdRDHf0DmCYPIJ5orPrwPyW9iNyZuG0HRuWeCjfaVRPK90uw/formResponse",
          data: formData,
          type: "POST",
          dataType: "xml",
          statusCode: {
            0: function () {
              $(".txt-thanks").slideDown();
              $(".contact-form-button").fadeOut();
              $(".loading").css("display", "none");
            },
            200: function () {
              $(".txt-submitError").slideDown();
              $(".loading").css("display", "none");
            },
          },
        });
      } else {
        $(".txt-error.wrongInputs").css("display", "block");
        return false;
      }
      7;
    });
  };

  // フォームセレクトボックス色変更
  //セレクトボックス選択されたらis-selectedのクラスをつけて色を変える
  const ChangeSelectOptionColor = () => {
    $("select option:first-child").addClass("select-label");
    $("select").on("change", function () {
      var itemSelect = $(this).find("option:selected").hasClass("select-label");
      if (itemSelect) {
        $(this).parents(".dd-select").removeClass("select-option");
      } else {
        $(this).parents(".dd-select").addClass("select-option");
      }
    });
  };
});
