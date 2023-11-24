import Image from "next/image";
import Link from "next/link";
import React from "react";
import { footerLinks } from "@/constants";

const Footer = () => {
	return (
		<footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
			<div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10 ">
				<div className="flex flex-col justify-start items-start gap-6">
					<Link
						href="/"
						className="flex justify-center items-center font-bold text-3xl"
					>
						Car<span className="text-blue-700">Pool</span>
					</Link>
					<p className="text-base text-gray-700"></p>
					Carpool 2023 <br />
					All rights reserved &copy;
				</div>
				<div className="footer__links">
					{footerLinks.map((link) => (
						<div
							key={link.title}
							className="footer__link"
						>
							<h3 className="font-bold">{link.title}</h3>
							{link.links.map((item) => (
								<Link
									key={item.title}
									href={item.url}
									className="text-gray-500"
								>
									{item.title}
								</Link>
							))}
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-between items-center mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
				<p>@2023 Carpool. All Rights Reserved</p>
				<div className="footer__copyrights-link">
					<Link
						href={"/"}
						className="text-gray-500"
					>
						Privacy Policy
					</Link>
					<Link
						href={"/"}
						className="text-gray-500"
					>
						Terms & Conditions
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;