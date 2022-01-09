import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "./Dnd.css";

function Dnd({ fi }) {
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    newFileList.forEach((file) => {
      file.status = "done";
    });
    console.log("fileList: ", fileList);
    console.log("newFileList: ", newFileList);
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      onPreview={onPreview}
      multiple
    >
      {fileList.length < 5 && "+ Upload"}
    </Upload>
  );
}

export default Dnd;
