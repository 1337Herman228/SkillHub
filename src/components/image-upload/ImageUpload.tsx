"use client";

import "./ImageUpload.scss";
import { PlusOutlined } from "@ant-design/icons";
import {
    ConfigProvider,
    GetProp,
    Image,
    Upload,
    UploadFile,
    UploadProps,
} from "antd";
import { UploadListType } from "antd/es/upload/interface";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

interface ImageUploadProps {
    defaultImg?: any;
    isFormSubmitted: boolean;
    img: any;
    accept?: string; //'image/*
    listType?: UploadListType | undefined; //"picture-card"
    setImg: any;
}

const ImageUpload = ({
    defaultImg = null,
    isFormSubmitted,
    img,
    accept = "image/*",
    listType = "picture-card",
    setImg,
}: ImageUploadProps) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState(defaultImg ? defaultImg : []);

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        setFileList(newFileList);
        if (newFileList.length == 0) setImg(null);
    };

    const uploadButton = (
        <button
            style={{
                color: "var(--text-color-grey)",
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 4,
                }}
            >
                Загрузить
            </div>
        </button>
    );

    const customRequest: any = async ({
        file,
        onSuccess,
        onError,
    }: {
        file: any;
        onSuccess: any;
        onError: any;
    }) => {
        try {
            setImg(file);
            onSuccess();
        } catch {
            onError();
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Upload: {
                        colorBorder: `${
                            !img && isFormSubmitted
                                ? "var(--red)"
                                : "var(--light-black)"
                        }`,
                        colorPrimary: "var(--dark-purple)", //цвет рамки при наведении
                    },
                },
            }}
        >
            <Upload
                accept={accept}
                customRequest={customRequest}
                listType={listType}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                            !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
        </ConfigProvider>
    );
};

export default ImageUpload;
