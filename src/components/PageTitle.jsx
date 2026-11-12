import React from "react";

export default function PageTitle({ icon: Icon, children }) {
  return (
    <h2 className="page-title">
      {Icon && <Icon size={24} />}
      <span>{children}</span>
    </h2>
  );
}