"use client";
import { SearchBrandProps } from "@/types";
import React, { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { cars } from "@/data/cars";

const SearchBrand = ({ brand, setBrand }: SearchBrandProps) => {
	const [query, setQuery] = useState("");

	//get carbrands from car data
	const carbrands: Array<string> = [];
	cars.map((car) => {
		if (carbrands.includes(car.brand)) {
			return null;
		}
		carbrands.push(car.brand);
	});

	//if no query string show all carbrands, else filter combobox with the query
	const filteredBrands =
		query === ""
			? carbrands
			: carbrands.filter((item) =>
					item.toLowerCase().replace(/\s/g, "").includes(query.toLowerCase().replace(/\s/g, ""))
			  );

	return (
		<div className="search-manufacturer">
			<Combobox
				value={brand}
				onChange={setBrand}
				nullable
			>
				<div className="relative w-full">
					<Combobox.Button className="w-full">
						<Image
							src="/car-logo.svg"
							width={20}
							height={20}
							className="ml-4 absolute top-[14px]"
							alt="Car Logo"
						/>
						<Combobox.Input
							className="search-manufacturer__input"
							placeholder="Brand"
							displayValue={(brand: string) => brand}
							onChange={(e) => setQuery(e.target.value)}
							autoComplete="off"
						/>
						<Transition
							as={Fragment}
							enter="transition-all ease-in duration-[200ms] overflow-hidden"
							enterFrom="transform  max-h-0 opacity-0"
							enterTo="transform  max-h-[1000px] opacity-100"
							leave="transition-all ease-in-out duration-[200ms] overflow-hidden"
							leaveFrom="transform  max-h-[1000px] opacity-100"
							leaveTo="transform  max-h-0 opacity-0"
							afterLeave={() => setQuery("")}
						>
							<Combobox.Options className="comboboxOptions absolute w-full bg-white z-20">
								{filteredBrands.length === 0 && query !== "" ? (
									<Combobox.Option
										value={query}
										className="search-manufacturer__option text-left text-gray-400"
									>
										{/* Create "{query}" */}
										Nothing Found
									</Combobox.Option>
								) : (
									filteredBrands.map((item) => (
										<Combobox.Option
											key={item}
											className={({ active }) =>
												`relative search-manufacturer__option text-left  ${
													active ? "bg-primary-blue text-white" : "text-gray-900"
												}`
											}
											value={item}
										>
											{({ selected, active }) => (
												<>
													<span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{item}</span>
													{selected ? (
														<span
															className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																active ? "text-white" : "text-teal-600"
															}`}
														></span>
													) : null}
												</>
											)}
										</Combobox.Option>
									))
								)}
							</Combobox.Options>
						</Transition>
					</Combobox.Button>
				</div>
			</Combobox>
		</div>
	);
};

export default SearchBrand;
