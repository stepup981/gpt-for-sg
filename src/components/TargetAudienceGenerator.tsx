import React from "react";
import { Button, Loader } from "./ui";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTargetAudienceGenerator } from "@/hooks/"; 
import { useLegendStore } from "@/store";

const TargetAudienceGenerator = () => {
  const { legend, setLegend } = useLegendStore();
  const {
    targetAudienceResponse,
    errorOccurred,
    isLoading,
    generateTargetAudience
  } = useTargetAudienceGenerator();

  return (
    <div>
      <div className="block">
        <Button onClick={generateTargetAudience} disabled={isLoading} isLoading={isLoading}>
          Сгенерировать ЦА
        </Button>
      </div>

      {/* Отображаем ошибку только если она произошла */}
      {errorOccurred && (
        <div className="error-message">
          <p className="help is-danger">{legend.warningMessage}</p>
          <Button onClick={() => setLegend({ warningMessage: "" })} isLoading={isLoading} disabled={isLoading}>
            Запросить новый токен
          </Button>
        </div>
      )}

      {/* Выводим результат, если он есть */}
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          targetAudienceResponse && (
            <div className="box response">
              <h2 className="title is 2">Сгенерированные ЦА</h2>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{targetAudienceResponse}</ReactMarkdown>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TargetAudienceGenerator;
