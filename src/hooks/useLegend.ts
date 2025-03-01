import { useState, useMemo } from "react";

export interface ILegendValues {
  nameAgency: string;
  fieldAgency: string;
  workFormats: string;
  productAd: string;
  productAdChoice: string;
  priceSegment: string;
  upGoals: string;
  upProblemSpisok: string;
  strSide: string;
}

const useLegend = () => {
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

  const [selectedUpGoals, setSelectedUpGoals] = useState<string[]>([]);
  const [isCustomUpGoal, setIsCustomUpGoal] = useState<boolean>(false);
  const [customUpGoal, setCustomUpGoal] = useState<string>("");

  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [isCustomProblem, setIsCustomProblem] = useState<boolean>(false);
  const [customProblem, setCustomProblem] = useState<string>("");

  const [strSide, setStrSide] = useState<string>("");

  const finalFieldAgency = useMemo(
    () => (isCustomField ? customField : fieldAgency),
    [isCustomField, customField, fieldAgency]
  );
  const finalWorkFormats = useMemo(
    () => (isCustomWorkFormat ? [customWorkFormat] : selectedWorkFormats),
    [isCustomWorkFormat, customWorkFormat, selectedWorkFormats]
  );
  const finalUpGoals = useMemo(
    () => (isCustomUpGoal ? customUpGoal : selectedUpGoals.join(", ")),
    [isCustomUpGoal, customUpGoal, selectedUpGoals]
  );
  const upProblemSpisok = useMemo(
    () => (isCustomProblem ? customProblem : selectedProblems.join(", ")),
    [isCustomProblem, customProblem, selectedProblems]
  );

  const legend: ILegendValues = useMemo(
    () => ({
      nameAgency,
      fieldAgency: finalFieldAgency,
      workFormats: finalWorkFormats.join(", "),
      productAd,
      productAdChoice,
      priceSegment,
      upGoals: finalUpGoals,
      upProblemSpisok,
      strSide
    }),
    [
      nameAgency,
      finalFieldAgency,
      finalWorkFormats,
      productAd,
      productAdChoice,
      priceSegment,
      finalUpGoals,
      upProblemSpisok,
      strSide
    ]
  );

  return {
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
  };
};

export default useLegend;
