"use client";

import {
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
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
import FifthStepForm from "../_components/FifthStepForm";
import { Evaluation } from "@/models/evaluation";
import { uuid } from "uuidv4";
import { useAddLog } from "@/hooks/log/useAddLog";
import { useCreateEvaluation } from "@/hooks/evaluation/useCreateEvaluation";
import { useAddModel } from "@/hooks/model/useAddModel";

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
      evaluation: 100,
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
        if (evaluation.evaluation !== undefined) {
          //console.log("Test 5");
          setStep(5);
        } else if (evaluation.modelID !== undefined) {
          //console.log("Test 2");
          setStep(4);
        } else if (evaluation.modelID === undefined) {
          setStep(3);
        } else if (evaluation.logID !== undefined) {
          //console.log("Test 1");
          setStep(4);
        } else if (evaluation.logID === undefined) {
          setStep(1);
        }
      } else if (sop?.evaluations && sop.evaluations.length > 0) {
        // console.log(sop.evaluations[0].logID);
        // console.log(sop.evaluations[0].modelID);
        // console.log(sop.evaluations[0].evaluation);
        if (sop.evaluations[0].evaluation !== undefined) {
          //console.log("Test 5");
          setStep(5);
        } else if (sop.evaluations[0].modelID !== undefined) {
          //console.log("Test 2");
          setStep(4);
        } else if (sop.evaluations[0].logID !== undefined) {
          //console.log("Test 1");
          setStep(4);
        }

        setEvaluation(sop.evaluations[0]);
        // console.log("Step " + step);
        // console.log("Evaluation: " + evaluation);
      }
      setInitiated(true);
    }
  }, [evaluation, sop?.evaluations, step, initiated]);

  //#1: Handle Log Error
  useEffect(() => {
    if (logError || error) {
      console.error(logError || error);
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

      console.log("Set Evaluation Log", id);
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

      console.log("Set Model Log", id);
    };

    if (modelSuccess && !evaluation?.modelID) {
      setStep(step + 1);
      setEvaluationModel(modelSuccess!);
    }
  }, [modelSuccess, evaluation?.id, step, evaluation]);

  return loading && sop === null ? (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="w-full flex flex-col">
      <Header
        name={sop?.name!}
        versions={sop?.evaluations!}
        activeEvaluation={evaluation}
        setActiveEvaluation={setActiveEvaluation}
        newEvaluation={newEvaluation}
      />
      <PanelGroup autoSaveId={"tab"} direction="vertical">
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
          minSize={50}
          className="bg-white w-full flex flex-col justify-between space-y-4 py-6"
        >
          {evaluation && (
            <div>
              {step == 1 ? (
                <FirstStepForm uploadedLog={log} setLog={setLog} />
              ) : step == 2 ? (
                <SecondStepForm />
              ) : step == 3 ? (
                <ThirdStepForm
                  uploadedPetrinet={petrinet}
                  setPetrinet={setPetrinet}
                />
              ) : step == 4 ? (
                <FourthStepForm />
              ) : (
                <FifthStepForm />
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
                  backgroundColor="#0021A5"
                  disabled={step == 5 || (step == 1 && (!log || logLoading))}
                  className={step == 5 ? "opacity-0" : "opacity-100"}
                  iconAfter={<ChevronRightIcon size={12} color="white" />}
                  onClick={async () => {
                    if (step == 1) {
                      console.log(evaluation.logID === undefined && log);
                      if (evaluation.logID === undefined && log) {
                        await addLog(log!, sop?.id!, evaluation.id!);
                      } else {
                        setStep(step + 1);
                      }
                    } else if (step == 2) {
                      setStep(step + 1);
                    } else if (step == 3) {
                      if (evaluation.modelID === undefined && petrinet) {
                        await addModel(petrinet!, sop?.id!, evaluation.id!);
                      } else {
                        setStep(step + 1);
                      }
                    }
                  }}
                >
                  <p className="text-white font-medium">Next</p>
                </Button>
              </div>
            </div>
          )}
        </Panel>
      </PanelGroup>
    </div>
  );
}
