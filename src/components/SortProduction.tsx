import { useRouter } from "next/navigation";
import React from "react";

interface SortProductionProp {
	text: string;
	sortProductionAsc: string;
	setSortProductionAsc: React.Dispatch<React.SetStateAction<string>>;
}

const SortProduction = ({ text, sortProductionAsc, setSortProductionAsc }: SortProductionProp) => {
	const router = useRouter();

	const handleChangeSortProduction = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortProductionAsc(e.target.value);
	};

	const handleUpdateParams = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const searchParams = new URLSearchParams(window.location.search);
		if (e.target.value === "select") {
			searchParams.delete(text.toLowerCase());
		} else {
			searchParams.set(text.toLowerCase(), e.target.value.toString());
		}

		const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
		router.push(newPathname, { scroll: false });
	};

	return (
		<div>
			<label
				htmlFor="sort-production"
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				Sort Production
			</label>
			<select
				id="sort-production"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				onChange={(e) => {
					handleChangeSortProduction(e);
					handleUpdateParams(e);
				}}
				value={sortProductionAsc}
			>
				<option value="select">Select</option>
				<option value={"A-Z"}>A-Z</option>
				<option value={"Z-A"}>Z-A</option>
			</select>
		</div>
	);
};

export default SortProduction;
