import { useState, useEffect } from "react";
import { sendRequestToChat } from "../api/chat";
import { useToken } from "../hooks";
import { useLegendStore } from "@/store";
import { ILegendValues } from "@/hooks/useLegend";

interface IUseTargetAudienceGeneratorResult {
  targetAudienceResponse: string;
  errorOccurred: boolean;
  isLoading: boolean;
  generateTargetAudience: () => Promise<void>;
}

const useTargetAudienceGenerator = (): IUseTargetAudienceGeneratorResult => {
  const { legend, setLegend } = useLegendStore();
  const [targetAudienceResponse, setTargetAudienceResponse] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const { token } = useToken();

  const generatePrompt = () => {
    let prompt =
      "Определить 3 наиболее перспективные целевые аудитории из указанных бизнес-проблем:";

    if (legend.upProblems) {
      prompt += ` ${legend.upProblems}`;
    }

    if (legend.upGoals) {
      prompt += `, что приведет к одной конкретной цели рекламной кампании: ${legend.upGoals}`;
    }

    if (legend.strSide) {
      prompt += `, учитывая сильные стороны: ${legend.strSide}`;
    }

    if (legend.fieldAgency) {
      prompt += `, Бизнес сфера: ${legend.fieldAgency}`;
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

  const handleApiRequest = async () => {
    const prompt = generatePrompt();
    setLoading(true);
    setErrorOccurred(false);
    setLegend({ warningMessage: "" }); // очищаем предыдущее сообщение

    try {
      const response = await sendRequestToChat(token, prompt);
      const result = response.choices[0]?.message.content || "Ошибка получения данных.";
      setTargetAudienceResponse(result);
      localStorage.setItem("targetAudienceResponse", result);
    } catch (error) {
      console.error(error);
      setErrorOccurred(true);
      setLegend({
        warningMessage:
          "Обнаружен сбой. Запросите новый токен и нажмите на 'Сгенерировать ЦА'. Если не получилось, значит ведутся тех. работы. Попробуйте позже."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedResponse = localStorage.getItem("targetAudienceResponse");
    if (savedResponse) {
      setTargetAudienceResponse(savedResponse);
    }
  }, []);

  const generateTargetAudience = async () => {
    if (!legend.nameAgency || !legend.fieldAgency) {
      setLegend({ warningMessage: "Поле обязательно для заполнения" });
      return;
    }
    await handleApiRequest();
  };

  return {
    targetAudienceResponse,
    errorOccurred,
    isLoading,
    generateTargetAudience
  };
};

export default useTargetAudienceGenerator;
