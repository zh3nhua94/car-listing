"use client";
import React, { useState } from "react";
import { CarCard, CustomFilter, SearchBar, ShowMore } from "@/components";
import { useEffect } from "react";
import { CarProps } from "@/types";
import { useSearchParams } from "next/navigation";

interface CarCardProps {
	allCars: CarProps[];
}
const CarGrid = ({ allCars }: CarCardProps) => {
	const searchParams = useSearchParams();
	const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
	const [itemPerPage, setItemPerPage] = useState(12);
	const [next, setNext] = useState(itemPerPage);
	const [cars, setCars] = useState<CarProps[]>([]);

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
		// const allQuery = Array.from(searchParams.values());
		const allQueryParams = Object.fromEntries(searchParams.entries());
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

		setCars(filteredData);
	}, [searchParams]);

	return (
		<div
			className="mt-12 padding-x padding-y max-width"
			id="discover"
		>
			<div className="home__text-container">
				<h1 className="text-4xl font-extrabold">Car Catalogue</h1>
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
				</div>
			</div>

			{!isDataEmpty ? (
				<section>
					<div className="home__cars-wrapper">
						{cars.length !== 0 ? (
							cars?.slice(0, next).map((car) => (
								<CarCard
									car={car}
									key={car.brand + car.model}
								/>
							))
						) : (
							<div>Nothing is found.</div>
						)}
					</div>
					{next < cars?.length && (
						<ShowMore
							next={next}
							setNext={setNext}
							itemPerPage={itemPerPage}
						/>
					)}
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

export default CarGrid;
