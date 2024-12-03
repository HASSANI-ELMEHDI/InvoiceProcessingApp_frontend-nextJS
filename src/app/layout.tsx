import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

export const metadata: Metadata = {
	title: "Invoice Processing",
	description: "Invoice to data using donut model",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} font-mono bg-gray-50 dark:bg-gray-950 text-black dark:text-white px-3 lg:px-10 py-4 lg:py-10 min-h-dvh flex flex-col`}
			>
				<h1 className="font-semibold text-center text-xl bg-gradient-to-b dark:from-gray-50 dark:to-gray-200 from-gray-950 to-gray-800 bg-clip-text text-transparent select-none">
					Invoice Processing
				</h1>

				<main className="grow flex flex-col lg:flex-row gap-6 py-4 lg:py-10">
					{children}
					<ToastContainer />
				</main>

				<footer className="lg:flex flex-row justify-between text-center text-sm dark:text-gray-400 text-gray-600 select-none">
					<p>
					    <A href="https://www.um5.ac.ma/">UM5</A> /{" "}
						<A href="http://ensias.um5.ac.ma/">ENSIAS</A> /{" "}
						TIM 
					</p>
					<p>
						Application of{" "}
						<A href="https://github.com/clovaai/donut.git">Donut</A>{" "}
						model for data extraction from invoices
	
					</p>
					<p>
						<A href="https://github.com/HASSANI-ELMEHDI">GitHub</A> /{" "}
						<A href="https://github.com/HASSANI-ELMEHDI/InvoiceProcessingApp.git">
							Repository
						</A>
					</p>
				</footer>

				<Toaster richColors theme="system" />
			
				<Analytics />
			</body>
		</html>
	);
}

function A(props: any) {
	return (
		<a {...props} className="text-black dark:text-white hover:underline" />
	);
}
