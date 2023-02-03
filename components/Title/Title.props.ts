import { ReactNode } from "react";

export interface ITitleProps {
  As?: 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
}