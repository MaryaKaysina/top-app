import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export enum ColorEnum {
  white = 'white', 
  blue = 'blue'
}

export interface ICardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  color?: ColorEnum;
}