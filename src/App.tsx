import React, { useEffect, useState } from "react";
import "./App.css";
import { getToken, sendRequestToChat } from "./api/chat";
import { Button, Loader, InputLabel, Dropdown, Switcher, CheckboxGroup } from "./components/ui";
import {
  fieldAgencyList,
  workFormatsList,
  productList,
  priceSegmentList,
  upGoalsList,
  businessProblemsList,
} from "./resources";
import { TOKEN_EXPIRATION_TIME } from "./constants";

import { useToken } from "./hooks";

function App() {
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const [responseMessage, setResponseMessage] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string>("");

  const [nameAgency, setNameAgency] = useState<string>("");
  const [fieldAgency, setFieldAgency] = useState<string>("");
  const [customField, setCustomField] = useState<string>("");
  const [isCustomField, setIsCustomField] = useState<boolean>(false);

  const [selectedWorkFormats, setSelectedWorkFormats] = useState<string[]>([]);
  const [isCustomWorkFormat, setIsCustomWorkFormat] = useState<boolean>(false);
  const [customWorkFormat, setCustomWorkFormat] = useState<string>("");
  const [productAd, setProductAd] = useState<string>("");
  const [productAdChoice, setProductAdChoice] = useState<string>("");

  const [priceSegment, setPriceSegment] = useState<string>("");
  const [strSide, setStrSide] = useState<string>("");

  const [selectedUpGoals, setSelectedUpGoals] = useState<string[]>([]);
  const [isCustomUpGoal, setIsCustomUpGoal] = useState<boolean>(false);
  const [customUpGoal, setCustomUpGoal] = useState<string>("");

  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [isCustomProblem, setIsCustomProblem] = useState<boolean>(false);
  const [customProblem, setCustomProblem] = useState<string>("");

  const finalFieldAgency = isCustomField ? customField : fieldAgency;
  const finalWorkFormats = isCustomWorkFormat ? [customWorkFormat] : selectedWorkFormats;
  const finalUpGoals = isCustomUpGoal ? customUpGoal : selectedUpGoals.join(", ");
  const upProblemSpisok = isCustomProblem ? customProblem : selectedProblems.join(", ");

  const { token, loading, error } = useToken();

  const legend = {
    nameAgency,
    fieldAgency: finalFieldAgency,
    workFormats: finalWorkFormats.join(", "),
    productAd,
    productAdChoice,
    priceSegment,
    upGoals: finalUpGoals,
    upProblemSpisok,
    strSide
  };

  const sendRequest = async () => {
    const warnings = [
      !nameAgency && "Введите название организации.",
      !finalFieldAgency && "Выберите или введите сферу деятельности.",
      !token && "Ошибка с токеном. Попробуйте обновить страницу."
    ].filter(Boolean).join("\n");
  
    if (warnings) {
      setWarningMessage(warnings);
      return;
    }
  
    setWarningMessage("");
    setLoadingButton(true);
  
    try {
      const response = await sendRequestToChat(token, nameAgency);
      setResponseMessage(response.choices[0]?.message.content);
      localStorage.setItem("legend", JSON.stringify(legend));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Поле для названия организации */}
          <div className="box name__agency">
            <InputLabel
              labelDescription="Наименование организации"
              labelWarning={warningMessage}
              valueInput={nameAgency}
              setText={setNameAgency}
            />
          </div>

          {/* Поле для выбора сферы деятельности */}
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
                zeroSelect="Выберите сферу..."
                list={fieldAgencyList}
                titleList="Сфера деятельности организации"
                warning={warningMessage}
              />
            )}
            <Switcher isChecked={isCustomField} onToggle={setIsCustomField} label="Свой вариант" />
          </div>

          {/* Поле для форматов работы */}
          <div className="box work__format">
            {isCustomWorkFormat ? (
              <InputLabel
                labelDescription="Введите свой формат работы"
                labelWarning={warningMessage}
                valueInput={customWorkFormat}
                setText={setCustomWorkFormat}
              />
            ) : (
              <CheckboxGroup
                selectedOptions={selectedWorkFormats}
                onOptionSelect={setSelectedWorkFormats}
                list={workFormatsList}
                titleList="Форматы работы"
              />
            )}
            <Switcher isChecked={isCustomWorkFormat} onToggle={setIsCustomWorkFormat} label="Свой вариант" />
          </div>

          {/* Поле для выбора товара или услуги */}
          <div className="box product">
            <Dropdown
              selectedOption={productAdChoice}
              onOptionSelect={setProductAdChoice}
              zeroSelect="Выберите товар или услуга"
              list={productList}
              titleList="Товар или услуга для продвижения"
            />
            <InputLabel valueInput={productAd} setText={setProductAd} />
          </div>

          {/* Поле для выбора ценового сегмента */}
          <div className="box price__segment">
            <Dropdown
              selectedOption={priceSegment}
              onOptionSelect={setPriceSegment}
              zeroSelect="Выберите ценовой сегмент"
              list={priceSegmentList}
              titleList="Ценовой сегмент"
            />
          </div>

          {/* Поле для целей увеличения продаж */}
          <div className="box up-goals">
            {!isCustomUpGoal && (
              <CheckboxGroup
                selectedOptions={selectedUpGoals}
                onOptionSelect={setSelectedUpGoals}
                list={upGoalsList}
                titleList="Цели для увеличения продаж"
              />
            )}

            {isCustomUpGoal && (
              <InputLabel
                labelDescription="Введите свои цели (через запятую)"
                labelWarning="* Цели должны быть указаны через запятую"
                valueInput={customUpGoal}
                setText={setCustomUpGoal}
              />
            )}

            <Switcher isChecked={isCustomUpGoal} onToggle={setIsCustomUpGoal} label="Свой вариант" />
          </div>

          {/* Поле для проблем бизнеса */}
          <div className="box business-problems">
            {!isCustomProblem && (
              <CheckboxGroup
                selectedOptions={selectedProblems}
                onOptionSelect={setSelectedProblems}
                list={businessProblemsList}
                titleList="Проблемы бизнеса"
              />
            )}

            {isCustomProblem && (
              <InputLabel
                labelDescription="Введите свои проблемы (через запятую)"
                labelWarning="* Проблемы должны быть указаны через запятую"
                valueInput={customProblem}
                setText={setCustomProblem}
              />
            )}

            <Switcher isChecked={isCustomProblem} onToggle={setIsCustomProblem} label="Свой вариант" />
          </div>

          {/* Поле для сильных сторон */}
          <div className="box strong-sides">
            <InputLabel labelDescription="Сильные стороны" valueInput={strSide} setText={setStrSide} />
          </div>

          {/* Кнопка отправки */}
          <Button onClick={sendRequest} disabled={loadingButton} isLoading={loadingButton}>
            {error ? "Произошла ошибка. Попробуйте еще раз." : "Сформировать рекламу"}
          </Button>

          {/* Ответ от сервера */}
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
