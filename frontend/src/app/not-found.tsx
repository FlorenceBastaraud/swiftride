import Link from 'next/link'

const NotFound = () => {
  return (
    <main className="wrapper-flex-1 flex flex-col justify-center items-center gap-7 p-4">
      <h1 className="text-blue-950 font-bold text-4xl">Page not found</h1>
      <p className="text-center max-w-2xl">
        Sorry, it looks like the page you are looking for does not exist. But
        don{"'"}t worry, you can always go back to the{' '}
        <Link href="/" className="text-blue-950 font-bold underline">
          homepage
        </Link>
      </p>
    </main>
  )
}

export default NotFound
