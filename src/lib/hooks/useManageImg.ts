const useManageImg = () => {
    //imgName - название файла c расширением (.jpg,.png etc.)

    const saveImg = async (imgName: string, img: any) => {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("name", imgName.toLowerCase().replace(/\s/g, "-"));

        try {
            const response = await fetch("/api/upload-img", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
            } else {
                throw new Error("Upload failed.");
            }
        } catch (error) {}
    };

    const deleteImg = async (imgName: string) => {
        const formData = new FormData();
        formData.append("name", imgName.toLowerCase().replace(/\s/g, "-"));

        try {
            const response = await fetch("/api/delete-img", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
            } else {
                throw new Error("Delete failed.");
            }
        } catch (error) {}
    };

    const saveSvgIcon = async (imgName: string, img: any) => {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("name", imgName.toLowerCase().replace(/\s/g, "-"));

        try {
            const response = await fetch("/api/save-svg-icon", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
            } else {
                throw new Error("Upload failed.");
            }
        } catch (error) {}
    };

    const deleteSvgIcon = async (imgName: string) => {
        const formData = new FormData();
        formData.append("name", imgName.toLowerCase().replace(/\s/g, "-"));

        try {
            const response = await fetch("/api/delete-svg-icon", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
            } else {
                throw new Error("Delete failed.");
            }
        } catch (error) {}
    };

    return { saveImg, deleteImg, saveSvgIcon, deleteSvgIcon };
};

export default useManageImg;
