import React from "react";
import { Coffee } from "lucide-react";

export default function SidebarBrand() {
  return (
    <div className="brand">
      <Coffee size={22} />
      <h2>CafeOS</h2>
      <p className="subtitle">СИСТЕМА УПРАВЛЕНИЯ</p>
    </div>
  );
}