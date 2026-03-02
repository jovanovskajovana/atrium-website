interface NewsSlugPageProps {
  params: Promise<{ slug: string }>
}

const NewsSlugPage = async ({ params }: NewsSlugPageProps) => {
  const { slug } = await params
  return <main>News: {slug}</main>
}

export default NewsSlugPage
