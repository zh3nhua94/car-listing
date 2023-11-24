import React from "react";
import { cars } from "@/data/cars";
import CarTable from "@/components/CarTable";

const Listing = async () => {
	const allCars = await cars;

	return (
		<div
			className="padding-x pt-[100px] max-width"
			id="listing"
		>
			<CarTable allCars={allCars} />
		</div>
	);
};

export default Listing;
