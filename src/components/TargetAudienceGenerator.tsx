import React from "react";
import { Button, Loader } from "./ui";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTargetAudienceGenerator, useToken } from "@/hooks/"; 
import { ILegendValues } from "@/hooks/useLegend";

interface ITargetAudienceGeneratorProps {
  warningMessage: string;
  setWarningMessage: (value: string) => void;
  legend: ILegendValues;
}

const TargetAudienceGenerator: React.FC<ITargetAudienceGeneratorProps> = ({
  warningMessage,
  setWarningMessage,
  legend
}) => {
  const {
    targetAudienceResponse,
    errorOccurred,
    isLoading,
    warningMessage: generatedWarningMessage,
    generateTargetAudience
  } = useTargetAudienceGenerator(legend, setWarningMessage);
  const { fetchNewToken } = useToken();

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
          <p className="help is-danger">{generatedWarningMessage || warningMessage}</p>
          <Button onClick={fetchNewToken} isLoading={isLoading} disabled={isLoading}>
            Запросить новый токен
          </Button>
        </div>
      )}

      {/* Выводим результат, если он есть */}
      <>
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
      </>
    </div>
  );
};

export default TargetAudienceGenerator;
