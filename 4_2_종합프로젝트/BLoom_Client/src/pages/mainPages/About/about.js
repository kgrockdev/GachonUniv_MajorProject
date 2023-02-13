import "./about.scss";
import {MenuItem, Select, Button} from "@mui/material";
import React, { useRef } from "react";
import emailjs from 'emailjs-com';

const AboutPage = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_9p6lspw',
        'template_qt4hvsf',
        form.current,
        'yIjAnYncSw_3urEA0'
      )
      .then(
        (result) => {
          alert("전송되었습니다.");
        },
        (error) => {
          alert("전송을 실패했습니다.");
        }
      );
  };

return(
    <div class="container">
        <div class="content-section-heading">
          
          <h1 class="mb-5">About Developers</h1>
          <br/><br/>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <img class="profileshot" src="icon.png" width="100" height="100"/>
            <h4>
              <strong>김경록</strong>
            </h4>
            <hr/>
            <p>컴퓨터공학과</p>
            <p>linsyay@gmail.com</p>
            <p>프로젝트 매니저</p>   
          </div>
          <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <img class="profileshot" src="icon.png" width="100" height="100"/>
            <h4>
              <strong>서강덕</strong>
            </h4>
            <hr/>
            <p>컴퓨터공학과</p>
            <p>rkdejr2321@naver.com</p>
            <p>백엔드</p>
          </div>
          <div class="col-lg-3 col-md-6 mb-5 mb-md-0">
            <img class="profileshot" src="icon.png" width="100" height="100"/>
            <h4>
              <strong>박영호</strong>
            </h4>
            <hr/>
            <p>컴퓨터공학과</p>
            <p>bluesoul9696@gmail.com</p>
            <p>프론트엔드</p>
          </div>
          <div class="col-lg-3 col-md-6 mb-5 mb-md-0">
            <img class="profileshot" src="icon.png" width="100" height="100"/>
            <h4>
              <strong>장  혁</strong>
            </h4>
            <hr/>
            <p>컴퓨터공학과</p>
            <p>wath1457@gmail.com</p>
            <p>AI</p>
          </div>
        </div>
        <h1 class="mb-5">Contact Us</h1>
    
    <div class="container">
    <form className="form" ref={form} onSubmit={sendEmail}>

    <label>이름</label>
    <input type="text" name="from_name" placeholder="이름"/>

    <label>이메일</label>
    <input type="email" name="email" placeholder="이메일"/>
    <label>카테고리</label>
    <select name="category">
      <option value="버그 제보">버그 제보</option>
      <option value="기능 문의">기능 문의</option>
    </select>

    <label for="subject">Subject</label>
    <textarea name="content" placeholder="내용" rows="10"></textarea>

    <input type="submit" value="Send"/>

  </form>
</div>

    </div>
    );
};
export default AboutPage;
