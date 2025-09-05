interface PageWrapperProps {
  children?: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-coffee-gradient">
      {/* Title always present */}
      <h1 className="title-font title-size mb-6 select-none">
        ☕ Coffee Counter
      </h1>

      {/* Render content passed as children */}
      {children}
    </div>
  );
}
