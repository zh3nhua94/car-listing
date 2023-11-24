"use client";
import React from "react";
import { CustomButton } from ".";
import Image from "next/image";

const Hero = () => {
	const handleScroll = () => {};
	return (
		<div className="hero">
			<div className="flex-1 pt-36 padding-x">
				<h1 className="hero__title  ">Buy a Car quickly and easily!</h1>
				<p className="hero__subtitle">Find the car of your dream with our help.</p>
				<CustomButton
					title="Explore Cars"
					containerStyles="bg-primary-blue text-white rounded-full mt-10"
					handleClick={handleScroll}
				/>
			</div>

			<div className="hero__image-container">
				<div className="hero__image">
					<Image
						src="/hero1.png"
						fill
						className="object-contain"
						alt="hero image"
					/>
				</div>
				<div className="hero__image-overlay" />
			</div>
		</div>
	);
};

export default Hero;
