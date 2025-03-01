import React, { useState } from "react";
import { sendRequestToChat } from "../api/chat";
import { Button, Loader } from "./ui";
import { useToken } from "../hooks";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ILegendValues } from "@/hooks/useLegend";
interface ITargetAudienceGeneratorProps {
  warningMessage: string;
  setWarningMessage: (value: string) => void;
  legend: ILegendValues
}

const TargetAudienceGenerator: React.FC<ITargetAudienceGeneratorProps> = ({
  warningMessage,
  setWarningMessage,
  legend
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorOccurred, setErrorOccurred] = useState(false);

  const { token, fetchNewToken, loading } = useToken();
  const { nameAgency, fieldAgency, upGoals, upProblemSpisok, strSide } = legend

  const generatePrompt = () => {
    let prompt =
      "Определить 3 наиболее перспективные целевые аудитории из указанных бизнес-проблем:";

    if (upProblemSpisok) {
      prompt += ` ${upProblemSpisok}`;
    }

    if (upGoals) {
      prompt += `, что приведет к одной конкретной цели рекламной кампании: ${upGoals}`;
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
      console.log(prompt);
      const response = await sendRequestToChat(token, prompt);
      const result = response.choices[0]?.message.content || "Ошибка получения данных.";
      setResponseMessage(result);
      localStorage.setItem("legend", JSON.stringify(legend));
      localStorage.setItem("otvet_GA_hunt", result);
    } catch (error) {
      console.error(error);
      setErrorOccurred(true);
      setWarningMessage(
        "Обнаружен сбой. Запросите новый токен и нажмите на 'Сгенерировать ЦА'. Если не получилось, значит ведутся тех. работы. Попробуйте позже."
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className="block">
        <Button onClick={handleGenerate} disabled={isLoading} isLoading={isLoading}>
          Сгенерировать ЦА
        </Button>
      </div>

      {/* Отображаем ошибку только если она произошла */}
      {errorOccurred && (
        <div className="error-message">
          <p className="help is-danger">{warningMessage}</p>
          <Button onClick={fetchNewToken} isLoading={loading} disabled={loading}>
            Запросить новый токен
          </Button>
        </div>
      )}

      {/* Выводим результат, если он есть */}
      <>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          responseMessage && (
            <div className="box response">
              <h2 className="title is 2">Сгенерированные ЦА</h2>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{responseMessage}</ReactMarkdown>
            </div>
          )
        )}
      </>
    </div>
  );
};

export default TargetAudienceGenerator;
