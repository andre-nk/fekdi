import { CloudUploadIcon } from "evergreen-ui";
import React from "react";
import Dropzone from "react-dropzone";

export default function FirstStepForm({
  setLog,
  uploadedLog,
}: {
  setLog: (log: File | null) => void;
  uploadedLog: File | null;
}) {
  return (
    <div className="flex h-full">
      <div className="w-1/2 px-6 overflow-y-scroll flex flex-col space-y-2">
        <h2 className="font-medium text-xl">Step 1: Upload your event logs</h2>
        <p className="text-sm text-n800 font-light leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting.
        </p>
      </div>
      <div className="w-[1px] h-full bg-n300" />
      <div className="w-1/2 px-6">
        <Dropzone
          maxFiles={1}
          onDrop={(acceptedFiles) => setLog(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="w-full bg-n75 hover:bg-n100 transition duration-200 border border-dashed border-n600 rounded-lg h-full flex justify-center items-center">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center space-y-4">
                  <CloudUploadIcon size={36} color={"#8F95B2"} />
                  <p className="text-n600">
                    {uploadedLog
                      ? uploadedLog.name
                      : "Drag and drop event logs (.csv, .xes)"}
                  </p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  );
}
