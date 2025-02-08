import React, { useState } from "react";
import "./App.css";
import { getToken, getModels, sendRequestToChat } from "./api/chat"; // Импортируем необходимые функции
import CustomButton from "@/components/ui/Button";

function App() {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [requestText, setRequestText] = useState<string>(""); // Добавляем состояние для текста запроса
  const [responseMessage, setResponseMessage] = useState<string>(""); // Состояние для хранения ответа от чата

  // Функция для получения токена
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

  // Функция для отправки запроса в чат
  const sendRequest = async () => {
    if (!token || !requestText) {
      console.log("Токен или текст запроса отсутствуют.");
      return;
    }

    setLoading(true);
    setError(false);
    try {
      const response = await sendRequestToChat(token, requestText); // Отправляем запрос с токеном и текстом
      setResponseMessage(response.choices[0]?.message.content); // Сохраняем ответ чата
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomButton onClick={fetchToken} disabled={loading} isLoading={loading} isError={error}>
        {loading ? "Загрузка..." : error ? "Произошла ошибка. Пробуй еще" : "Начни общение с чатиком..."}
      </CustomButton>
      <div>{token && `Ваш токен: ${token}`}</div> {/* Отображаем токен */}
      <CustomButton onClick={async () => await getModels(token)}>Получить модели</CustomButton>

      <div className="field">
        <label className="label">Наименование организации</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Наименование организации"
            value={requestText} // Привязываем состояние
            onChange={(e) => setRequestText(e.target.value)} // Обновляем состояние при изменении текста
          />
        </div>
      </div>

      <CustomButton onClick={sendRequest} disabled={loading || !token}>
        {loading ? "Отправка..." : "Отправить запрос"}
      </CustomButton>

      {responseMessage && (
        <div className="response">
          <h3>Ответ от чата:</h3>
          <p>{responseMessage}</p> {/* Отображаем ответ от чата */}
        </div>
      )}
    </>
  );
}

export default App;
