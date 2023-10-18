import { useEffect, useState } from "react";
import TimePassed from "../../../components/TimePassed";


 // Array of quotes
 const quotes = [
  "Every moment without you feels like a moment lost. My love for you grows with each passing second.",
  "The day you said yes was the day my world found its true north.",
  "In every story and every song, I find a reflection of us. Our love is timeless.",
  "With you, every ordinary moment feels extraordinary. I cherish every second with you.",
  "You're the reason my world is filled with joy, laughter, and endless love.",
  "Every time I think about our memories, I'm reminded of how fortunate I am to have you.",
  "The best part of my day is any moment I get to spend with you. You're my forever and always.",
  "With every beat of my heart, I fall more in love with you. You're my dream come true.",
  "To the world, you may be one person, but to me, you're the world.",
  "From the moment we met, I knew there was something special. Every day with you has been a blessing.",
];

function TimeTogether() {
       // Select a random quote
    const [randomQuote, setRandomQuote] = useState<string | null>(null);

    useEffect(() => {
        // This will only run on the client after the initial render
        setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, [quotes]);

    if (!randomQuote) return null;

    return (
      <div className="min-h-screen bg-gray-200 to bg-gray-100 bg-gradient-to-b p-5 flex flex-col items-center justify-center space-y-5 md:space-y-10">
        
        <div className="w-full max-w-2xl p-5 bg-white rounded-lg shadow-neumorphic">
            <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">💑</span>
                <TimePassed startDate="2023-06-26" title='Time passed as a couple' />
            </div>
            <div className="flex items-center space-x-3">
                <span className="text-3xl">💖</span>
                <TimePassed startDate="2023-07-04T22:01:00" title='Time passed since I told you "I love you"' />
            </div>
            <div className="flex items-center space-x-3 mt-4">
                <span className="text-3xl">📅</span>
                <TimePassed startDate="2023-02-17T23:30:00" title='Time passed since we met' />
            </div>
        </div>

        <div className="max-w-xl p-4 text-center bg-white rounded-lg shadow-neumorphic mt-5">
            <p className="text-xl italic"><div>&quot;{randomQuote}&quot;</div></p>
        </div>
      </div>
    );
}

export default TimeTogether;


