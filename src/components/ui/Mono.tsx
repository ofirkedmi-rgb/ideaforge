interface MonoProps {
  children: React.ReactNode;
  color?: string;
  size?: string;
}

export function Mono({ children, color = "#1a1a1a", size }: MonoProps) {
  return (
    <span
      className="font-mono font-bold"
      style={{ color, fontSize: size }}
    >
      {children}
    </span>
  );
}
