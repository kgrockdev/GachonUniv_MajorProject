// variables
let userName = sessionStorage.getItem("email")
  ? sessionStorage.getItem("email")
  : null;
let state = "SUCCESS";
let auth = sessionStorage.getItem("auth") ? true : false;
let giveHelp = false;

// functions
function Message(arg) {
  this.text = arg.text;
  this.message_side = arg.message_side;

  this.draw = (function (_this) {
    return function () {
      let $message;
      $message = $($(".message_template").clone().html());
      $message.addClass(_this.message_side).find(".text").html(_this.text);
      $(".messages").append($message);

      return setTimeout(function () {
        return $message.addClass("appeared");
      }, 0);
    };
  })(this);
  return this;
}

function getMessageText() {
  let $message_input;
  $message_input = $(".message_input");
  return $message_input.val();
}

function sendMessage(text, message_side) {
  let $messages, message;
  $(".message_input").val("");
  $messages = $(".messages");
  message = new Message({
    text: text,
    message_side: message_side,
  });
  message.draw();
  $messages.animate({ scrollTop: $messages.prop("scrollHeight") }, 300);
}

function greet() {
  userName = sessionStorage.getItem("email")
    ? sessionStorage.getItem("email")
    : null;
  auth = sessionStorage.getItem("auth") ? true : false;

  userName
    ? setTimeout(function () {
        return sendMessage(`환영합니다 ${userName} 님!`, "left");
      }, 1000)
    : setTimeout(function () {
        return sendMessage("사용할 닉네임을 알려주세요.", "left");
      }, 2000);

  userName
    ? setTimeout(function () {
        return sendMessage(
          "저는 당신의 고민을 들어주고 답해주는 WithUS의 마스코트 위둥이입니다!",
          "left"
        );
      }, 2000)
    : () => {};
  userName
    ? setTimeout(function () {
        return sendMessage(
          "당신의 고민이나 사소한 잡담 등 무엇이든 말해주세요!",
          "left"
        );
      }, 3000)
    : () => {};
  userName
    ? setTimeout(function () {
        return sendMessage(
          "'봉사하기'를 입력하면 스마트한 위둥이가 도움 매칭 서비스를 제공해드립니다!",
          "left"
        );
      }, 3000)
    : () => {};
}

function onClickAsEnter(e) {
  if (e.keyCode === 13) {
    onSendButtonClicked();
  }
}

function setUserName(username) {
  if (username != null && username.replace(" ", "" !== "")) {
    setTimeout(function () {
      return sendMessage(
        "반갑습니다." + username + "님. 닉네임이 설정되었습니다.",
        "left"
      );
    }, 1000);
    setTimeout(function () {
      return sendMessage(
        "저는 당신의 고민을 들어주고 답해주는 WithUS의 마스코트 위둥이입니다!",
        "left"
      );
    }, 2000);
    setTimeout(function () {
      return sendMessage(
        "당신의 고민이나 사소한 잡담 등 무엇이든 말해주세요!",
        "left"
      );
    }, 3000);
    setTimeout(function () {
      return sendMessage(
        "'봉사하기'를 입력하면 스마트한 위둥이가 도움 매칭 서비스를 제공해드립니다!",
        "left"
      );
    }, 3000);

    return username;
  } else {
    setTimeout(function () {
      return sendMessage("올바른 닉네임을 이용해주세요.", "left");
    }, 1000);

    return null;
  }
}

function requestChat(messageText) {
  $.ajax({
    url: "https://withus.p-e.kr:5000/chat",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ user_email: userName, user_chat: messageText }),
    dataType: "json",
    success: function (data) {
      setTimeout(function () {
        return sendMessage(data.reply, "left");
      }, 1000);

      $.ajax({
        url: `https://www.withus-user-iot.kro.kr/api/user/fbe/${userName}`,
        type: "GET",
        success: function (data) {
          if (data.dpScore === 10) {
            setTimeout(function () {
              return sendMessage(
                "요즘 많이 우울하신 것 같은데 전문가에게 한번 검사를 받아보시는건 어떠신가요?",
                "left"
              );
            }, 1000);

            setTimeout(function () {
              return sendMessage(
                "<a href='https://www.cyber1388.kr:447/' target='_blank'>이동하기<a>",
                "left"
              );
            }, 1000);
          }
        },
        error: function (request, status, error) {
          console.log(error);
        },
      });
    },
    error: function (request, status, error) {
      console.log(error);
      return sendMessage("죄송합니다. 서버 연결에 실패했습니다.", "left");
    },
  });
}

function giveHelpTalkBot() {
  setTimeout(function () {
    return sendMessage(
      "다음 사이트에서 스마트한 위둥이와의 대화를 하고 결과 값을 입력해주세요!",
      "left"
    );
  }, 1000);
  setTimeout(function () {
    return sendMessage(
      "<a href='http://175.106.98.133:8071/chat/#/1/288717ca-d5be-4fab-87a9-5e11f33b7589?embedded=true' target='_blank'>이동하기<a>",
      "left"
    );
  }, 1000);

  giveHelp = true;
}

function giveHelpAjax(messageText) {
  console.log(JSON.parse(messageText));

  $.ajax({
    url: `https://withus-board-server.herokuapp.com/bot?category=${encodeURI(
      JSON.parse(messageText).board.category
    )}&start_end=${encodeURI(
      JSON.parse(messageText).board.start_end
    )}&date=${encodeURI(JSON.parse(messageText).board.date)}&latlng=${encodeURI(
      JSON.parse(messageText).board.latlng
    )}`,
    success: function (data) {
      setTimeout(function () {
        return sendMessage("스마트한 위둥이의 추천 목록입니다!", "left");
      }, 1000);

      console.log(data);

      setTimeout(function () {
        return sendMessage(
          `<a href='https://withus.vercel.app/read?id=${data.resultList[0].board_id}'>${data.resultList[0].board_title}<a>`,
          "left"
        );
      }, 1000);
      setTimeout(function () {
        return sendMessage(
          `<a href='https://withus.vercel.app/read?id=${data.resultList[1].board_id}'>${data.resultList[1].board_title}<a>`,
          "left"
        );
      }, 1000);
      setTimeout(function () {
        return sendMessage(
          `<a href='https://withus.vercel.app/read?id=${data.resultList[2].board_id}'>${data.resultList[2].board_title}<a>`,
          "left"
        );
      }, 1000);

      giveHelp = false;
    },
    error: function (xhr) {
      console.log("실패 - ", xhr);
    },
  });
}

function onSendButtonClicked() {
  let messageText = getMessageText();
  sendMessage(messageText, "right");

  if (userName == null) {
    userName = setUserName(messageText);
  } else {
    if (giveHelp == true) {
      giveHelpAjax(messageText);
    } else {
      if (messageText.includes("봉사하기")) {
        giveHelpTalkBot();
      } else {
        if (messageText.includes("안녕")) {
          setTimeout(function () {
            return sendMessage(
              "안녕하세요. 저는 WithUS의 마스코트 위둥이입니다!",
              "left"
            );
          }, 1000);
        } else if (messageText.includes("고마워")) {
          setTimeout(function () {
            return sendMessage("천만에요. 더 물어보실 건 없나요?", "left");
          }, 1000);
        } else if (messageText.includes("없어")) {
          setTimeout(function () {
            return sendMessage("그렇군요. 알겠습니다!", "left");
          }, 1000);
        } else {
          return requestChat(messageText);
        }
      }
    }
  }
}
