import { useToken } from "@/hooks";
import { useTargetStore } from "@/store";
import { sendRequestToChat } from "@/api/chat";

const useTargetChoiceUnload = () => {
  const { token } = useToken();
  const { target, setTarget } = useTargetStore();

  const targetChoicePromt = `Ты опытный маркетолог и копирайтер. Твоя задача, переписать этот текст, в котором есть несколько пунктов не теряя сути, при этом должны остаться только следующие пункты: Целевая Аудитория, описание Целевой Аудитории, боли, ожидания.
Текст: ${target.targetResponse}.

В ответе выведи только измененный текст. Также убери нумерацию и выделения слов. Используй отступы в тексте.
`;

  const JTBDPromt = `Твоя задача выписать JTBD из этого текста ${target.targetResponse}.
В ответе выведи только JTBD и краткое описание к ним.
`;

  const generateShortGAResponse = async () => {
    try {
      const response = await sendRequestToChat(token, targetChoicePromt);
      const res = response.choices[0]?.message.content || "Ошибка получения данных";
      setTarget({ targetShortResponse: res });
    } catch (error) {
      console.log("Ошибка при генерации укороченной ЦА:", error);
    }
  };

  const generateJTBDResponse = async () => {
    try {
      const response = await sendRequestToChat(token, JTBDPromt);
      const res = response.choices[0]?.message.content || "Ошибка получения данных";
      setTarget({ JTJTBDResponse: res });
    } catch (error) {
      console.log("Ошибка при генерации JTBD:", error);
    }
  };

  const generateTargetChoice = async () => {
    setTarget({ isLoadingChoiceAndJTJTBD: true });

    try {
      await generateShortGAResponse();
      await generateJTBDResponse();
    } catch (error) {
      console.log("Ошибка при генерации выбора ЦА и JTBD:", error);
    } finally {
      setTarget({ isLoadingChoiceAndJTJTBD: false });
    }
  };

  return {
    generateTargetChoice
  };
};

export default useTargetChoiceUnload;
