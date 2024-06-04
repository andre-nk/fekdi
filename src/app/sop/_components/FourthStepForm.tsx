import React from "react";

export default function FourthStepForm() {
  return (
    <div className="flex h-full">
      <div className="w-1/2 px-6 overflow-y-scroll flex flex-col space-y-2">
        <h2 className="font-medium text-xl">Step 4: Conformance Check</h2>
        <p className="text-sm text-n800 font-light leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting.
        </p>
      </div>
      <div className="w-[1px] h-full bg-n300" />
      <div className="w-1/2 px-6"></div>
    </div>
  );
}
