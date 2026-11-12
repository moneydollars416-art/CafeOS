import React from "react";

export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="card">
      <div className="stat-head">
        {Icon && (
          <span className="stat-icon">
            <Icon size={18} strokeWidth={2} />
          </span>
        )}
        <p>{label}</p>
      </div>
      <h2>{value}</h2>
    </div>
  );
}