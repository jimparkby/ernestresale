const PageHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-4 flex items-center gap-3 ${className}`}
    style={{
      paddingTop: "var(--tg-content-safe-area-inset-top, 0px)",
      minHeight: "calc(3.5rem + var(--tg-content-safe-area-inset-top, 0px))",
    }}
  >
    {children}
  </div>
);

export default PageHeader;
