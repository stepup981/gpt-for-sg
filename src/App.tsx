import React, { useState, useEffect } from "react";
import "./App.css";
import {
  NameAgency,
  FieldAgency,
  WorkFormat,
  ProductField,
  PriceSegment,
  UpGoal,
  BusinessProblems,
  StrongSides,
  TargetAudienceGenerator,
  TargetAudienceSelector
} from "./components";
import { Loader } from "./components/ui";

import { useToken } from "./hooks";


function App() {

  const { loading } = useToken();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Поле для названия организации */}
          <NameAgency />

          {/* Поле для выбора сферы деятельности */}
          <FieldAgency />

          {/* Поле для форматов работы */}
          <WorkFormat />

          {/* Поле для выбора товара или услуги */}
          <ProductField />

          {/* Поле для выбора ценового сегмента */}
          <PriceSegment />

          {/* Поле для целей увеличения продаж */}
          <UpGoal />

          {/* Поле для проблем бизнеса */}
          <BusinessProblems />

          {/* Поле для сильных сторон */}
          <StrongSides />

          {/* Поле ответа ИИ */}
          <TargetAudienceGenerator />
          <TargetAudienceSelector/>
        </>
      )}
    </>
  );
}

export default App;
