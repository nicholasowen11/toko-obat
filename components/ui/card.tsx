import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return <div className="p-4 border rounded-lg shadow bg-white">{children}</div>;
}

export function CardHeader({ children }: CardProps) {
  return <div className="mb-2 font-semibold">{children}</div>;
}

export function CardTitle({ children }: CardProps) {
  return <h3 className="text-lg font-bold">{children}</h3>;
}

export function CardContent({ children }: CardProps) {
  return <div>{children}</div>;
}
