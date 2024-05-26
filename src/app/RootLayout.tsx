import { inter } from "./layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-full flex min-h-screen bg-n75">
          <Sidebar />
        </main>
      </body>
    </html>
  );
}
