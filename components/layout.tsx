import React, { ReactNode } from 'react'
import { Nav } from "./nav";

type Props = {
    children?: ReactNode
  }

export const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Nav />
      <div className="p-6 mx-auto">{children}</div>
    </div>
  );
};
