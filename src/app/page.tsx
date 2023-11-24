import { CarGrid, Hero } from "@/components";
import { cars } from "@/data/cars";

export default async function Home() {
	const allCars = await cars;

	return (
		<main className="overflow-hidden">
			<Hero />
			<CarGrid allCars={allCars} />
		</main>
	);
}
