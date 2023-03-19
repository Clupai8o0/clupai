import Head from "next/head";

function Home() {
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/splash.png" type="image/x-icon" />
				<title>Sorry...</title>
				<meta http-equiv="X-UA-Compatible" content="ie=edge" />
				<meta
					name="description"
					content="My bad mate 🙏, the portfolio is still not completed"
				/>
				<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
			</Head>
			<div className="w-full h-[100vh] flex flex-col justify-center items-center bg-[#131313] p-4">
				<img src="/construction.svg" alt="house construction hero image" className="md:w-[600px]" />
				<h1 className="font-sans text-2xl md:text-4xl xl:text-5xl font-semibold text-white mt-8 md:mt-12 xl:mt-16 text-center">
					Sorry, it's under construction...
				</h1>
			</div>
		</>
	);
}

export default Home;
