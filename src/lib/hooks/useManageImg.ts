const useManageImg = () => {
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

    const savePdf = async (name: string, pdf: any) => {
        const formData = new FormData();
        formData.append("file", pdf);
        formData.append("name", name.toLowerCase().replace(/\s/g, "-"));

        try {
            const response = await fetch("/api/upload-pdf", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
            } else {
                throw new Error("Upload failed.");
            }
        } catch (error) {}
    };

    const deletePdf = async (name: string) => {
        const formData = new FormData();
        formData.append("name", name.toLowerCase().replace(/\s/g, "-"));

        try {
            const response = await fetch("/api/delete-pdf", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
            } else {
                throw new Error("Delete failed.");
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

    const saveVideo = async (videoName: string, video: any) => {
        const formData = new FormData();
        formData.append("file", video);
        formData.append("name", videoName.toLowerCase().replace(/\s/g, "-"));

        try {
            const response = await fetch("/api/upload-video", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
            } else {
                throw new Error("Upload failed.");
            }
        } catch (error) {}
    };

    const deleteVideo = async (videoName: string) => {
        const formData = new FormData();
        formData.append("name", videoName.toLowerCase().replace(/\s/g, "-"));

        try {
            const response = await fetch("/api/delete-video", {
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

    return {
        saveVideo,
        deleteVideo,
        saveImg,
        savePdf,
        deleteImg,
        deletePdf,
        saveSvgIcon,
        deleteSvgIcon,
    };
};

export default useManageImg;
