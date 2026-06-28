export const homepageQuery = `{
  "featured": *[_type == "post" && featured == true] | order(updatedAt desc)[0]{
    title, slug, category->{title,slug}, verdictLabel, seoDescription, updatedAt, readingTimeMin
  },
  "latest": *[_type == "post"] | order(updatedAt desc)[0...12]{
    title, slug, category->{title,slug}, seoDescription, updatedAt, readingTimeMin
  },
  "categories": *[_type == "category"] | order(sortOrder asc){ title, slug },
  "reviewCount": count(*[_type == "post"])
}`

export const postQuery = `
  *[_type == "post" && slug.current == $slug][0]{
    title, slug, updatedAt, readingTimeMin,
    category->{title, slug},
    tags, seoDescription,
    verdictSummary, verdictLabel, verdictScore,
    body,
    comparisonTable, pros, cons, faq, featured
  }
`

export const categoryPageQuery = `{
  "category": *[_type == "category" && slug.current == $slug][0]{ title, slug, description },
  "posts": *[_type == "post" && category->slug.current == $slug] | order(updatedAt desc){
    title, slug, category->{title,slug}, seoDescription, updatedAt, readingTimeMin
  },
  "categories": *[_type == "category"] | order(sortOrder asc){ title, slug }
}`

export const allPostSlugsQuery = `*[_type == "post"]{ "slug": slug.current }`
export const allCategorySlugsQuery = `*[_type == "category"]{ "slug": slug.current }`
