"use client";

import {
  ArrowUpIcon,
  Button,
  ChevronRightIcon,
  ChevronUpIcon,
  CloudUploadIcon,
  SelectMenu,
  ShareIcon,
} from "evergreen-ui";
import { useState } from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import Console from "console";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import Dropzone from "react-dropzone";

export default function Home() {
  return (
    <main className="w-full flex min-h-screen bg-n75">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header />
        <PanelGroup autoSaveId={"tab"} direction="vertical">
          <Panel></Panel>
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
            <div className="flex h-full">
              <div className="w-1/2 px-6 overflow-y-scroll flex flex-col space-y-2">
                <h2 className="font-medium text-xl">
                  Step 1A: Upload your event logs
                </h2>
                <p className="text-sm text-n800 font-light leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting.
                </p>
              </div>
              <div className="w-[1px] h-full bg-n300" />
              <div className="w-1/2 px-6">
                <Dropzone
                  onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="w-full bg-n75 hover:bg-n100 transition duration-200 border border-dashed border-n600 rounded-lg h-full flex justify-center items-center">
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center space-y-4">
                          <CloudUploadIcon size={36} color={"#8F95B2"} />
                          <p className="text-n600">
                            Drag and drop event logs (.csv, .xes)
                          </p>
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
            <div className="w-full flex px-6 items-center justify-between">
              <Button
                size="medium"
                backgroundColor="#0021A5"
                className="opacity-0"
                iconBefore={<ShareIcon size={12} color="white" />}
              >
                <p className="text-white font-medium">Share</p>
              </Button>
              <Button
                size="medium"
                backgroundColor="#0021A5"
                iconAfter={<ChevronRightIcon size={12} color="white" />}
              >
                <p className="text-white font-medium">Next</p>
              </Button>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </main>
  );
}
