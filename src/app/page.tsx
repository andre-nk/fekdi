import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex gap-4 justify-center items-center flex-col p-7">
      <Image
        src="/tanwira_logo.svg"
        alt="tanwira_logo"
        width={200}
        height={200}
      />
      <p className="text-lg">
        Process mining tool submitted to FEKDI Hackathon 2024
      </p>
    </div>
  );
}
