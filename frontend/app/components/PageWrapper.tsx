interface PageWrapperProps {
  children?: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-coffee-gradient">
      {/* Title always present */}
      <header className="mb-2"> {/* Spacer after title */}
        <h1 className="title-font title-size select-none">
          ☕ Coffee Counter
        </h1>
      </header>

      {/* Render content passed as children */}
      {children}
    </div>
  );
}
