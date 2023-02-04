import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ITitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  As?: 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
}