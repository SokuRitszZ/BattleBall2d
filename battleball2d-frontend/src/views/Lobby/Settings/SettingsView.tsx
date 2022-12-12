import React, {useEffect, useRef, useState} from 'react';
import style from "./SettingsView.module.scss";
import UserStore, {UserInfo} from "../../../store/user";
import useAuth from "../../../useAuth";
import {useNavigate} from "react-router-dom";
import Cropper from "../../../components/cropper/Cropper";
import api from "../../../script/api/api";
import pubsub from "pubsub-js";
import {tagSetInfo} from "../LobbyView";

function SettingsView() {
  const info = useState<UserInfo>({
    headIcon: "", id: 0, username: ""
  });
  const navigate = useNavigate();
  const isCropping = useState(false);
  const cropImg = useState(info[0].headIcon);
  const $input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    useAuth(navigate)
      .then(() => {
        info[1](UserStore.info);
      });
  }, []);

  const handleChangeHeadicon = () => {
    isCropping[1](true);
  };

  const handleSetHeadicon = (data: any) => {
    uploadBlob(data);
  };

  const uploadBlob: BlobCallback = (blob: Blob | null) => {
    const formData = new FormData();
    formData.append('croppedImage', blob!/*, 'example.png' */);
    api.post("/user/headicon", formData).then((res: any) => {
      if (res.result === "ok") {
        UserStore.info.headIcon = res.headIcon;
        pubsub.publish(tagSetInfo, {
          headIcon: res.headIcon
        });
        info[1](pre => ({...pre, headIcon: res.headIcon + `?time=${Date.now()}`}))
        isCropping[1](false);
      } else {
      }
    });
  };


  return (
    <div className={style.frame}>
      <div className={style.headIcon}>
        <label htmlFor="headIcon">头像</label>
          {
            isCropping[0] ?
              <Cropper getData={handleSetHeadicon} defaultSrc={info[0].headIcon}/>:
              <div className={style.imgFrame}> <img src={info[0].headIcon} alt=""/> </div>
          }
        <button onClick={handleChangeHeadicon} className={style.button}>切换头像</button>
      </div>
      <label htmlFor="username">用户名</label>
      <input disabled value={info[0].username} id="username" type="text"/>
    </div>
  );
};

export default SettingsView;