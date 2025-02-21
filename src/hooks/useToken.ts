import { useState, useEffect } from "react";
import { getToken } from "../api/chat";
import { TOKEN_EXPIRATION_TIME } from "../constants";

const useToken = () => {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const checkStoredToken = async () => {
      const storedToken = localStorage.getItem("token");
      const storedTime = localStorage.getItem("token_time");

      if (storedToken && storedTime) {
        const elapsedTime = Date.now() - Number(storedTime);
        if (elapsedTime < TOKEN_EXPIRATION_TIME) {
          setToken(storedToken);
          setLoading(false);
          return;
        }
      }

      try {
        const responseToken = await getToken();
        setToken(responseToken.access_token);
        localStorage.setItem("token", responseToken.access_token);
        localStorage.setItem("token_time", String(responseToken.expires_at));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    checkStoredToken();
  }, []);

  return { token, loading, error };
};

export default useToken;
