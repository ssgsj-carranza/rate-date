import { useState } from 'react';
import Link from 'next/link';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <div 
                className={`absolute top-0 left-1/4 md:left-10 flex space-x-2 transition-transform ease-in-out duration-300 mt-8 transform ${isOpen ? 'translate-y-0' : '-translate-y-20'}`}>
                
                <Link href="/review"
                      onClick={closeMenu}
                      className="font-bold border px-2 md:px-4 py-1 rounded-full border-none text-gray-800 bg-white hover:text-black hover:border-violet-300 transition duration-200 ease-out shadow-xl hover:shadow-inner"
                >Review
                </Link>
                <Link href="/date-history"
                      onClick={closeMenu}
                      className="font-bold border px-2 md:px-4 py-1 rounded-full border-none text-gray-800 bg-white hover:text-black hover:border-violet-300 transition duration-200 ease-out shadow-xl hover:shadow-inner"
                >Date History
                </Link>
                <Link href="/time-together"
                      onClick={closeMenu}
                      className="font-bold border px-2 md:px-4 py-1 rounded-full border-none text-gray-800 bg-white hover:text-black hover:border-violet-300 transition duration-200 ease-out shadow-xl hover:shadow-inner"
                >Milestones
                </Link>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-2 md:top-4 right-2 md:right-4 font-bold border px-3 md:px-4 py-1 rounded-full border-none text-gray-800 bg-white hover:text-black hover:border-violet-300 transition duration-200 ease-out shadow-xl hover:shadow-inner"
            >
                ☰
            </button>
        </div>
    );
}

export default Navbar;








// npm install @headlessui/react
