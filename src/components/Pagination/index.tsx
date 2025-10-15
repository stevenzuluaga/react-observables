interface Props {
  page: number;
  totalPage: number;
  previousPage?: () => void;
  nextPage?: () => void;
  goToPage?: (page: number) => void;
}

const ACTIVE_BTN =
  "animate-bounce min-w-9 rounded-full bg-slate-800 py-2 px-3.5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2";

const GENERAL_BTM =
  "min-w-9 rounded-full border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2";

export function Pagination({
  page,
  totalPage,
  nextPage,
  previousPage,
  goToPage,
}: Readonly<Props>) {
  return (
    <div className="flex space-x-1 mb-8">
      <button
        className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        disabled={page <= 1}
        onClick={previousPage}
      >
        Prev
      </button>

      {Array.from({ length: totalPage }, (_, i) => {
        const pageNum = i + 1;

        return (
          <button
            key={pageNum}
            type="button"
            className={pageNum === page ? ACTIVE_BTN : GENERAL_BTM}
            aria-current="page"
            onClick={goToPage ? () => goToPage(pageNum) : () => {}}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        className="min-w-9 rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        aria-label="Next"
        disabled={page >= totalPage}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
}
