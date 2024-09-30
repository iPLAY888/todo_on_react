export default function Checkbox({ children, onClick, checked }) {
  return (
    <span className="mark">
      <input type="checkbox" checked={checked} onChange={onClick} />
      {children}
    </span>
  );
}
