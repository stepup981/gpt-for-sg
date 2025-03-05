import { Button, LoaderWriter } from "../ui";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTargetAudienceGenerator } from "@/hooks/";
import { useTargetStore } from "@/store";
import { useToken } from "@/hooks/";

const TargetAudienceGenerator = () => {
  const { target, setTarget } = useTargetStore();
  const { errorOccurred, generateAudienceGenerator } = useTargetAudienceGenerator();
  const { fetchNewToken } = useToken();

  const updateToken = async () => {
    await fetchNewToken();
    setTarget({ warningMessageTarget: "" });
  };

  return (
    <div className="audience-generator block">
      <Button
        onClick={generateAudienceGenerator}
        disabled={target.isLoadingAudienceGenerator}
        isLoading={target.isLoadingAudienceGenerator}
      >
        Сгенерировать ЦА
      </Button>

      {/* Отображаем ошибку только если она произошла */}
      {errorOccurred && (
        <div className="error-message">
          <p className="help is-danger">{target.warningMessageTarget}</p>
          <Button
            onClick={updateToken}
            isLoading={target.isLoadingAudienceGenerator}
            disabled={target.isLoadingAudienceGenerator}
          >
            Запросить новый токен
          </Button>
        </div>
      )}

      {/* Выводим результат, если он есть */}
      {target.isLoadingAudienceGenerator ? (
        <LoaderWriter />
      ) : (
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
      )}
    </div>
  );
};

export default TargetAudienceGenerator;
