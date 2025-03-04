import { useState, useEffect } from "react";
import { sendRequestToChat } from "../api/chat";
import { useToken } from ".";
import { useLegendStore, useTargetStore } from "@/store";

interface ITargetAudienceGenerator {
  errorOccurred: boolean,
  generateAudienceGenerator: () => void;
}

const useTargetAudienceGenerator = (): ITargetAudienceGenerator => {
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

  const { setTarget } = useTargetStore();
  const { legend, setLegend } = useLegendStore();
  const { token } = useToken();

  const generatePromptAudienceGenerator = () => {
    let prompt =
      "Определить 3 наиболее перспективные целевые аудитории из указанных бизнес-проблем:";

    if (legend.upProblems || legend.customProblem) {
      prompt += ` ${legend.upProblems ? legend.upProblems : legend.customProblem}`;
    }

    if (legend.upGoals || legend.customUpGoal) {
      prompt += `, что приведет к одной конкретной цели рекламной кампании: ${legend.upGoals ? legend.upGoals : legend.customProblem}`;
    }

    if (legend.strSide) {
      prompt += `, учитывая сильные стороны: ${legend.strSide}`;
    }

    if (legend.fieldAgency || legend.customField) {
      prompt += `, Бизнес сфера: ${legend.fieldAgency ? legend.fieldAgency : legend.customField}`;
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
    const prompt = generatePromptAudienceGenerator();
    setTarget({isLoadingAudienceGenerator: true});
    setErrorOccurred(false);
    setTarget({ warningMessageTarget: "" });

    try {
      console.log(prompt);
      const response = await sendRequestToChat(token, prompt);
      const result = response.choices[0]?.message.content || "Ошибка получения данных.";
      setTarget({ targetAudienceGenerator: result });
      localStorage.setItem("targetAudienceResponse", result);
    } catch (error) {
      console.error(error);
      setErrorOccurred(true);
      setTarget({
        warningMessageTarget:
          "Обнаружен сбой. Запросите новый токен и нажмите на 'Сгенерировать ЦА'. Если не получилось, значит ведутся тех. работы. Попробуйте позже."
      });
    } finally {
      setTarget({isLoadingAudienceGenerator: false});
    }
  };

  useEffect(() => {
    const savedResponse = localStorage.getItem("targetAudienceResponse");
    if (savedResponse) {
      setTarget({ targetAudienceGenerator: savedResponse });
    }
  }, []);

  const generateAudienceGenerator = async () => {
    if (!legend.nameAgency || (!legend.fieldAgency && !legend.customField)) {
      setLegend({ warningMessageLegend: "Поле обязательно для заполнения" });
      return;
    }
    setTarget({targetResponse: ''})
    await handleApiRequest();
  };

  return {
    errorOccurred,
    generateAudienceGenerator
  };
};

export default useTargetAudienceGenerator;
