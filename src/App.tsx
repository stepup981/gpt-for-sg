import React, { useState } from "react";
import "./App.css";
import { sendRequestToChat } from "./api/chat";
import {
  NameAgency,
  FieldAgency,
  WorkFormat,
  ProductField,
  PriceSegment,
  UpGoal,
  BusinessProblems,
  StrongSides
} from "./components";
import { Button, Loader, InputLabel, Dropdown, CheckboxGroup } from "./components/ui";
import {
  fieldAgencyList,
  workFormatsList,
  productList,
  priceSegmentList,
  upGoalsList,
  businessProblemsList
} from "./resources";

import { useToken, useLegend } from "./hooks";

function App() {
  const [loadingButton, setLoadingButton] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const { token, loading, error } = useToken();
  const {
    nameAgency,
    setNameAgency,
    fieldAgency,
    setFieldAgency,
    customField,
    setCustomField,
    isCustomField,
    setIsCustomField,
    selectedWorkFormats,
    setSelectedWorkFormats,
    isCustomWorkFormat,
    setIsCustomWorkFormat,
    customWorkFormat,
    setCustomWorkFormat,
    productAd,
    setProductAd,
    productAdChoice,
    setProductAdChoice,
    priceSegment,
    setPriceSegment,
    selectedUpGoals,
    setSelectedUpGoals,
    isCustomUpGoal,
    setIsCustomUpGoal,
    customUpGoal,
    setCustomUpGoal,
    selectedProblems,
    setSelectedProblems,
    isCustomProblem,
    setIsCustomProblem,
    customProblem,
    setCustomProblem,
    strSide,
    setStrSide,
    legend
  } = useLegend();

  const sendRequest = async () => {
    const warnings = [
      !nameAgency && "Введите название организации.",
      !fieldAgency && "Выберите или введите сферу деятельности.",
      !token && "Ошибка с токеном. Попробуйте обновить страницу."
    ]
      .filter(Boolean)
      .join("\n");

    if (warnings) {
      setWarningMessage(warnings);
      return;
    }

    setWarningMessage("");
    setLoadingButton(true);

    try {
      const valueLegend = Object.values(legend);
      const legendToString =
        "Сформируй мне рекламную компанию по следующим пунктам и параметрам" +
        valueLegend.filter((field) => field != "").join(",");
      const response = await sendRequestToChat(token, legendToString);
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
          <NameAgency
            nameAgency={nameAgency}
            setNameAgency={setNameAgency}
            warningMessage={warningMessage}
          />

          {/* Поле для выбора сферы деятельности */}
          <FieldAgency
            fieldAgency={fieldAgency}
            setFieldAgency={setFieldAgency}
            customField={customField}
            setCustomField={setCustomField}
            isCustomField={isCustomField}
            setIsCustomField={setIsCustomField}
            warningMessage={warningMessage}
            fieldAgencyList={fieldAgencyList}
          />

          {/* Поле для форматов работы */}
          <WorkFormat
            selectedWorkFormats={selectedWorkFormats}
            setSelectedWorkFormats={setSelectedWorkFormats}
            customWorkFormat={customWorkFormat}
            setCustomWorkFormat={setCustomWorkFormat}
            isCustomWorkFormat={isCustomWorkFormat}
            setIsCustomWorkFormat={setIsCustomWorkFormat}
            warningMessage={warningMessage}
            workFormatsList={workFormatsList}
          />

          {/* Поле для выбора товара или услуги */}
          <ProductField
            productAd={productAd}
            setProductAd={setProductAd}
            productAdChoice={productAdChoice}
            setProductAdChoice={setProductAdChoice}
            productList={productList}
          />

          {/* Поле для выбора ценового сегмента */}
          <PriceSegment
            priceSegment={priceSegment}
            setPriceSegment={setPriceSegment}
            priceSegmentList={priceSegmentList}
          />

          {/* Поле для целей увеличения продаж */}
          <UpGoal
            selectedUpGoals={selectedUpGoals}
            setSelectedUpGoals={setSelectedUpGoals}
            customUpGoal={customUpGoal}
            setCustomUpGoal={setCustomUpGoal}
            isCustomUpGoal={isCustomUpGoal}
            setIsCustomUpGoal={setIsCustomUpGoal}
            upGoalsList={upGoalsList}
          />

          {/* Поле для проблем бизнеса */}
          <BusinessProblems
            selectedProblems={selectedProblems}
            setSelectedProblems={setSelectedProblems}
            customProblem={customProblem}
            setCustomProblem={setCustomProblem}
            isCustomProblem={isCustomProblem}
            setIsCustomProblem={setIsCustomProblem}
            businessProblemsList={businessProblemsList}
          />

          {/* Поле для сильных сторон */}
          <StrongSides strSide={strSide} setStrSide={setStrSide} />

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
