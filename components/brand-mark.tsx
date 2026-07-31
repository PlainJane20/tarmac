export function BrandMark() {
  return <div aria-label="TARMAC" className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-slate-950 shadow-sm">
    <span className="relative z-10 text-sm font-black tracking-tight text-white">T</span>
    <span className="absolute left-1/2 top-1 h-2 w-px -translate-x-1/2 bg-indigo-300" />
    <span className="absolute bottom-1 left-1/2 h-2 w-px -translate-x-1/2 bg-indigo-300" />
    <span className="absolute left-1 top-1/2 h-px w-2 -translate-y-1/2 bg-indigo-300" />
    <span className="absolute right-1 top-1/2 h-px w-2 -translate-y-1/2 bg-indigo-300" />
  </div>;
}
