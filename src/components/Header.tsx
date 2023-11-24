import Link from "next/link";
import React from "react";
import { CustomButton } from ".";

const Header = () => {
	return (
		<header className="w-full absolute z-10">
			<nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
				<Link
					href="/"
					className="flex justify-center items-center font-bold text-4xl"
				>
					Car<span className="text-blue-700">Pool</span>
				</Link>
				<Link href="/listing">
					<CustomButton
						title="View Listing"
						containerStyles="text-primary-blue rounded-full bg-gray-100 min-w-[130px]"
						btnType="button"
					/>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
