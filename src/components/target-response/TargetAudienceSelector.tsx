import { InputLabel, Switcher, Button, LoaderWriter } from "../ui";
import { useTargetStore } from "@/store";
import { useTargetAudienceSelector } from "@/hooks";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const TargetAudienceSelector: React.FC = () => {
  const { target, setTarget } = useTargetStore();
  const { generateAudienceSelector, targetOptions } = useTargetAudienceSelector();

  const setIsCustomAudienceSelectror = (value: boolean) => {
    setTarget({
      isCustomAudienceSelector: value,
      targetAudienceSelector: value ? "" : target.targetAudienceSelector,
      targetAudienceSelectorCustom: value ? "" : target.targetAudienceSelectorCustom
    });
  };

  return (
    <>
      {target.targetAudienceGenerator && !target.isLoadingAudienceGenerator && (
        <div className="audience-selector block">
          {target.isCustomAudienceSelector ? (
            <InputLabel
              labelDescription="Своя ЦА"
              valueInput={target.targetAudienceSelectorCustom}
              setText={(value) => setTarget({ targetAudienceSelectorCustom: value })}
              labelWarning={target.warningMessageTarget}
            />
          ) : (
            <div className="field">
              <label className="label">Выберите целевую аудиторию</label>
              {targetOptions.map((option, index) => (
                <div className="control mb-2" key={index}>
                  <label className="radio">
                    <input
                      type="radio"
                      name="targetAudience"
                      checked={target.targetAudienceSelector === (index + 1).toString()}
                      onChange={() => setTarget({ targetAudienceSelector: (index + 1).toString() })}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
          <Switcher
            label="Свой вариант"
            isChecked={target.isCustomAudienceSelector}
            onToggle={setIsCustomAudienceSelectror}
          />
          <Button
            onClick={generateAudienceSelector}
            isLoading={target.isLoadingAudienceSelector}
            disabled={target.isLoadingAudienceSelector}
          >
            Сохранить выбор ЦА
          </Button>
          {/* Выводим результат, если он есть */}
          {target.isLoadingAudienceSelector ? (
            <LoaderWriter />
          ) : (
            target.targetResponse && (
              <div className="box response">
                <h2 className="title is 2">Сгенерированные ЦА</h2>
                <div className="markdown">
                  <ReactMarkdown
                    children={target.targetResponse}
                    remarkPlugins={[remarkGfm]}
                  ></ReactMarkdown>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default TargetAudienceSelector;
