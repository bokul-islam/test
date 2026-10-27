import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Order confirmed",
};

export default function OrderLayout({ children }: { children: ReactNode }) {
  return children;
}
