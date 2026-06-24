import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      <Link
        href={currentPage > 1 ? `/portfolio?page=${currentPage - 1}` : '#'}
        className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${
          currentPage > 1
            ? "border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary hover:bg-primary/5"
            : "border-neutral-100 text-neutral-300 pointer-events-none"
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
      </Link>

      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2 text-neutral-400">...</span>
        ) : (
          <Link
            key={page}
            href={`/portfolio?page=${page}`}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border font-headline font-bold transition-all ${
              currentPage === page
                ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                : "border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary hover:bg-primary/5"
            }`}
          >
            {page}
          </Link>
        )
      ))}

      <Link
        href={currentPage < totalPages ? `/portfolio?page=${currentPage + 1}` : '#'}
        className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${
          currentPage < totalPages
            ? "border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary hover:bg-primary/5"
            : "border-neutral-100 text-neutral-300 pointer-events-none"
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </Link>
    </div>
  );
}
