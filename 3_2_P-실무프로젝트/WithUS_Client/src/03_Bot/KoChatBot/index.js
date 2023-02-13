function KoChatBot() {
  return (
    <div>
      <div className="chat_window">
        <div className="top_menu">
          <div className="buttons">
            <div className="button close_button"></div>
            <div className="button minimize"></div>
            <div className="button maximize"></div>
          </div>
          <div className="title">WithUS 위둥이</div>
        </div>
        <ul className="messages"></ul>
        <div className="bottom_wrapper clearfix">
          <div className="message_input_wrapper">
            <input
              className="message_input"
              onKeyUp={window.onClickAsEnter}
              placeholder="내용을 입력하세요."
            />
          </div>

          <div
            className="send_message"
            id="send_message"
            onClick={window.onSendButtonClicked}
          >
            <div className="icon"></div>
            <div className="text">보내기</div>
          </div>
        </div>
      </div>
      <div className="message_template">
        <li className="message">
          <div className="avatar"></div>
          <div className="text_wrapper">
            <div className="text"></div>
          </div>
        </li>
      </div>
    </div>
  );
}

export default KoChatBot;
