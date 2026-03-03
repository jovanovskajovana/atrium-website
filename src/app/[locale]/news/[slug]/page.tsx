interface NewsSlugPageProps {
  params: Promise<{ slug: string }>
}

const NewsSlugPage = async ({ params }: NewsSlugPageProps) => {
  const { slug } = await params

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1>News: {slug}</h1>
      </div>
    </main>
  )
}

export default NewsSlugPage
