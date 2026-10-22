export default function Panel({ className = "", children }) {
  return <div className={`panel ${className}`.trim()}>{children}</div>;
}
