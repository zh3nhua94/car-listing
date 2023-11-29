"use client";
import React, { useRef, useState } from "react";
import { CustomFilter, SearchBar } from "@/components";
import { useEffect } from "react";
import { CarProps } from "@/types";
import { useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import SortProduction from "./SortProduction";

interface CarCardProps {
	allCars: CarProps[];
}
const CarTable = ({ allCars }: CarCardProps) => {
	const searchParams = useSearchParams();
	const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
	const [cars, setCars] = useState<CarProps[]>([]);
	const [itemPerPage, setItemPerPage] = useState(10);
	const [numbers, setNumbers] = useState<Array<number>>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [maxPageLimit, setMaxPageLimit] = useState(5);
	const [minPageLimit, setMinPageLimit] = useState(0);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [sortProductionAsc, setSortProductionAsc] = useState<string>("");

	//get carbrands from car data
	const carColors: Array<string> = [];
	allCars.map((car) => {
		if (carColors.includes(car.color)) {
			return null;
		}
		carColors.push(car.color);
	});
	const colorEntries = carColors.map((color, index) => ({ title: color, value: color }));
	const productionEntries = [
		{ title: "Yes", value: true },
		{ title: "No", value: false },
	];

	//fetch from data
	useEffect(() => {
		fetchDataFromQuery();
		setCurrentPage(1);
		setMaxPageLimit(5);
		setMinPageLimit(0);
		//Pagination
	}, [searchParams]);

	useEffect(() => {
		PaginationPages();
	}, [currentPage, cars, itemPerPage]);

	//Sort Production
	const sortProdAsc = (a: any, b: any) => {
		return a.isInProduction - b.isInProduction;
	};

	const sortProdDsc = (a: any, b: any) => {
		return b.isInProduction - a.isInProduction;
	};

	const fetchDataFromQuery = () => {
		const allQueryParams = Object.fromEntries(searchParams.entries());
		const sort = allQueryParams.sortprod;
		delete allQueryParams.sortprod;
		delete allQueryParams.limit;
		const allQuery = Object.values(allQueryParams);
		const filteredData = allCars.filter((item) => {
			const values = [
				item.brand.toLowerCase(),
				item.model.toLowerCase(),
				item.isInProduction,
				item.color.toLowerCase(),
			];
			//match query string with values
			return allQuery.length !== 0 ? allQuery.every((q) => (q !== null ? values.toString().includes(q) : false)) : true;
		});
		setCars(
			sort === "A-Z" ? filteredData.sort(sortProdAsc) : sort === "Z-A" ? filteredData.sort(sortProdDsc) : filteredData
		);
	};

	//Pagination
	const lastSliceIndex = currentPage * itemPerPage;
	const firstSliceIndex = lastSliceIndex - itemPerPage;
	const generateRecords = (cars: any) => {
		return sortProductionAsc === "A-Z"
			? cars.sort(sortProdAsc).slice(firstSliceIndex, lastSliceIndex)
			: sortProductionAsc === "Z-A"
			? cars.sort(sortProdDsc).slice(firstSliceIndex, lastSliceIndex)
			: cars.slice(firstSliceIndex, lastSliceIndex);
	};
	const records = generateRecords(cars);

	const PaginationPages = () => {
		if (itemPerPage !== 0) {
			const totalPage = Math.ceil(cars.length / itemPerPage);
			const numbersPages: Array<number> = [];
			for (let i = 0; i < totalPage; i++) {
				numbersPages.push(i + 1);
			}
			setNumbers(numbersPages);
		}
	};

	//item per page
	const handleItemAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.value !== null && !(Number(e.target.value) < 1)) {
			setItemPerPage(Number(e.target.value));
		}
	};

	return (
		<div
			className="mt-12 padding-y max-width"
			id="car-listing"
		>
			<div className="home__text-container">
				<h1 className="text-4xl font-extrabold">Car Catalogue Listing</h1>
				<p>Explore your dream car here</p>
			</div>
			<div className="home__filters">
				<SearchBar />
				<div className="home__filter-container">
					<CustomFilter
						text="Production"
						options={productionEntries}
					/>
					<CustomFilter
						text="Color"
						options={colorEntries}
					/>
					<div className="hidden">
						<SortProduction
							sortProductionAsc={sortProductionAsc}
							setSortProductionAsc={setSortProductionAsc}
							text="SortProd"
						/>
					</div>
				</div>
			</div>

			{/* Items per page input */}
			<form className="max-w-sm mt-5">
				<label
					htmlFor="number-input"
					className="block"
				>
					<h5 className="mb-3">Number of items to view per page</h5>
				</label>
				<input
					type="number"
					id="number-input"
					aria-describedby="helper-text-explanation"
					className=" text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full  h-[48px] pl-12 p-4 rounded-full max-sm:rounded-full bg-light-white outline-none cursor-pointer"
					placeholder="10"
					onChange={(e) => handleItemAmount(e)}
					min={1}
				/>
			</form>

			{!isDataEmpty ? (
				<section>
					<div
						className="listing__car-wrapper"
						id="car-table"
						ref={scrollRef}
					>
						<div className="relative overflow-x-auto">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
									<tr>
										<th
											scope="col"
											className="px-6 py-3"
										>
											Brand
										</th>
										<th
											scope="col"
											className="px-6 py-3"
										>
											Model
										</th>
										<th
											scope="col"
											className="px-6 py-3"
										>
											Color
										</th>
										<th
											scope="col"
											className="px-6 py-3"
										>
											In Production
										</th>
									</tr>
								</thead>
								<tbody>
									{cars.length !== 0 ? (
										records?.map((car: any) => (
											<tr
												key={car.brand + car.model}
												className="bg-white border-b "
											>
												<th
													scope="row"
													className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
												>
													{car.brand}
												</th>
												<td className="px-6 py-4">{car.model}</td>
												<td className="px-6 py-4">{car.color}</td>
												<td className="px-6 py-4">{car.isInProduction ? "Yes" : "No"}</td>
											</tr>
										))
									) : (
										<tr className="bg-white border-b ">
											<td className="px-6 py-4">Nothing is found.</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>

					<Pagination
						numbers={numbers}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						maxPageLimit={maxPageLimit}
						minPageLimit={minPageLimit}
						setMaxPageLimit={setMaxPageLimit}
						setMinPageLimit={setMinPageLimit}
						scrollRef={scrollRef}
					/>
				</section>
			) : (
				<div className="home__error-container">
					<h2 className="text-black text-xl font-bold">Opps, no results</h2>
					<p></p>
				</div>
			)}
		</div>
	);
};

export default CarTable;
