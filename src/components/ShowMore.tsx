"use client";
import { ShowMoreProps } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { CustomButton } from ".";
import { updateSearchParams } from "@/utils";

const ShowMore = ({ next, setNext, itemPerPage }: ShowMoreProps) => {
	const router = useRouter();

	const handleNavigation = () => {
		// const newLimit = (pageNumber + 1) * itemPerPage;
		// const newPathname = updateSearchParams("limit", `${newLimit}`);
		setNext(next + itemPerPage);
		// router.push(newPathname, { scroll: false });
	};

	return (
		<div className="w-full flex-center gap-5 mt-10">
			<CustomButton
				title="Show More"
				btnType="button"
				containerStyles="bg-primary-blue rounded-full text-white"
				handleClick={handleNavigation}
			/>
		</div>
	);
};

export default ShowMore;
