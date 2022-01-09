import { Upload, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import "./Antdrag.scss";

export default function AntDrag({ fi, fileList, setFileList }) {
  const { Dragger } = Upload;

  const onChange = ({ fileList: newFileList }) => {
    newFileList.forEach((file) => {
      file.status = "done";
    });
    console.log("File list", fileList);
    console.log(newFileList);
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

  const props = {
    name: "file",
    showUploadList: false,
    multiple: true,
    fileList: fileList,
    quality: 1,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <div className="upload-container">
        <Dragger {...props} onChange={onChange}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading
            company data or other band files
          </p>
        </Dragger>
      </div>
      <Upload
        listType="picture"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        quality={1}
        multiple
      ></Upload>
    </div>
  );
}
