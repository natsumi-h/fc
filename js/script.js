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
          return false;
        } else {
          $(".txt-error.type").css("display", "none");
          return true;
        }
      };

      //メールアドレス
      let emailEmpty = $('input[id="email"]').val().length == 0;
      let emailIncorrect = !$('input[id="email"]')
        .val()
        .match(
          "^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$"
        );
      let emailLong = $('input[id="email"]').val().length > 200;
      const validateEmail = () => {
        if (emailEmpty) {
          $(".txt-error.email").css("display", "block");
          $(".txt-error.email-length").css("display", "none");
          $(".txt-error.email-wrong").css("display", "none");
          return false;
        } else if (emailIncorrect) {
          $(".txt-error.email-wrong").css("display", "block");
          $(".txt-error.email").css("display", "none");
          $(".txt-error.email-length").css("display", "none");
          return false;
        } else if (!emailIncorrect && emailLong) {
          $(".txt-error.email-wrong").css("display", "none");
          $(".txt-error.email").css("display", "none");
          $(".txt-error.email-length").css("display", "block");
          return false;
        } else if (!emailIncorrect && !emailLong) {
          $(".txt-error.email-wrong").css("display", "none");
          $(".txt-error.email").css("display", "none");
          $(".txt-error.email-length").css("display", "none");
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
          return false;
        } else {
          $(".txt-error.message").css("display", "none");
          return true;
        }
      };

      // 文字数
      const validateNameLength = () => {
        if ($('input[id="name"]').val().length > 50) {
          $(".txt-error.name-length").css("display", "block");
          return false;
        } else {
          $(".txt-error.name-length").css("display", "none");
          return true;
        }
      };

      const validateCompanyLength = () => {
        if ($('input[id="company"]').val().length > 100) {
          $(".txt-error.company-length").css("display", "block");
          return false;
        } else {
          $(".txt-error.company-length").css("display", "none");
          return true;
        }
      };

      const validatePhoneLength = () => {
        if ($('input[id="phone"]').val().length > 50) {
          $(".txt-error.phone-length").css("display", "block");
          return false;
        } else {
          $(".txt-error.phone-length").css("display", "none");
          return true;
        }
      };

      const validateUrlLength = () => {
        if ($('input[id="url"]').val().length > 200) {
          $(".txt-error.url-length").css("display", "block");
          return false;
        } else {
          $(".txt-error.url-length").css("display", "none");
          return true;
        }
      };

      const validateMessageLength = () => {
        if ($('textarea[id="message"]').val().length > 1000) {
          $(".txt-error.message-length").css("display", "block");
          return false;
        } else {
          $(".txt-error.message-length").css("display", "none");
          return true;
        }
      };

      // バリデーション実行
      validateName();
      validateType();
      validateEmail();
      validateMessage();
      validatePolicyAgreement();
      validateNameLength();
      validateCompanyLength();
      validatePhoneLength();
      validateUrlLength();
      validateMessageLength();

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
        // 二重送信を防止する
        $('[id="form"]').find(":submit").prop("disabled", "true");
        $(".contact-form-button").fadeOut();

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
              // $(".contact-form-button").fadeOut();
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
