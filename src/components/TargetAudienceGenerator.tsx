import React from "react";
import { Button, Loader } from "./ui";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTargetAudienceGenerator } from "@/hooks/";
import { useLegendStore } from "@/store";
import { useToken } from "@/hooks/";

const TargetAudienceGenerator = () => {
  const { legend, setLegend } = useLegendStore();
  const { targetAudienceResponse, errorOccurred, isLoading, generateTargetAudience } =
    useTargetAudienceGenerator();
  const { fetchNewToken } = useToken();

  const updateToken = async () => {
    await fetchNewToken();
    setLegend({ warningMessage: "" });
  };

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
          <Button onClick={updateToken} isLoading={isLoading} disabled={isLoading}>
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
              <div className="markdown">
                <ReactMarkdown
                  children={targetAudienceResponse}
                  remarkPlugins={[remarkGfm]}
                ></ReactMarkdown>
              </div>
              ={" "}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TargetAudienceGenerator;
