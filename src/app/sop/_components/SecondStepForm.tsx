import { getFileName } from "@/utils/getFileName";
import { CloudDownloadIcon, CloudUploadIcon } from "evergreen-ui";
import Link from "next/link";
import React from "react";
import Dropzone from "react-dropzone";

export default function SecondStepForm({
  setPetrinet,
  uploadedPetrinet,
  cloudPetrinet,
}: {
  setPetrinet: (log: File | null) => void;
  uploadedPetrinet: File | null;
  cloudPetrinet: string | null;
}) {
  return (
    <div className="flex h-full">
      <div className="w-1/2 px-6 overflow-y-scroll flex flex-col space-y-2">
        <h2 className="font-medium text-xl">
          Step 2: Upload your model (Petrinet)
        </h2>
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
        {!cloudPetrinet ? (
          <Dropzone
            maxFiles={1}
            onDrop={(acceptedFiles) => setPetrinet(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="w-full bg-n75 hover:bg-n100 transition duration-200 border border-dashed border-n600 rounded-lg h-full flex justify-center items-center">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center space-y-4">
                    <CloudUploadIcon size={36} color={"#8F95B2"} />
                    <p className="text-n600">
                      {uploadedPetrinet
                        ? uploadedPetrinet.name
                        : "Drag and drop petrinet (.pnml)"}
                    </p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        ) : (
          <Link
            href={cloudPetrinet}
            download
            className="w-full overflow-clip bg-n75 hover:bg-n100 transition duration-200 border border-dashed border-n600 rounded-lg h-full flex justify-center items-center"
          >
            <div className="flex flex-col items-center space-y-4">
              <CloudDownloadIcon size={36} color={"#8F95B2"} />
              {cloudPetrinet ? (
                <p className="text-n600 text-center text-sm px-6">{`Uploaded file: ${getFileName(
                  cloudPetrinet
                )}`}</p>
              ) : null}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
