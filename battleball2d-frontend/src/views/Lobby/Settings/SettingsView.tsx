import React, {useEffect, useRef, useState} from 'react';
import style from "./SettingsView.module.scss";
import UserStore, {UserInfo} from "../../../store/user";
import useAuth from "../../../useAuth";
import {useNavigate} from "react-router-dom";

function SettingsView() {
  const info = useState<UserInfo>({
    headIcon: "", id: 0, username: ""
  });
  const navigate = useNavigate();
  useEffect(() => {
    useAuth(navigate)
      .then(() => {
        info[1](UserStore.info);
      });
  }, [])
  // const $username = useRef<HTMLInputElement>(null);
  return (
    <div className={style.frame}>
      <label htmlFor="headIcon">头像</label>
      <div className={style.imgFrame}>
        <img src={info[0].headIcon} alt=""/>
      </div>
      <label htmlFor="uesrname">用户名</label>
      <input disabled value={info[0].username} onChange={() => {}} name="username" type="text"/>
    </div>
  );
};

export default SettingsView;