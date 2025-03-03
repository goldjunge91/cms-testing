import DashWrapper from "../_components/DashWrapper";

export default function ApiPage() {
	return (
		<DashWrapper>
			<main className="flex w-full p-4 flex-col items-center justify-between ">
				<div className="flex flex-col gap-3 mb-[3rem] w-full">
					<h1 className="text-3xl font-semibold mb-6">API Routes</h1>
					<div className="flex flex-col w-full gap-8">
						<div className="flex flex-col justify-center items-start w-full gap-3">
							<h2 className="mt-10 scroll-m-20  pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
								GET - Retrieve All Blogs
							</h2>
							<pre className="bg-gray-950 dark:bg-zinc-900 p-4 rounded-md max-w-[600px]">
								<code className="text-gray-50 dark:text-white font-mono">
									{`const response = await fetch(
	\`\${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/blog/all\`,
	{
		headers: {
			"X-Auth-Key": process.env.CMS_API_KEY!,
		},
	}
);`}
								</code>
							</pre>
						</div>
						<div className="flex flex-col justify-center items-start w-full gap-3">
							<h2 className="mt-10 scroll-m-20  pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
								GET - Retrieve All Slugs
							</h2>
							<pre className="bg-gray-950 dark:bg-zinc-900 p-4 rounded-md max-w-[600px]">
								<code className="text-gray-50 dark:text-white font-mono">
									{`const response = await fetch(
	\`\${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/blog/slugs\`,
	{
		headers: {
			"X-Auth-Key": CMS_API_KEY,
		},
	}
);`}
								</code>
							</pre>
						</div>
						<div className="flex flex-col justify-center items-start w-full gap-3">
							<h2 className="mt-10 scroll-m-20  pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
								POST - Retrieve Article By Slugs
							</h2>
							<pre className="bg-gray-950 dark:bg-zinc-900 p-4 rounded-md max-w-[600px]">
								<code className="text-gray-50 dark:text-white font-mono">
									{`const response = await fetch(
	\`\${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/blog/[slug]\`,
	{
		method: "POST",
		headers: {
			"X-Auth-Key": API_KEY,
		},
	}
);`}
								</code>
							</pre>
						</div>
					</div>
				</div>
			</main >
		</DashWrapper>
	)
}
