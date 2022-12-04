import React, {createRef, useRef, useState} from 'react';

import style from "./AccountView.module.scss";
import {useNavigate} from "react-router-dom";
import {loginApi, registerApi} from "../../script/api/user";
import {unmountComponentAtNode} from "react-dom";

type PropType = {

};

async function login(
  username: string,
  password: string
): Promise<void> {
  console.log(username, password);
};

async function register(
  username: string,
  password: string,
  confirmPassowrd: string
): Promise<void> {
  console.log(username, password, confirmPassowrd);
}

function show(dom: any) {
  console.log(dom);
}

function AccountView(props: PropType) {
  const $inputUsername = useRef<HTMLInputElement>(null);
  const $inputPassword = useRef<HTMLInputElement>(null);
  const $inputConfirmedPassword = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const isHandling = useState<Boolean>(false);

  const handleRegister = async () => {
    registerApi(
      $inputUsername.current!.value,
      $inputPassword.current!.value,
      $inputConfirmedPassword.current!.value
    ).then((data: any) => {
      if (data.result === "ok") {
        console.log("注册成功！");
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
          console.log("登陆成功！");
          navigate("/game")
        } else {
          console.log(`登陆失败：${data.reason}`);
        }
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