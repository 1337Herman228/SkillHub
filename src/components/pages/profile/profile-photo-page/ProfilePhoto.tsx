"use client";

import Spinner from "@/components/spinners/spinner/Spinner";
import "../../../forms/profile-forms/ProfileForms.scss";
import "./ProfilePhoto.scss";
import ImageUpload from "@/components/image-upload/ImageUpload";
import useFetch from "@/lib/hooks/useFetch";
import useManageImg from "@/lib/hooks/useManageImg";
import { useAppSelector } from "@/lib/redux/store/store";
import { useState } from "react";

const ProfilePhoto = () => {
    const { getAndDispatchUser, putAvatar, isLoading } = useFetch();

    const user = useAppSelector((state) => state.user.user);

    const { saveImg, deleteImg } = useManageImg();

    const [img, setImg] = useState(null);

    console.log("update");

    const formSubmit = async () => {
        try {
            if (user) {
                const imgName =
                    "avatar-" +
                    user?.userId +
                    "t=" +
                    new Date().getTime() +
                    ".png";

                //Изменяем (сохраняем) фото
                if (img) {
                    await saveImg(imgName, img);
                    if (user?.person?.avatarImg)
                        await deleteImg(user?.person?.avatarImg);
                    await putAvatar(imgName, user);
                }
                //Удаляем фото, если пользователь ничего не указал
                else {
                    if (user?.person?.avatarImg)
                        await deleteImg(user?.person?.avatarImg);
                    await putAvatar(null, user);
                }
                await getAndDispatchUser();
            }
        } catch {
            console.error("error");
        }
    };

    console.log(user?.person?.avatarImg);

    if (!user || isLoading) {
        return (
            <div
                style={{
                    display: "grid",
                    placeItems: "center",
                    width: "100%",
                    height: "700px",
                }}
            >
                <Spinner />
            </div>
        );
    }

    return (
        <div className="profile-photo-form form-container-profile">
            <div className="">
                <div className="profile-photo__label">Изображение:</div>

                {user?.person?.avatarImg ? (
                    <>
                        <ImageUpload
                            defaultImg={[
                                {
                                    uid: "avatar-" + user?.userId,
                                    name: "avatar-" + user?.userId + ".png",
                                    status: "done",
                                    url:
                                        "/upload-images/" +
                                        user?.person?.avatarImg,
                                },
                            ]}
                            img={img}
                            isFormSubmitted={false}
                            setImg={setImg}
                        />
                    </>
                ) : (
                    <>
                        <ImageUpload
                            img={img}
                            isFormSubmitted={false}
                            setImg={setImg}
                        />
                    </>
                )}

                <p className="error-message">
                    {false ? (img ? null : "Загрузите изображение") : null}
                </p>
            </div>

            <button
                onClick={() => formSubmit()}
                className="profile-photo-form__submit-btn black-submit-button"
                type="button"
            >
                Сохранить
            </button>
        </div>
    );
};

export default ProfilePhoto;
