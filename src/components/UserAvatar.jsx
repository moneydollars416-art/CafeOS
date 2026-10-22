import React from "react";
export default function UserAvatar({ name }) {
  return <div className="profile" title={name}>{name.slice(0, 1).toUpperCase()}</div>;
}
