import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const images = [
  'public\images\sarahjorge.jpg',
  'public\images\sarahjorge1.jpg',
  'public\images\sarahjorge2.jpg',
  'public\images\sarahjorge3.jpg',
  'public\images\sarahjorge4.jpg',
  'public\images\sarahjorge5.jpg',
]

function Index(): JSX.Element {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() =>{
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <Head>
        <title>Sarah&apos;s Date Rate</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="./node_modules/tailwindcss/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <main>
        <div className={`flex h-screen bg-[url('${images[currentImageIndex]}')] bg-cover bg-center`}>
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
