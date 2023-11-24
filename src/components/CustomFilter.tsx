"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CustomFilterProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CustomFilter = ({ text, options }: CustomFilterProps) => {
	const router = useRouter();
	const [selected, setSelected] = useState({ title: "Select", value: "" });

	const handleUpdateParams = (e: { title: string; value: string | boolean }) => {
		const searchParams = new URLSearchParams(window.location.search);
		if (e.value === "select") {
			searchParams.delete(text.toLowerCase());
		} else {
			searchParams.set(text.toLowerCase(), e.value.toString());
		}

		const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
		router.push(newPathname, { scroll: false });
	};

	return (
		<div className="w-fit">
			<h5 className="mb-3">{text}</h5>
			<Listbox
				value={selected}
				onChange={(e) => {
					setSelected(e);
					handleUpdateParams(e);
				}}
			>
				<div className="relative w-fit z-10">
					<Listbox.Button className="custom-filter__btn">
						<span className="block truncate text-gray-400">{selected.title}</span>
						<Image
							src="/chevron-up-down.svg"
							width={20}
							height={20}
							className="ml-4 object-contain"
							alt="chevron up down"
						/>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className={`custom-filter__options`}>
							<Listbox.Option
								value={{ title: "Select", value: "select" }}
								className={({ active }) =>
									`relative cursor-default select-none py-2 px-4 capitalize ${
										active ? "bg-primary-blue text-white" : "text-gray-900"
									}`
								}
							>
								{({ selected }) => (
									<span className={`block truncate text-gray-400 ${selected ? "font-medium" : "font-normal"}`}>
										Select
									</span>
								)}
							</Listbox.Option>
							{options.map((option) => (
								<Listbox.Option
									key={option.title}
									value={option}
									className={({ active }) =>
										`relative cursor-default select-none py-2 px-4 capitalize ${
											active ? "bg-primary-blue text-white" : "text-gray-900"
										}`
									}
								>
									{({ selected }) => (
										<span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{option.title}</span>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};

export default CustomFilter;
