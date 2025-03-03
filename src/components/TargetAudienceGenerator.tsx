import React from "react";
import { Button } from "./ui";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTargetAudienceGenerator } from "@/hooks/";
import { useTargetStore } from "@/store";
import { useToken } from "@/hooks/";

const TargetAudienceGenerator = () => {
  const { target, setTarget } = useTargetStore();
  const { errorOccurred, isLoading, generateAudienceGenerator } = useTargetAudienceGenerator();
  const { fetchNewToken } = useToken();

  const updateToken = async () => {
    await fetchNewToken();
    setTarget({ warningMessageTarget: "" });
  };

  return (
    <div className="audience-generator block">
      <div className="block">
        <Button onClick={generateAudienceGenerator} disabled={isLoading} isLoading={isLoading}>
          Сгенерировать ЦА
        </Button>
      </div>
      {/* Отображаем ошибку только если она произошла */}
      {errorOccurred && (
        <div className="error-message">
          <p className="help is-danger">{target.warningMessageTarget}</p>
          <Button onClick={updateToken} isLoading={isLoading} disabled={isLoading}>
            Запросить новый токен
          </Button>
        </div>
      )}
      {/* Выводим результат, если он есть */}
      target.targetAudienceGenerator && (
      <div className="box response">
        <h2 className="title is 2">Сгенерированные ЦА</h2>
        <div className="markdown">
          <ReactMarkdown
            children={target.targetAudienceGenerator}
            remarkPlugins={[remarkGfm]}
          ></ReactMarkdown>
        </div>
      </div>
      )
    </div>
  );
};

export default TargetAudienceGenerator;
