import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ITagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  size?: 'sm' | 'md';
  color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary';
  href?: string;
}