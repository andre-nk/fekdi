"use client";

import {
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  PlusIcon,
  SavedIcon,
  Spinner,
  toaster,
} from "evergreen-ui";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import Header from "@/app/_components/Header";
import { useGetSOPByID } from "@/hooks/sop/useGetSOPByID";
import SOPNodes from "../_components/SOPNodes";
import { useEffect, useRef, useState } from "react";
import FirstStepForm from "../_components/FirstStepForm";
import SecondStepForm from "../_components/SecondStepForm";
import ThirdStepForm from "../_components/ThirdStepForm";
import FourthStepForm from "../_components/FourthStepForm";
import FifthStepForm from "../_components/FifthStepForm";
import { Evaluation } from "@/models/evaluation";
import { uuid } from "uuidv4";
import { useAddLog } from "@/hooks/log/useAddLog";
import { useCreateEvaluation } from "@/hooks/evaluation/useCreateEvaluation";
import { useAddModel } from "@/hooks/model/useAddModel";
import { usePDF } from "react-to-pdf";
import { useGetLog } from "@/hooks/log/useGetLog";
import { useGetModel } from "@/hooks/model/useGetModel";
import { useCreateResult } from "@/hooks/result/useCreateResult";

export default function SOPDetailPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1);
  const [initiated, setInitiated] = useState(false);
  const [log, setLog] = useState<File | null>(null);
  const [petrinet, setPetrinet] = useState<File | null>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  const {
    createEvaluation,
    success: evalSuccess,
    loading: evalLoading,
    error: evalError,
  } = useCreateEvaluation(params.id as string);

  const {
    addLog,
    success: logSuccess,
    loading: logLoading,
    error: logError,
  } = useAddLog();

  const {
    addModel,
    success: modelSuccess,
    loading: modelLoading,
    error: modelError,
  } = useAddModel();

  const { sop, loading, error } = useGetSOPByID(params.id as string);

  // Create a new evaluation
  const newEvaluation = async () => {
    const id = uuid();
    const newEval: Evaluation = {
      id,
      logID: "",
      modelID: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setInitiated(false);
    setEvaluation(newEval);
    await createEvaluation(id);
  };

  // Change evaluation
  const setActiveEvaluation = (name: string) => {
    let eva = sop?.evaluations?.find((e) => {
      return e.id?.substring(0, 4) === name;
    })!;

    setInitiated(false);
    setEvaluation(eva);
  };

  //#0: Handle Initial State
  useEffect(() => {
    //1. No versions -> empty
    //2. Exist versions -> fetch last -> display
    //3. (2) -> new

    if (!initiated) {
      if (sop?.evaluations && sop.evaluations.length === 0) {
        setStep(1);
      } else if (evaluation) {
        if (evaluation.result !== undefined) {
          setStep(5);
        } else if (evaluation.modelID !== undefined) {
          setStep(4);
        } else if (evaluation.modelID === undefined) {
          setStep(3);
        } else if (evaluation.logID !== undefined) {
          setStep(4);
        } else if (evaluation.logID === undefined) {
          setStep(1);
        }
      } else if (sop?.evaluations && sop.evaluations.length > 0) {
        if (sop.evaluations[0].result !== undefined) {
          setStep(5);
        } else if (sop.evaluations[0].modelID !== undefined) {
          setStep(4);
        } else if (sop.evaluations[0].logID !== undefined) {
          setStep(4);
        }

        setEvaluation(sop.evaluations[0]);
      }
      setInitiated(true);
    }
  }, [evaluation, sop?.evaluations, step, initiated]);

  //#1: Handle Log Error
  useEffect(() => {
    if (logError || error) {
      toaster.danger(`Error ${logError || error}`, {});
    }
  }, [logError, error]);

  //#2: Handle Log Success (Update Local State)
  useEffect(() => {
    const setEvaluationLog = (id: string) => {
      setEvaluation({
        ...evaluation!,
        logID: id,
      });
    };

    if (logSuccess && !evaluation?.logID) {
      setStep(step + 1);
      setEvaluationLog(logSuccess!);
    }
  }, [logSuccess, evaluation?.id, step, evaluation]);

  //#3: Handle Model Success
  useEffect(() => {
    const setEvaluationModel = (id: string) => {
      setEvaluation({
        ...evaluation!,
        modelID: id,
      });
    };

    if (modelSuccess && !evaluation?.modelID) {
      setStep(step + 1);
      setEvaluationModel(modelSuccess!);
    }
  }, [modelSuccess, evaluation?.id, step, evaluation]);

  //#5: Handle Fetch Log
  const {
    log: fetchedLog,
    loading: getLogLoading,
    error: getLogError,
  } = useGetLog(params.id as string, evaluation?.logID);

  const {
    model: fetchedModel,
    loading: getModelLoading,
    error: getModelError,
  } = useGetModel(params.id as string, evaluation?.modelID);

  const {
    success,
    loading: resultLoading,
    error: resultError,
    createResult,
  } = useCreateResult(fetchedLog?.link!, fetchedModel?.link!);

  //#4: Export to PDF
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return loading && sop === null ? (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="w-[80vw] flex flex-col">
      <Header
        name={sop?.name!}
        versions={sop?.evaluations!}
        activeEvaluation={evaluation}
        setActiveEvaluation={setActiveEvaluation}
        newEvaluation={newEvaluation}
      />
      <PanelGroup autoSaveId={"tab"} id={"tab"} direction="vertical">
        <Panel>
          <SOPNodes />
        </Panel>
        <PanelResizeHandle className="w-full relative justify-center items-center">
          <div className="w-full h-[1px] bg-n400"></div>
          <button className="w-6 h-6 flex justify-center items-center hover:bg-n100 transition duration-200 bg-white rounded-md border border-n400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ChevronUpIcon size={12} color={"#8F95B2"} />
          </button>
        </PanelResizeHandle>
        <Panel
          defaultSize={50}
          minSize={step === 5 ? 98 : 50}
          className="bg-white w-full"
        >
          {evaluation ? (
            <div className="h-full flex flex-col justify-between space-y-4 pt-6">
              {step == 1 ? (
                <FirstStepForm
                  cloudLog={fetchedLog?.link!}
                  uploadedLog={log}
                  setLog={setLog}
                />
              ) : step == 2 ? (
                <SecondStepForm />
              ) : step == 3 ? (
                <ThirdStepForm
                  uploadedPetrinet={petrinet}
                  setPetrinet={setPetrinet}
                  cloudPetrinet={fetchedModel?.link!}
                />
              ) : step == 4 ? (
                <FourthStepForm />
              ) : (
                <FifthStepForm
                  evaluationID={evaluation.id!}
                  targetRef={targetRef}
                />
              )}
              <div className="w-full flex px-6 py-6 items-center justify-between">
                <Button
                  size="medium"
                  appearance="primary"
                  backgroundColor="#0021A5"
                  disabled={step == 1}
                  className={step == 1 ? "opacity-0" : "opacity-100"}
                  iconBefore={<ChevronLeftIcon size={12} color="white" />}
                  onClick={() => {
                    if (step == 3) {
                      setStep(1);
                    } else {
                      setStep(step - 1);
                    }
                  }}
                >
                  <p className="text-white font-medium">Back</p>
                </Button>
                <Button
                  size="medium"
                  appearance="primary"
                  backgroundColor={step == 5 ? "#FF5003" : "#0021A5"}
                  disabled={
                    step == 1 && !(log || logLoading || evaluation.logID)
                  }
                  iconAfter={
                    step == 5 ? (
                      <SavedIcon size={12} color="white" />
                    ) : (
                      <ChevronRightIcon size={12} color="white" />
                    )
                  }
                  onClick={async () => {
                    if (step == 1) {
                      if (
                        evaluation.logID === undefined &&
                        log &&
                        log instanceof File
                      ) {
                        await addLog(log!, sop?.id!, evaluation.id!);
                      } else {
                        setStep(3);
                      }
                    } else if (step == 2) {
                      setStep(step + 1);
                    } else if (step == 3) {
                      if (evaluation.modelID === undefined && petrinet) {
                        await addModel(petrinet!, sop?.id!, evaluation.id!);
                      } else {
                        setStep(step + 1);
                      }
                    } else if (step == 4) {
                      await createResult();
                      setStep(step + 1);
                    } else if (step == 5) {
                      if (targetRef.current !== null) {
                        toPDF();
                      }
                    }
                  }}
                >
                  <p className="text-white font-medium">
                    {step == 5 ? "Export to PDF" : step == 4 ? "Check" : "Next"}
                  </p>
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
              <h2>Choose a version or create a new one to continue...</h2>
              <div className="flex justify-end items-center space-x-5">
                <Button
                  size="medium"
                  appearance="primary"
                  backgroundColor="#0021A5"
                  onClick={newEvaluation}
                  iconBefore={<PlusIcon size={12} color="white" />}
                >
                  <p className="text-white font-medium">Create new</p>
                </Button>
              </div>
            </div>
          )}
        </Panel>
      </PanelGroup>
    </div>
  );
}
