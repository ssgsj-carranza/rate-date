import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const WheelComponent = dynamic(() => import('paramall-wheel-of-fortune').then(mod => mod.Wheel), { ssr: false });

const Randomizer: React.FC = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>('');
  const [winner, setWinner] = useState<string | null>(null);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true after the component mounts
    setIsClient(true);
  }, []);

  const addOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * options.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className="flex flex-col items-center px-4">
      <h1 className="text-2xl font-bold mb-4">Randomizer</h1>
      <input
        type="text"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        placeholder="Add an option"
        className="border px-4 py-2 rounded-full shadow-neumorphic mb-2 w-full max-w-md"
      />
      <button onClick={addOption} className="bg-green-500 text-white px-4 py-2 rounded-full shadow-neumorphic active:shadow-neumorphic-inset mb-4">
        Add
      </button>
      {isClient && options.length > 0 && (
        <>
          <WheelComponent
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={options.map((option, index) => ({
              option,
              style: {
                backgroundColor: index % 4 === 0 ? 'white' :
                                index % 4 === 1 ? '#FFD700' :
                                index % 4 === 2 ? '#B2AC88' : 'black',
                textColor: index % 4 === 3 ? 'white' : 'black'
              }
            }))}
            onStopSpinning={() => {
              setWinner(options[prizeNumber]);
              setMustSpin(false);
              setOptions(options.filter((_, index) => index !== prizeNumber));
            }}
          />
          <button onClick={handleSpinClick} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-neumorphic active:shadow-neumorphic-inset mt-4">
            Spin
          </button>
        </>
      )}
      {winner && <p className="mt-4">Last Winner: {winner}</p>}
    </div>
  );
};

export default Randomizer;




// npm install react-spinning-wheel --legacy-peer-deps
// npm install react-custom-wheel
