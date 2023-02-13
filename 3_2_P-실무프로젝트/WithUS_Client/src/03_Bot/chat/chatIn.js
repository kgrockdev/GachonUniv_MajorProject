import "./chat.css";
import { useEffect } from "react";

function ChatIn(props) {
  useEffect(function () {
    window.chat_In(props.bId);
  }, []);

  return (
    <div>
      <div className="row">
        <div>
          <div className="card">
            <div className="card-header">Chat</div>
            <div className="card-body height3">
              <ul className="chat-list" id="chat_box"></ul>
            </div>
            <div id="input">
              <input
                type="text"
                id="sendMessageBox"
                className="form-control"
                placeholder="Type your message"
              />
            </div>
            <div className="row status" id="status"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatIn;
