"use client";
import React, { useState } from "react";
import { SearchBrand } from ".";
import Image from "next/image";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

const SearchButton = ({ otherclasses }: { otherclasses: string }) => (
	<button
		type="submit"
		className={`-ml-3 z-10 sm:mt-8 absolute right-0 bottom-1 ${otherclasses}`}
	>
		<Image
			src="/magnifying-glass.svg"
			alt="magnifying-glass"
			width={40}
			height={40}
			className="object-contain"
		/>
	</button>
);

const SearchBar = () => {
	const [brand, setBrand] = useState("");
	const [model, setModel] = useState("");
	const router = useRouter();

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateSearchParams(model?.toLowerCase(), brand?.toLowerCase());
	};

	//update query string after press search
	const updateSearchParams = (model: string, brand: string) => {
		const searchParams = new URLSearchParams(window.location.search);

		if (brand) {
			searchParams.set("brand", brand);
		} else {
			searchParams.delete("brand");
		}

		if (model) {
			searchParams.set("model", model);
		} else {
			searchParams.delete("model");
		}

		const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

		router.push(newPathname, { scroll: false });
	};

	return (
		<form
			className="searchbar"
			onSubmit={handleSearch}
		>
			<div className="searchbar__item">
				<h5 className="mb-3">Brand</h5>
				<SearchBrand
					brand={brand}
					setBrand={setBrand}
				/>
				<SearchButton otherclasses="sm:hidden" />
			</div>
			<div className="searchbar__item">
				<h5 className="mb-3">Model</h5>
				<Image
					src="/model-icon.png"
					width={25}
					height={25}
					className="absolute w-[20px] h-[20px] ml-4 bottom-[17px]"
					alt="car model"
				/>
				<input
					type="text"
					name="model"
					value={model}
					onChange={(e) => setModel(e.target.value)}
					placeholder="Model"
					className="searchbar__input"
				/>
				<SearchButton otherclasses="sm:hidden" />
			</div>
			<SearchButton otherclasses="max-sm:hidden" />
		</form>
	);
};

export default SearchBar;
