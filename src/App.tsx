import React, { useEffect, useState } from "react";
import "./App.css";
import { getToken, sendRequestToChat } from "./api/chat"; // Импортируем необходимые функции
import { Button, Loader, InputLabel, Dropdown } from "./components/ui/indext";

import { fieldOfActivity } from "./resources";

function App() {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [requestText, setRequestText] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string>("");

  const [isLoadingBtn, setIsLoadingButton] = useState<boolean>(false);

  const fetchToken = async () => {
    setLoading(true);
    setError(false);
    try {
      const responseToken = await getToken();
      setToken(responseToken.access_token);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  // Функция для отправки запроса в чат
  const sendRequest = async () => {
    if (!token || !requestText) {
      setWarningMessage("Обязятельно для заполнения");
      console.log("Токен или текст запроса отсутствуют.");
      return;
    }

    setWarningMessage("");

    setIsLoadingButton(true);
    setError(false);
    try {
      const response = await sendRequestToChat(token, requestText);
      setResponseMessage(response.choices[0]?.message.content);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <InputLabel
            labelDescription="Наименование организации"
            labelWarning={warningMessage}
            valueInput={requestText}
            setText={setRequestText}
          />
          <Dropdown list={fieldOfActivity} />

          <Button onClick={sendRequest} isLoading={isLoadingBtn} disabled={isLoadingBtn || !token}>
            {isLoadingBtn ? "Загрузка..." : error ? "Произошла ошибка. Пробуй еще" : "Сформировать что-то"}
          </Button>
          {responseMessage && (
            <div className="response">
              <h3>Ответ от чата:</h3>
              <p>{responseMessage}</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
