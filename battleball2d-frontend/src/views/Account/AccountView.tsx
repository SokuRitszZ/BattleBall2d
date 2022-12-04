import React, {useEffect, useRef, useState} from 'react';

import style from "./AccountView.module.scss";
import {useNavigate} from "react-router-dom";
import {getInfoApi, loginApi, registerApi} from "../../script/api/user";
import User, {setToken, setInfo, UserInfo} from "../../store/user";
import UserStore from "../../store/user";

type PropType = {

};

async function register(
  username: string,
  password: string,
  confirmPassowrd: string
): Promise<void> {
  console.log(username, password, confirmPassowrd);
}

function AccountView(props: PropType) {
  const isHandling = useState<Boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token") as string);
    isHandling[1](true);
    getInfoApi()
      .then((info: any) => {
        setInfo(info);
        isHandling[1](false);
        navigate("/game");
      })
      .catch((error) => {
        console.log("获取信息失败：token可能无效");
        isHandling[1](false);
      });
  }, []);

  const $inputUsername = useRef<HTMLInputElement>(null);
  const $inputPassword = useRef<HTMLInputElement>(null);
  const $inputConfirmedPassword = useRef<HTMLInputElement>(null);

  const handleRegister = async () => {
    registerApi(
      $inputUsername.current!.value,
      $inputPassword.current!.value,
      $inputConfirmedPassword.current!.value
    ).then((data: any) => {
      if (data.result === "ok") {
        handleLogin();
      } else {
        console.log(`注册失败：${data.reason}`);
      }
    });
  };

  const handleLogin = async () => {
    loginApi(
      $inputUsername.current!.value,
      $inputPassword.current!.value
    )
      .then((data: any) => {
        if (data.result === "ok") {
          setToken(data.token);
          return Promise.resolve();
        } else {
          console.log(`登陆失败：${data.reason}`);
          return Promise.reject(data.reason);
        }
      })
      .then(() => {
        return getInfoApi()
      })
      .then((info: any) => {
        setInfo(info);
        isHandling[1](false);
        navigate("/game");
      })
      .catch(reason => {
        console.log(`登陆失败：${reason}`);
        isHandling[1](false);
      });
  };

  let inner;

  if (!isHandling[0]) {
    inner = (
      <React.Fragment>
        <label htmlFor="username" className="pl-1 text-gray-500">USERNAME</label>
        <input ref={$inputUsername} name="username" className="" type="text"/>
        <label htmlFor="password">PASSWORD</label>
        <input ref={$inputPassword} name="password" type="password"/>
        <label htmlFor="confirmed-password">CONFIRMED PASSWORD(IF REGISTER)</label>
        <input ref={$inputConfirmedPassword} name="confirmed-password" type="password"/>
        <div className="mt-8 grid grid-cols-2 pl-2 gap-4">
          <button onClick={handleRegister}> REGISTER </button>
          <button onClick={handleLogin}> LOGIN </button>
        </div>
      </React.Fragment>
    );
  } else {
    inner = (
      <React.Fragment>
        <h1 className="text-4xl text-center">Loading...</h1>
      </React.Fragment>
    );
  }

  return (
    <div className={style.AccountView}>
      <div className={style.frame}>
        {inner}
      </div>
    </div>
  );
}

export default AccountView;