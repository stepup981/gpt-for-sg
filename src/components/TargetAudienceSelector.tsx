import React, { useState } from "react";
import { sendRequestToChat } from "../api/chat";
import { Button, Loader } from "./ui";
import { useLegend, useToken } from "../hooks";

const TargetAudienceSelector = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [customAudience, setCustomAudience] = useState("");
  const [useCustomAudience, setUseCustomAudience] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const { token } = useToken();
  const { up_problem_spisok, up_goal, str_side, field_agency, otvet_GA_hunt } = useLegend();

  const handleSave = async () => {
    setWarningMessage("");
    setLoading(true);
    try {
      let prompt = "";
      let resultVar = "";
      if (useCustomAudience) {
        prompt = `Используй следующую информацию, если нужно:\nЦелевая аудитория - ${customAudience}\nУказанные бизнес-проблемы - ${up_problem_spisok}\nЦель рекламной кампании: ${up_goal}\nУказанные сильные стороны: ${str_side}\nБизнес сфера: ${field_agency}\n\nОпиши указанную целевую аудиторию по степени её перспективности...`;
        resultVar = customAudience;
      } else {
        prompt = `Скопируй ${selectedOption} пункт Целевой аудитории из этого списка вместе с сопутствующей информацией:\n${otvet_GA_hunt}`;
        resultVar = selectedOption;
      }

      const response = await sendRequestToChat(token, prompt);
      const result = response.choices[0]?.message.content || "Ошибка получения данных.";
      localStorage.setItem("otvet_GA_choice", result);
      localStorage.setItem("GA_user", resultVar);
    } catch (error) {
      setWarningMessage("Ошибка запроса. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="title is-4">Выбор ЦА</h3>
      {!useCustomAudience ? (
        <ul>
          {[1, 2, 3].map((num) => (
            <li key={num}>
              <label className="checkbox">
                <input
                  type="radio"
                  name="targetAudience"
                  value={num}
                  checked={selectedOption === num}
                  onChange={() => setSelectedOption(num)}
                />
                {` ЦА ${num}`}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <input
          className="input"
          type="text"
          placeholder="Введите свой вариант ЦА"
          value={customAudience}
          onChange={(e) => setCustomAudience(e.target.value)}
        />
      )}
      <div className="field mt-3">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={useCustomAudience}
            onChange={() => setUseCustomAudience(!useCustomAudience)}
          />
          &nbsp;Свой вариант ЦА
        </label>
      </div>
      <Button onClick={handleSave} disabled={loading} isLoading={loading}>
        Сохранить выбор ЦА
      </Button>
      {warningMessage && <p className="help is-danger">{warningMessage}</p>}
    </div>
  );
};

export default TargetAudienceSelector;
