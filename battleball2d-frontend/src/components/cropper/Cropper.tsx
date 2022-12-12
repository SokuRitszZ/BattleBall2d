import React, {useEffect, useRef} from 'react';

import "cropperjs/dist/cropper.min.css";
import "cropperjs/dist/cropper.min";
import TCropper from "cropperjs";
import style from "./cropper.module.scss";
import api from "../../script/api/api";

type Props = {
  defaultSrc: string
  getData: (data: any) => void
}

function Cropper(props: Props) {
  const $img = useRef<HTMLImageElement>(null);
  const $input = useRef<HTMLInputElement>(null);

  let cropper: TCropper;

  useEffect(() => {
    setTimeout(() => {
      initCropper();
    });
  }, []);

  const initCropper = () => {
    const options: TCropper.Options = {
      aspectRatio: 1 / 1,
      modal: false,
      background: false,
      cropBoxResizable: true,
      crop(e) { }
    }
    if ($img.current) {
      cropper = new TCropper($img.current, options);
    }
  };

  const crop = () => {
    if (cropper) {
      cropper.getCroppedCanvas({
        width: 100,
        height: 100
      }).toBlob(props.getData);
    }
  };

  const handleChangeImg = () => {
    if (!$input.current) return ;
    const file = $input.current.files![0];
    if (!/image\/.*/.test(file.type)) return alert("文件必须是图片");
    const url = URL.createObjectURL(file);
    $img.current!.src = url;
    cropper.destroy();
    initCropper();
  }

  return (
    <div className={style.container}>
      <img className={style.img} width="100%" ref={$img} src={props.defaultSrc} alt=""/>
      <div>
        <input ref={$input} onChange={handleChangeImg} className="hidden" type="file" id="headicon-input"/>
        <div className="flex justify-around">
          <label className={style.button} htmlFor="headicon-input">选择图片</label>
          <label onClick={crop} className={style.button}>裁剪输出</label>
        </div>
      </div>
    </div>
  );
}

export default Cropper;