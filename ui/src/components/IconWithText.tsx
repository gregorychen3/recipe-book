import React from "react";

interface Props {
  text: string;
  icon: React.ReactNode;
  iconPosition: "before" | "after";
}
export default function IconWithText({ text, icon, iconPosition }: Props) {
  return iconPosition === "before" ? (
    <div style={{ display: "flex", alignItems: "center" }}>
      {icon}
      <p>{text}</p>
    </div>
  ) : (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p>{text}</p>
      {icon}
    </div>
  );
}
