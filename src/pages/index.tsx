import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the Image component

const images = [
  '/images/sarahjorge.jpg',
  '/images/sarahjorge1.jpg',
  '/images/sarahjorge2.jpg',
  '/images/sarahjorge3.jpg',
  '/images/sarahjorge4.jpg',
  '/images/sarahjorge5.jpg',
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
    <div className="relative">
      <Head>
        <title>Sarah&apos;s Date Rate</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="./node_modules/tailwindcss/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <div className="flex h-screen" 
           style={{ backgroundImage: `url(${images[currentImageIndex]})`, 
           backgroundSize: 'cover', 
           backgroundPosition: 'center' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Link href={'/review'}>
          <button 
            className='font-bold rounded-full z-30 px-4 py-2 text-gray-800 bg-gray-300 shadow-md hover:shadow-lg transition duration-200 ease-out hover:bg-gray-200 active:bg-gray-400'
            style={{
            boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff"
            }}
          >Welcome Sarah 😊</button>
        </Link>
      </div>
    </div>
  );
}

export default Index;



// npm install react-confetti
// npm install @next/bundle-analyzer next-optimized-images

