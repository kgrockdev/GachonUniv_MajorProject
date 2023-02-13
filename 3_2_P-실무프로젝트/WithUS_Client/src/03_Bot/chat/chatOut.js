import "./chat.css";
import { useEffect } from "react";
import { Button } from "antd";

function ChatOut(props) {
  useEffect(function () {
    window.chat_Out(props.bId);
  }, []);

  return (
    <div>
      <div className="row">
        <Button type="primary" id="chatOutConnectBtn">
          연결
        </Button>
        <div>
          <div className="card">
            <div className="card-header">Chat</div>
            <div className="card-body height3">
              <ul className="chat-list" id="chat_box_Out"></ul>
            </div>
            <div id="inputOut">
              <input
                type="text"
                id="sendMessageBoxOut"
                className="form-control"
                placeholder="Type your message"
              />
            </div>
            <div className="row status" id="statusOut"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatOut;
