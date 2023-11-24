"use client";
import { CarProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { CarDetails, CustomButton } from ".";

interface CarCardProps {
	car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
	const { id, isInProduction, brand, model, color, createdAt, updatedAt } = car;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="car-card group">
			<div className="car-card__content">
				<h2 className="car-card__content-title">
					{brand} {model}
				</h2>
			</div>

			<div className="relative w-full h-40 my-3 object-contain">
				<Image
					src="/hero1.png"
					fill
					alt="car model"
					priority
					className="object-contain"
				/>
			</div>

			<div className="relative flex w-full mt-2">
				<div className="flex group-hover:invisible w-full justify-between text-gray">
					<div className="flex items-center gap-2 flex-col justify-center">
						<div className="flex gap-2">
							<Image
								src="/steering-wheel.svg"
								width={20}
								height={20}
								alt="steering wheel"
							/>{" "}
							<span>Brand</span>
						</div>
						<p className="text-[14px]">{brand}</p>
					</div>
					<div className="flex items-center gap-2 flex-col justify-center">
						<div className="flex gap-2">
							<Image
								src="/gas.svg"
								width={20}
								height={20}
								alt="steering wheel"
							/>{" "}
							<span>Model</span>
						</div>

						<p className="text-[14px]">{model}</p>
					</div>
					<div className="flex items-center gap-2 flex-col justify-center">
						<div className="flex gap-2">
							<Image
								src="/tire.svg"
								width={20}
								height={20}
								alt="steering wheel"
							/>{" "}
							<span>Color</span>
						</div>
						<p className="text-[14px]">{color}</p>
					</div>
				</div>

				<div className="car-card__btn-container">
					<CustomButton
						title="View More"
						containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
						textStyles="text-white text-[14px] leading-[17px] font-bold"
						rightIcon="/right-arrow.svg"
						handleClick={() => setIsOpen(true)}
					/>
				</div>
			</div>

			<CarDetails
				isOpen={isOpen}
				closeModal={() => setIsOpen(false)}
				car={car}
			/>
		</div>
	);
};

export default CarCard;
