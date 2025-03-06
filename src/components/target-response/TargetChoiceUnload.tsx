import { Button, LoaderWriter } from "@/components/ui";
import { useTargetStore } from "@/store";
import { useTargetChoiceUnload } from "@/hooks";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const TargetChoiceUnload = () => {
  const { target, setTarget } = useTargetStore();
  const { generateTargetChoice } = useTargetChoiceUnload();

  return (
    <>
      {target.targetResponse && (
        <Button
          onClick={generateTargetChoice}
          isLoading={target.isLoadingChoiceAndJTJTBD}
          disabled={target.isLoadingChoiceAndJTJTBD}
        >
          Сохранить выбор для выгрузки
        </Button>
      )}

      {target.isLoadingChoiceAndJTJTBD ? (
        <LoaderWriter />
      ) : (
        target.targetResponse && target.targetShortResponse && target.JTJTBDResponse && (
          <div>
            <h2 className="title is 2"> Выбор ЦА для выгрузки</h2>
            <div className="box response">
              <h2 className="title is 2">Укороченная ЦА для выгрузки</h2>
              <div className="markdown">
                <ReactMarkdown
                  children={target.targetShortResponse}
                  remarkPlugins={[remarkGfm]}
                ></ReactMarkdown>
              </div>
            </div>
            <div className="box response">
              <h2 className="title is 2">JTBD для выгрузки</h2>
              <div className="markdown">
                <ReactMarkdown
                  children={target.targetShortResponse}
                  remarkPlugins={[remarkGfm]}
                ></ReactMarkdown>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default TargetChoiceUnload;
