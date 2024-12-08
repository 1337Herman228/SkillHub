"use client";

import ImageUpload from "@/components/image-upload/ImageUpload";
import useFetch from "@/lib/hooks/useFetch";
import useManageImg from "@/lib/hooks/useManageImg";
import { useAppSelector } from "@/lib/redux/store/store";
import { useState } from "react";
import "./TeacherCertificate.scss";
import Spinner from "@/components/spinners/spinner/Spinner";

const TeacherCertificate = () => {
    const course = useAppSelector((state) => state.course.course);

    const {
        getAndDispatchCourse,
        deleteCourseCertificate,
        changeCourseCertificate,
    } = useFetch();

    const { savePdf, deletePdf } = useManageImg();

    const [pdf, setPdf] = useState(null);

    const formSubmit = async () => {
        try {
            if (course) {
                const certificateName =
                    "certificate-" +
                    course?.courseName.toLowerCase().replace(/\s/g, "-") +
                    "t=" +
                    new Date().getTime() +
                    ".pdf";

                //Изменяем (сохраняем)
                if (pdf) {
                    await savePdf(certificateName, pdf);
                    if (course?.certificate)
                        await deletePdf(course?.certificate);
                    await changeCourseCertificate(
                        course?.courseId,
                        certificateName
                    );
                }
                // Удаляем, если пользователь ничего не указал
                else {
                    if (course?.certificate)
                        await deletePdf(course?.certificate);
                    await changeCourseCertificate(
                        course?.courseId,
                        certificateName
                    );
                    await deleteCourseCertificate(course?.courseId);
                }
                await getAndDispatchCourse(course?.courseId ?? 0);
            }
        } catch {
            console.error("error");
        }
    };

    if (!course)
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

    return (
        <div className="container certificate-container">
            <div className="">
                <div className="">
                    <div className="certificate-title">Сертификат:</div>

                    {course?.certificate ? (
                        <>
                            <ImageUpload
                                accept="application/pdf"
                                defaultImg={[
                                    {
                                        uid: "certificate-" + course?.courseId,
                                        name:
                                            "certificate-" +
                                            course?.courseName
                                                .toLowerCase()
                                                .replace(/\s/g, "-") +
                                            "t=" +
                                            new Date().getTime() +
                                            ".pdf",
                                        status: "done",
                                        url:
                                            "/upload-certificates/" +
                                            course?.certificate,
                                    },
                                ]}
                                img={pdf}
                                isFormSubmitted={false}
                                setImg={setPdf}
                            />
                        </>
                    ) : (
                        <>
                            <ImageUpload
                                accept="application/pdf"
                                img={pdf}
                                isFormSubmitted={false}
                                setImg={setPdf}
                            />
                        </>
                    )}

                    <p className="error-message">
                        {false ? (pdf ? null : "Загрузите cертификат") : null}
                    </p>
                </div>

                <button
                    onClick={() => formSubmit()}
                    className="certificate-submit-btn black-submit-button"
                    type="button"
                >
                    Сохранить
                </button>
            </div>

            {course?.certificate && (
                <iframe
                    className="certificate-iframe"
                    src={"/upload-certificates/" + course?.certificate}
                    width="100%"
                    height="600px"
                ></iframe>
            )}
        </div>
    );
};

export default TeacherCertificate;
