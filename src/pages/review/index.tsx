import { useState } from 'react';
import { init, send } from 'emailjs-com';
import Confetti from 'react-confetti';
import  db  from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';



init("POBKLVg6n0fX_s9DO");

interface RatingProps {
  rating: number;
  onChange: (value: number) => void;
}

function formatDateToMMDDYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = date.getFullYear();
  
  return month + '/' + day + '/' + year;
}

function Rating({ rating, onChange }: RatingProps): JSX.Element {
  const getRatingColor = (rating: number): string => {
    if (rating >= 0 && rating < 4) {
      return 'bg-red-500';
    } else if (rating >= 4 && rating < 8) {
      return 'bg-yellow-500';
    } else if (rating >= 8 && rating <= 10) {
      return 'bg-green-500';
    } else {
      return '';
    }
  };

  return (
    <div className='flex items-center' style={{ maxWidth: '50%' }}>
      <input
        type='range'
        min={0}
        max={10}
        step={0.1}
        value={rating}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`h-4 flex-1 bg-transparent ${getRatingColor(rating)}`}
        style={{
          background: `linear-gradient(to right, #ccc ${rating * 10}%, transparent 0)`,
        }}
      />
      <div className='ml-3'>
        <span className='text-2xl font-bold'>{rating.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default function Form(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(event.target.value);
  };

  const handleRatingChange = (value: number): void => {
    setRating(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
  
    try {
      const messageData = {
        from_name: name,
        comment: comment,
        rating: rating,
        to_name: 'Jorge',
        reply_to: 'ssgsj.carranza@gmail.com'
      };
      const result = await send('service_9xnk80r', 'template_rgfkn4g', messageData);
      console.log(result);
      setMessage('Thanks Sarah! I love you😘');
      setSubmitted(true); // set submitted to true after the form has been submitted
    } catch (error) {
      console.log(error);
      setMessage('Failed to send email. Please try again later.');
    }

    //Save reviews to firestore
    const reviewsCollection = collection(db, "reviews");
    const newReview = {
      name: name,
      comment: comment,
      rating: rating,
      date: formatDateToMMDDYYYY(new Date()) // Optionally add the current date-time
    };
  try {
    const docRef = await addDoc(reviewsCollection, newReview);
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
};
  
return (
  <div className="flex items-center justify-center h-screen bg-gray-100 px-4 sm:px-8 lg:px-16 pt-20">
      <div className="w-full max-w-xl p-8 m-auto bg-white rounded-lg shadow-md">
        <h2 className='text-3xl font-bold text-center mb-8 bg-white p-4 rounded-xl shadow-md sm:text-4xl'>Hey Sarah, Leave a Review! 😊</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className='mb-6 bg-white p-4 rounded-xl shadow-xl'>
          <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
            className='w-full px-4 py-2 border rounded-lg bg-gray-200 appearance-none text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300'
            style={{ boxShadow: "inset 3px 3px 6px #c7c7c7, inset -3px -3px 6px #ffffff" }}
          />
        </div>

        {/* Comment TextArea */}
        <div className='mb-6 bg-white p-4 rounded-xl shadow-xl'>
          <label htmlFor="comment" className='block text-gray-700 font-bold mb-2'>Review here:</label>
          <textarea
            className='w-full px-4 py-2 border rounded-lg bg-gray-200 appearance-none text-gray-700 leading-tight h-40 focus:outline-none focus:ring focus:border-blue-300'
            id="comment"
            name="comment"
            value={comment}
            onChange={handleCommentChange}
            required
            style={{ boxShadow: "inset 3px 3px 6px #c7c7c7, inset -3px -3px 6px #ffffff" }}
          ></textarea>
        </div>

        {/* Rating Input */}
        <div className='mb-6 bg-white p-4 rounded-xl shadow-xl'>
        <label htmlFor="rating" className='block text-gray-700 font-bold mb-2'>Your Rating:</label>
        <div className="">
          <div className='flex items-center' style={{ maxWidth: '50%' }}>
            <input
              type='range'
              min={0}
              max={10}
              step={0.1}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className='h-4 flex-1 cursor-pointer appearance-none rounded-full bg-transparent focus:outline-none'
              style={{
                background: `linear-gradient(to right, #d1d5db ${rating * 10}%, #E5E7EB 0)`,
                boxShadow: 'inset 0 0 3px #c7c7c7, inset 0 0 3px #ffffff'
              }}
            />
          <div className='ml-3 bg-white p-2 rounded-lg shadow-neumorphic'>
            <span className={`text-2xl font-bold ${
              rating >= 0 && rating < 4
              ? 'text-red-500'
              : rating >= 4 && rating < 8
              ? 'text-yellow-500'
              : rating >= 8 && rating <= 10
              ? 'text-green-500'
              : ''
              }`}>{rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      </div>

        {/* Submit Button */}
        <div className='text-center'>
          <button type="submit" 
            className='font-bold border px-4 py-1 rounded-full border-none text-gray-800 bg-white hover:text-black hover:border-violet-300 transition duration-200 ease-out shadow-xl hover:shadow-inner'
            //style={{ boxShadow: "3px 3px 6px #c7c7c7, -3px -3px 6px #ffffff" }}
          >
            Submit ➤
          </button>
        </div>
      </form>
      
      {submitted && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.5}
          colors={['#aa8cf0', '#2be71a', '#4cd1e9']}
        />
      )}

      {message && <p className='mt-4 text-center text-black font-bold'>{message}</p>}
    </div>
  </div>
);
};

