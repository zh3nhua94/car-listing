import React, { useState } from "react";

interface PaginationProps {
	numbers: Array<number>;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	maxPageLimit: number;
	minPageLimit: number;
	setMaxPageLimit: React.Dispatch<React.SetStateAction<number>>;
	setMinPageLimit: React.Dispatch<React.SetStateAction<number>>;
	scrollRef: React.RefObject<HTMLDivElement>;
}

const Pagination = ({
	numbers,
	currentPage,
	setCurrentPage,
	maxPageLimit,
	minPageLimit,
	setMaxPageLimit,
	setMinPageLimit,
	scrollRef,
}: PaginationProps) => {
	const pageNumberLimit = 5;

	const handlePrev = () => {
		if (currentPage !== 1) {
			if ((currentPage - 1) % pageNumberLimit === 0) {
				setMaxPageLimit(maxPageLimit - pageNumberLimit);
				setMinPageLimit(minPageLimit - pageNumberLimit);
			}
			setCurrentPage(currentPage - 1);
			window.scrollTo({ behavior: "smooth", top: scrollRef.current?.offsetTop });
		}
	};
	const handleNext = () => {
		if (currentPage !== numbers.length + 1) {
			if (currentPage + 1 > maxPageLimit) {
				setMaxPageLimit(maxPageLimit + pageNumberLimit);
				setMinPageLimit(minPageLimit + pageNumberLimit);
				window.scrollTo({ behavior: "smooth", top: scrollRef.current?.offsetTop });
			}
			setCurrentPage(currentPage + 1);
		}
	};
	const handlePagination = (n: number) => {
		setCurrentPage(n);
		window.scrollTo({ behavior: "smooth", top: scrollRef.current?.offsetTop });
	};

	return (
		<>
			{numbers.length ? (
				<nav aria-label="Page navigation">
					<ul className="flex items-center -space-x-px h-10 text-base my-8">
						<li>
							<button
								className={
									!(currentPage === 1)
										? `flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 `
										: "flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-300 bg-white border border-e-0 border-gray-300 rounded-s-lg  "
								}
								onClick={handlePrev}
							>
								<span className="sr-only">Previous</span>
								<svg
									className="w-3 h-3 rtl:rotate-180"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 6 10"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 1 1 5l4 4"
									/>
								</svg>
							</button>
						</li>
						{minPageLimit >= 1 && (
							<li>
								<button
									disabled
									className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300   "
								>
									&hellip;
								</button>
							</li>
						)}
						{numbers?.map((n, i) => {
							if (n <= maxPageLimit && n > minPageLimit)
								return (
									<li key={i}>
										<button
											className={` ${
												currentPage === n
													? "active z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 "
													: "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
											}`}
											onClick={() => handlePagination(n)}
										>
											{n}
										</button>
									</li>
								);
						})}

						{numbers.length > maxPageLimit && (
							<li>
								<button
									disabled
									className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300   "
								>
									&hellip;
								</button>
							</li>
						)}
						<li>
							<button
								disabled={currentPage === numbers.length}
								className={
									!(currentPage === numbers.length)
										? `flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 `
										: "flex items-center justify-center px-4 h-10 leading-tight text-gray-300 bg-white border border-gray-300 rounded-e-lg "
								}
								onClick={handleNext}
							>
								<span className="sr-only">Next</span>
								<svg
									className="w-3 h-3 rtl:rotate-180"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 6 10"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 9 4-4-4-4"
									/>
								</svg>
							</button>
						</li>
					</ul>
				</nav>
			) : (
				""
			)}
		</>
	);
};

export default Pagination;
