import { MetadataRoute } from 'next';

export const sitemap = (): MetadataRoute.Sitemap => {
	const baseUrl = "http://localhost:3000";

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1
		},
		{
			url: `${baseUrl}/login`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.7
		},
		{
			url: `${baseUrl}/profile`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.7
		},
		{
			url: `${baseUrl}/create`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.6
		},
	];
}

export default sitemap;
