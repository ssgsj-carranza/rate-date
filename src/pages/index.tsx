import Link from 'next/link';
import Head from 'next/head';

function Index(): JSX.Element {
  return (
    <div className="">
      <Head>
        <title>Sarah&apos;s Date Rate</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="./node_modules/tailwindcss/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <main>
        <div className="flex h-screen bg-[url('https://cdn.shopify.com/s/files/1/0442/0409/7698/products/MichaelTheOffice12x16.png?v=1657231714&width=1445')] bg-cover bg-center">
          <div className="m-auto">
            <div>
              <Link href={'/review'}>
                <button className='animate-bounce font-bold rounded-full z-30 text-white px-4 py-2 hover:bg-gradient-to-br from-emerald-400 via-gray-800 to-emerald-400 hover:rounded-full hover:shadow-lg transition duration-200 ease-out'
                >Welcome Sarah 😊</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Index;


// npm install react-confetti
