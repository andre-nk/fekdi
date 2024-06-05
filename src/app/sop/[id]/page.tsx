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
import { useEffect, useState } from "react";
import FirstStepForm from "../_components/FirstStepForm";
import SecondStepForm from "../_components/SecondStepForm";
import ThirdStepForm from "../_components/ThirdStepForm";
import FourthStepForm from "../_components/FourthStepForm";
import { Evaluation } from "@/models/evaluation";
import { uuid } from "uuidv4";
import { useAddLog } from "@/hooks/log/useAddLog";
import { useCreateEvaluation } from "@/hooks/evaluation/useCreateEvaluation";
import { useAddModel } from "@/hooks/model/useAddModel";
import { Margin, usePDF } from "react-to-pdf";
import { useGetLog } from "@/hooks/log/useGetLog";
import { useGetModel } from "@/hooks/model/useGetModel";
import { useCreateResult } from "@/hooks/result/useCreateResult";
import { useRouter } from "next/navigation";
import { useResultContext } from "@/context/ResultContext";

export default function SOPDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [initiated, setInitiated] = useState(false);
  const [log, setLog] = useState<File | null>(null);
  const [petrinet, setPetrinet] = useState<File | null>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  //? Hook #1 - Get SOP by ID
  const { sop, loading } = useGetSOPByID(params.id as string);

  //? Hook #2 - Create Evaluation
  const { createEvaluation, error: evalError } = useCreateEvaluation(
    params.id as string
  );

  //? Hook #3 - Add Log
  const {
    addLog,
    success: logSuccess,
    loading: logLoading,
    error: logError,
  } = useAddLog();

  //? Hook #4 - Add Model
  const {
    addModel,
    success: modelSuccess,
    loading: modelLoading,
    error: modelError,
  } = useAddModel();

  //? Hook #5 - Get Log
  const { log: fetchedLog } = useGetLog(params.id as string, evaluation?.logID);

  //? Hook #6 - Get Model
  const { model: fetchedModel } = useGetModel(
    params.id as string,
    evaluation?.modelID
  );

  //? Hook #7 - Create Result
  const {
    success: resultSuccess,
    loading: resultLoading,
    error: resultError,
    createResult,
  } = useCreateResult(
    params.id as string,
    evaluation?.id!,
    fetchedLog?.link!,
    fetchedModel?.link!
  );

  //? New Evaluation
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

  //? Set Active Evaluation
  const setActiveEvaluation = (name: string) => {
    let eva = sop?.evaluations?.find((e) => {
      return e.id?.substring(0, 4) === name;
    })!;

    setInitiated(false);
    setEvaluation(eva);
  };

  //? #1: Initiate States
  useEffect(() => {
    if (!initiated) {
      if (sop?.evaluations && sop.evaluations.length === 0) {
        setStep(1);
      } else if (evaluation) {
        if (evaluation.result !== undefined) {
          setStep(4);
        } else if (evaluation.modelID !== undefined) {
          setStep(3);
        } else if (
          evaluation.modelID === undefined ||
          evaluation.logID !== undefined
        ) {
          setStep(2);
        } else if (evaluation.logID === undefined) {
          setStep(1);
        }
      } else if (sop?.evaluations && sop.evaluations.length > 0) {
        if (sop.evaluations[0].result !== undefined) {
          setStep(4);
        } else if (sop.evaluations[0].modelID !== undefined) {
          setStep(3);
        } else if (sop.evaluations[0].logID !== undefined) {
          setStep(2);
        }

        setEvaluation(sop.evaluations[0]);
      }
      setInitiated(true);
    }
  }, [evaluation, sop?.evaluations, step, initiated]);

  //? #2: Handle Log Success (Update Local State)
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

  //? #3: Handle Model Success
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

  //? #4: Handle Result Success
  useEffect(() => {
    if (resultSuccess) {
      toaster.success("Result has been created successfully!");
      setStep(step + 1);
    }
  }, [resultSuccess, step]);

  //? #5: Handle Global Errors
  useEffect(() => {
    if (evalError) {
      toaster.danger("An error occurred while creating the evaluation!");
    }

    if (logError) {
      toaster.danger("An error occurred while adding the log!");
    }

    if (modelError) {
      toaster.danger("An error occurred while adding the model!");
    }

    if (resultError) {
      toaster.danger("An error occurred while creating the result!");
    }
  }, [evalError, logError, modelError, resultError]);

  //? #6: Export to PDF
  const setResults = useResultContext((state) => state.setResults);

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
                <SecondStepForm
                  uploadedPetrinet={petrinet}
                  setPetrinet={setPetrinet}
                  cloudPetrinet={fetchedModel?.link!}
                />
              ) : step == 3 ? (
                <ThirdStepForm />
              ) : (
                <FourthStepForm
                  evaluationID={evaluation.id!}
                  results={
                    resultSuccess
                      ? resultSuccess
                      : evaluation.result
                      ? evaluation.result
                      : []
                  }
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
                    setStep(step - 1);
                  }}
                >
                  <p className="text-white font-medium">Back</p>
                </Button>
                <Button
                  size="medium"
                  appearance="primary"
                  backgroundColor={step == 4 ? "#FF5003" : "#0021A5"}
                  disabled={
                    (step == 1 && !(log || logLoading || evaluation.logID)) ||
                    (step == 2 &&
                      !(petrinet || modelLoading || evaluation.modelID)) ||
                    (step == 3 && resultLoading)
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
                        setStep(step + 1);
                      }
                    } else if (step == 2) {
                      if (evaluation.modelID === undefined && petrinet) {
                        await addModel(petrinet!, sop?.id!, evaluation.id!);
                      } else {
                        setStep(step + 1);
                      }
                    } else if (step == 3) {
                      await createResult();
                    } else if (step == 4) {
                      setResults(evaluation.result!);
                      router.push(`/sop/${sop?.id}/export?id=${evaluation.id}`);
                    }
                  }}
                >
                  <p className="text-white font-medium">
                    {step == 4
                      ? "Export to PDF"
                      : step == 3 && !resultLoading
                      ? "Check"
                      : step == 3 && resultLoading
                      ? "Loading..."
                      : "Next"}
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
