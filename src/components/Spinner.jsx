export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status" aria-label="Laden...">
      <div className="w-8 h-8 border-2 border-outline-variant border-t-primary rounded-full animate-spin" />
      <span className="text-xs text-on-surface-variant font-medium tracking-wide uppercase">Kollektion wird geladen...</span>
    </div>
  );
}
