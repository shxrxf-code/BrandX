export default function sitemap() {
  return [
    {
      url: 'https://brandexdigital.in',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ]
}
