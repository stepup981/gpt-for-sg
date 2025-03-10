import { sendRequestToChat } from "@/api/chat";
import { useTargetStore, useLegendStore } from "@/store";
import { useToken } from "@/hooks";

export interface IUseTargetAudienceSelectorResult {
  generateAudienceSelector: () => void;
  targetOptions: string[];
}

const useTargetAudienceSelector = (): IUseTargetAudienceSelectorResult => {
 
  const { token } = useToken();

  const { target, setTarget } = useTargetStore();
  const { legend } = useLegendStore();

  const targetOptions = ["ЦА 1", "ЦА 2", "ЦА 3"];

  const generatePromptAudienceSelector = () => {
    let query: string;
    const defaultQuery = `
Опишите указанную целевую аудиторию по степени её перспективности, основываясь на следующих критериях:

Потенциальный отклик: вероятность того, что успешная аудитория отреагирует на рекламную кампанию с учетом заданных целей.
Уровень конкурентности: сложность конкуренции в борьбе за внимание, данное подобным.
Соответствие заданной цели: насколько целевая аудитория соответствует достижениям конкретной цели кампании.
Стоимость привлечения: оценка затрат на приобретение этой аудитории.
Положение по лестнице Ханта: сегментирование для обеспечения взаимодействия с продуктом (с учетом одной цели).
Проанализировать все проблемы бизнеса и определить, какие группы наиболее перспективны для достижения конкретных целей и написать для каждой группы боли, ожидания и JTBD.`;

    if (target.isCustomAudienceSelector) {
      query = `Используй следующую информацию, если нужно:
Целевая аудитория - ${target.targetAudienceSelectorCustom || ""} 
Указанные бизнес-проблемы - ${legend.upProblems || legend.customProblem || ""} 
Цель рекламной кампании: ${legend.upGoals || legend.customUpGoal || ""} 
Указанные сильные стороны: ${legend.strSide || ""} 
Бизнес сфера: ${legend.fieldAgency || legend.customField || ""}

`;
    } else {
      query = `Скопируй ${target.targetAudienceSelector} пункт Целевой аудитории из этого списка вместе с сопутствующей информацией: 
${target.targetAudienceGenerator || ""}`;
    }
    query += defaultQuery;

    return query;
  };

  const generateAudienceSelector = async () => {
    const prompt = generatePromptAudienceSelector();
    setTarget({isLoadingAudienceSelector: true});

    try {
      const response = await sendRequestToChat(token, prompt);
      const res = response.choices[0]?.message.content || "Ошибка получения данных";
      setTarget({ targetResponse: res });
    } catch (error) {
      console.log(error);
    } finally {
      setTarget({isLoadingAudienceSelector: false});

    }
  };

  return {
    generateAudienceSelector,
    targetOptions
  };
};

export default useTargetAudienceSelector;
