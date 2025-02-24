import React, { useState } from "react";
import { sendRequestToChat } from "../api/chat";
import { Button, Loader } from "./ui";
import { useLegend, useToken } from "../hooks";

interface ITargetAudienceGeneratorProps {
  warningMessage: string;
  fieldAgency: string
  nameAgency: string
  setWarningMessage: (value: string) => void;
}

const TargetAudienceGenerator: React.FC<ITargetAudienceGeneratorProps> = ({
  warningMessage,
  setWarningMessage,
  fieldAgency,
  nameAgency
}) => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorOccurred, setErrorOccurred] = useState(false); 

  const { token, fetchNewToken } = useToken();
  const {  selectedUpGoals, selectedProblems, strSide, legend } =
    useLegend();

  const generatePrompt = () => {
    let prompt =
      "Определить 3 наиболее перспективные целевые аудитории из указанных бизнес-проблем:";

    if (selectedProblems.length) {
      prompt += ` ${selectedProblems.join(", ")}`;
    }

    if (selectedUpGoals.length) {
      prompt += `, что приведет к одной конкретной цели рекламной кампании: ${selectedUpGoals.join(", ")}`;
    }

    if (strSide) {
      prompt += `, учитывая сильные стороны: ${strSide}`;
    }

    if (fieldAgency) {
      prompt += `, Бизнес сфера: ${fieldAgency}`;
    }

    prompt += `\n\nРанжировать целевые аудитории по степени их перспективности, основываясь на следующих критериях:`;
    prompt += `\n1. Потенциальный отклик`;
    prompt += `\n2. Уровень конкурентности`;
    prompt += `\n3. Соответствие заданной цели`;
    prompt += `\n4. Стоимость привлечения`;
    prompt += `\n5. Положение по лестнице Ханта`;
    prompt += `\n\nПроанализировать все проблемы бизнеса и определить, какие группы наиболее перспективны для достижения целей. Написать для каждой группы боли, ожидания и JTBD.`;

    return prompt;
  };

  const handleGenerate = async () => {
    if (!nameAgency || !fieldAgency) {
      setWarningMessage("Обязательно для заполнения.");
      return;
    }

    setWarningMessage("");
    setErrorOccurred(false); 
    setLoading(true);

    try {
      const prompt = generatePrompt();
      console.log(prompt)
      const response = await sendRequestToChat(token, prompt);
      const result = response.choices[0]?.message.content || "Ошибка получения данных.";
      setResponseMessage(result);
      localStorage.setItem("legend", JSON.stringify(legend));
      localStorage.setItem("otvet_GA_hunt", result);
    } catch (error) {
      console.error(error);
      setErrorOccurred(true); 
      setWarningMessage(
        "Обнаружен сбой. Запросите новый токен. Если не получилось, значит ведутся тех. работы. Попробуйте позже."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleGenerate} disabled={loading} isLoading={loading}>
        Сгенерировать ЦА
      </Button>

      {/* Отображаем ошибку только если она произошла */}
      {errorOccurred && (
        <div className="error-message">
          <p className="help is-danger">{warningMessage}</p>
          <Button onClick={fetchNewToken}>Запросить новый токен</Button>
        </div>
      )}

      {/* Выводим результат, если он есть */}
      {responseMessage && (
        <div className="response">
          <h3>Сгенерированные ЦА</h3>
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TargetAudienceGenerator;
