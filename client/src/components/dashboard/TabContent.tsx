import { ReactNode } from "react";

interface TabContentProps {
  id: string;
  isActive: boolean;
  children: ReactNode;
}

export default function TabContent({ id, isActive, children }: TabContentProps) {
  return (
    <div id={id} className={`mt-6 ${isActive ? "" : "hidden"}`}>
      {children}
    </div>
  );
}
