import React, { useEffect, useState } from "react";
import "./App.css";
import { getToken, sendRequestToChat } from "./api/chat";
import { Button, Loader, InputLabel, Dropdown, Switcher } from "./components/ui";
import { fieldAgencyList } from "./resources";
import { TOKEN_EXPIRATION_TIME } from "./constants";

function App() {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string>("");

  const [nameAgency, setNameAgency] = useState<string>("");
  const [fieldAgency, setFieldAgency] = useState<string>("");
  const [customField, setCustomField] = useState<string>("");
  const [isCustomField, setIsCustomField] = useState<boolean>(false);

  // Получаем финальное значение
  const finalFieldAgency = isCustomField ? customField : fieldAgency;

  const legend = {
    nameAgency,
    fieldAgency: finalFieldAgency,
  };

  // Проверяем токен в localStorage
  const checkStoredToken = async () => {
    const storedToken = localStorage.getItem("token");
    const storedTime = localStorage.getItem("token_time");

    if (storedToken && storedTime) {
      const elapsedTime = Date.now() - Number(storedTime);
      if (elapsedTime < TOKEN_EXPIRATION_TIME) {
        setToken(storedToken);
        return;
      }
    }
    await fetchToken(); // Токен просрочен или отсутствует – запрашиваем новый
  };

  // Получение нового токена
  const fetchToken = async () => {
    setLoading(true);
    setError(false);
    try {
      const responseToken = await getToken();
      setToken(responseToken.access_token);

      localStorage.setItem("token", responseToken.access_token);
      localStorage.setItem("token_time", String(responseToken.expires_at));
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStoredToken();
  }, []);

  // Функция для отправки запроса в чат
  const sendRequest = async () => {
    if (!token || !nameAgency) {
      setWarningMessage("Обязательно для заполнения");
      console.log("Токен или текст запроса отсутствуют.");
      return;
    }

    if (!finalFieldAgency) {
      setWarningMessage('Обязательно для заполнения')
    }

    setWarningMessage("");
    setError(false);

    try {
      const response = await sendRequestToChat(token, nameAgency);
      setResponseMessage(response.choices[0]?.message.content);
      localStorage.setItem("legend", JSON.stringify(legend));
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Поле ввода НАЗВАНИЯ ОРГАНИЗАЦИИ */}
          <div className="box name__agency">
            <InputLabel
              labelDescription="Наименование организации"
              labelWarning={warningMessage}
              valueInput={nameAgency}
              setText={setNameAgency}
            />
          </div>

          {/* Поле ввода СФЕРЫ ОРГАНИЗАЦИИ */}
          <div className="box field__agency">
            {isCustomField ? (
              <InputLabel
                labelDescription="Введите свою сферу"
                labelWarning={warningMessage}
                valueInput={customField}
                setText={setCustomField}
              />
            ) : (
              <Dropdown
                selectedOption={fieldAgency}
                onOptionSelect={setFieldAgency}
                list={fieldAgencyList}
                titleList="Сфера деятельности организации"
                warning={warningMessage}
              />
            )}

            <Switcher isChecked={isCustomField} onToggle={setIsCustomField} label="Свой вариант" />
          </div>

          {/* Кнопка запроса */}
          <Button onClick={sendRequest} disabled={!token}>
            {error ? "Произошла ошибка. Пробуй еще" : "Сформировать рекламу или ч там...))))))"}
          </Button>

          {/* Вывод ответа */}
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
