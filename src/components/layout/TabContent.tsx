interface TabContentProps {
  children: React.ReactNode;
}

export function TabContent({ children }: TabContentProps) {
  return (
    <div className="flex flex-1 flex-col gap-[10px]">
      {children}
    </div>
  );
}
