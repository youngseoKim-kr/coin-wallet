import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function Login() {
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();
  const [isIdActive, setIsIdActive] = useState(false);
  const [isPwActive, setIsPwActive] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const inputUserId = e => {
    setUserId(e.target.value);
    setIsLogin(false);
  };
  const inputUserPw = e => {
    setUserPw(e.target.value);
    setIsLogin(false);
  };

  // 이메일 인증
  function checkEmail(str) {
    const reg_email =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (reg_email.test(str)) {
      return true;
    } else {
      return false;
    }
  }
  // 비밀번호 인증
  function checkPW(str) {
    const reg_pw =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$/;
    if (reg_pw.test(str) && !/(\w)\1\1/.test(str) && str.search(/\s/) === -1) {
      return true;
    } else {
      return false;
    }
  }
  //인증 승인 여부
  const isPassedLogin = () => {
    checkEmail(userId) ? setIsIdActive(true) : setIsIdActive(false);
    checkPW(userPw) ? setIsPwActive(true) : setIsPwActive(false);
  };

  useEffect(() => {
    isPassedLogin();
  }, [userId, userPw]);

  //로그인 버튼 클릭시 인증이 성공하면 fetch 아니면 오류 메시지
  const checkLogin = () => {
    isIdActive === true && isPwActive === true
      ? handleLogin()
      : setIsLogin(true);
  };

  const handleLogin = () => {
    fetch(``, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userId,
        password: userPw,
      }),
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        //통신오류
        if (result.message === 'INVALID_USER') {
          setIsLogin(true);
          clearInput();
        }
        // 성공시 url 이동
        else if (result.message === 'Sign in succesful') {
          alert('로그인 성공!');
          window.location.reload();
        }
      });
  };
  const idInputBox = useRef();
  const pwInputBox = useRef();

  const clearInput = () => {
    idInputBox.current.value = '';
    pwInputBox.current.value = '';
    idInputBox.current.focus();
  };

  return (
    <LoginSection>
      <LoginWrapper>
        <span className="mainTitle">개인 가상 자산 관리 툴</span>
        <LoginInfo>
          <span className="subTitle">로 그 인</span>
          <LoginId>
            <span className="idTitle">이메일</span>
            <input type="text" onChange={inputUserId} ref={idInputBox} />
            {userId === '' ? (
              <span
                className="
              explanation"
              >
                이메일을 입력해주세요
              </span>
            ) : (
              ''
            )}
          </LoginId>
          <LoginPassWord>
            <span className="pwTitle">비밀번호</span>
            <input type="password" onChange={inputUserPw} ref={pwInputBox} />
            {userPw === '' ? (
              <span
                className="
              explanation"
              >
                비밀번호를 입력해주세요
              </span>
            ) : (
              ''
            )}
            {isLogin === true ? (
              <span
                className="
              explanation"
              >
                이메일 혹은 비밀번호가 잘못되었습니다.
              </span>
            ) : (
              ''
            )}
          </LoginPassWord>
          <button type="submit" onClick={checkLogin}>
            로그인
          </button>
        </LoginInfo>
      </LoginWrapper>
    </LoginSection>
  );
}

const LoginSection = styled.section`
  width: 100%;
  height: 800px;
  margin-top: 50px;
`;

const LoginWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 150px;
  margin: auto;
  text-align: center;
  background-color: #f9f9f9;
  .mainTitle {
    font-size: 36px;
    font-weight: 600;
    color: #4e3ece;
    line-height: 150px;
  }
`;

const LoginInfo = styled.div`
  width: 360px;
  height: 500px;
  margin: auto;
  margin-top: 100px;
  .subTitle {
    font-size: 28px;
    font-weight: 500;
    color: #4e3ece;
  }
  button {
    margin-top: 50px;
    width: 100%;
    height: 45px;
    color: white;
    background-color: #4e3ece;
    border: none;
    font-size: 17px;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
  }
  button:hover {
    background-color: #4331c9;
  }
`;

const LoginId = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  .idTitle {
    font-size: 16px;
    text-align: left;
    padding: 10px;
    color: #a9a9a9;
  }
  input {
    height: 45px;
    padding-left: 10px;
    font-size: 18px;
    border: 1px solid #a9a9a9;
  }
  input:focus {
    outline: none;
    border: 1px solid #bfb9ed;
  }
  .explanation {
    font-size: 14px;
    text-align: left;
    padding-top: 10px;
    color: #ee6572;
  }
`;

const LoginPassWord = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  .pwTitle {
    font-size: 16px;
    text-align: left;
    padding: 10px;
    color: #a9a9a9;
  }
  input {
    height: 45px;
    padding-left: 10px;
    font-size: 18px;
    font-weight: 200;
    border: 1px solid #a9a9a9;
  }
  input:focus {
    outline: none;
    border: 1px solid #bfb9ed;
  }
  .explanation {
    font-size: 14px;
    text-align: left;
    padding-top: 10px;
    color: #ee6572;
  }
`;

export default Login;
