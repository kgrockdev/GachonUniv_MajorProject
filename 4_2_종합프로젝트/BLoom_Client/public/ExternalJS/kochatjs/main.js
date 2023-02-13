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

function onClickAsEnter(e) {
  if (typeof e == "undefined" || e == null || e == "") return;
  if (e.keyCode === 13) {
    onSendButtonClicked();
  }
}

function requestChat(messageText) {
  $.ajax({
    url: "https://cors-anywhere-bloom.herokuapp.com/http://ec2-13-209-31-58.ap-northeast-2.compute.amazonaws.com/chatbot/",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ chat: messageText }),
    dataType: "json",
    success: function (data) {
      return sendMessage(data.reply, "left");
    },
    error: function (request, status, error) {
      console.log(error);
      return sendMessage("죄송합니다. 서버 연결에 실패했습니다.", "left");
    },
  });
}

function onSendButtonClicked() {
  let messageText = getMessageText();
  sendMessage(messageText, "right");

  if (messageText.includes("안녕")) {
    setTimeout(function () {
      return sendMessage(
        "안녕하세요. BLoom 서비스의 챗봇 블루밍이라고 합니다.",
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
