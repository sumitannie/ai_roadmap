"use client";
import { ReactFlowProvider } from "reactflow";
import "./globals.css";
import "reactflow/dist/style.css";

// export const metadata = {
//   title: "React Flow Demo",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactFlowProvider>{children}</ReactFlowProvider>
      </body>
    </html>
  );
}
