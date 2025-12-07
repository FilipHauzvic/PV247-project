import { MetadataRoute } from 'next';

export const sitemap = (): MetadataRoute.Sitemap => {
	const baseUrl = "http://localhost:3000";

	return [
		{
			url: baseUrl,
			lastModified: new Date("2025-12-07"),
			changeFrequency: "yearly",
			priority: 1
		},
		{
			url: `${baseUrl}/login`,
			lastModified: new Date("2025-12-07"),
			changeFrequency: "yearly",
			priority: 0.7
		},
	];
}

export default sitemap;
