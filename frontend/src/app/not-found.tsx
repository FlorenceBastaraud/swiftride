import Link from 'next/link'

const NotFound = () => {
  return (
    <main className="wrapper">
      <h1 className="text-blue-950 font-bold text-4xl">Page not found</h1>
      <p className="text-center">
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
