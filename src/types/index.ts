import { MouseEventHandler } from "react";

export interface CustomButtonProps {
	title: string;
	containerStyles?: string;
	handleClick?: MouseEventHandler<HTMLButtonElement>;
	btnType?: "button" | "submit";
	textStyles?: string;
	rightIcon?: string;
	isDiabled?: boolean;
}

export interface SearchBrandProps {
	brand: string;
	setBrand: (brand: string) => void;
}

export interface CarProps {
	id: string;
	isInProduction: boolean;
	brand: string;
	model: string;
	color: string;
	createdAt: string;
	updatedAt: string;
}

export interface OptionsProps {
	title: string;
	value: string | boolean;
}

export interface CustomFilterProps {
	text: string;
	options: OptionsProps[];
}

export interface ShowMoreProps {
	// pageNumber: number;
	next: number;
	// isNext: boolean;
	setNext: React.Dispatch<React.SetStateAction<number>>;
	itemPerPage: number;
}
