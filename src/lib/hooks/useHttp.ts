import { useCallback, useState } from "react";

interface error {
    status: number;
    message: string;
}

const useHttp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<error | null>(null);

    const authRequest = useCallback(
        async (url: string, method = "GET", body: any = null) => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(url, { method, body });
                if (!response.ok) {
                    setError({
                        status: response.status,
                        message: response.statusText,
                    });
                    throw new Error(
                        "Could not fetch " + url + "status " + response.status
                    );
                }
                const data = await response.json();
                setIsLoading(false);
                return data;
            } catch (e) {
                setError({ status: 500, message: "Что-то пошло не так" });
                throw e;
            }
        },
        []
    );

    const requestJson = useCallback(
        async (
            token: string,
            url: string,
            method = "GET",
            body = null,
            headers = {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        ) => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(url, { method, body, headers });
                if (!response.ok) {
                    setError({
                        status: response.status,
                        message: response.statusText,
                    });
                    throw new Error(
                        "Could not fetch " + url + "status " + response.status
                    );
                }
                const data = await response.json();
                setIsLoading(false);
                return data;
            } catch (e) {
                setError({ status: 500, message: "Что-то пошло не так" });
                throw e;
            }
        },
        []
    );

    return {
        isLoading,
        error,
        requestJson,
        authRequest,
    };
};

export default useHttp;
