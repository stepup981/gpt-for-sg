import React, { useState, useEffect } from "react";
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
  StrongSides,
  TargetAudienceGenerator
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

  const { token, loading, errorToken } = useToken();
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


  useEffect(() => {
    return () => {
      console.log(legend)
    }
  }, [])

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

          {/* Поле ответа ИИ */}
          <TargetAudienceGenerator
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
            legend={legend}
          />
        </>
      )}
    </>
  );
}

export default App;
