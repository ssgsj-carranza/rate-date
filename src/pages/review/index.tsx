import { useState } from 'react';
import { init, send } from 'emailjs-com';
import Confetti from 'react-confetti';


init("POBKLVg6n0fX_s9DO");

interface RatingProps {
  rating: number;
  onChange: (value: number) => void;
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
      setMessage('Thanks Sarah! 😘');
      setSubmitted(true); // set submitted to true after the form has been submitted
    } catch (error) {
      console.log(error);
      setMessage('Failed to send email. Please try again later.');
    }
  };
  

  return (
    <div className='bg-gray-100 px-4 sm:px-6 lg:px-8 py-10'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-8 animate-bounce'>Hey Sarah, Leave a Review! 😊</h2>
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
              className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-violet-300'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="comment" className='block text-gray-700 font-bold mb-2'>Leave your review here...😬:</label>
            <textarea
              className='resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40 focus:outline-violet-300'
              id="comment"
              name= "comment"
              value={comment}
              onChange={handleCommentChange}
              required
            ></textarea>
          </div>
          <div className='mb-4'>
            <label htmlFor="rating" className='block text-gray-700 font-bold mb-2'>Your Rating:</label>
            <div className='flex items-center' style={{ maxWidth: '50%' }}>
              <input
                type='range'
                min={0}
                max={10}
                step={0.1}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className='h-4 flex-1 bg-transparent'
              />
              <div className='ml-3'>
                <span className={`text-2xl font-bold ${
                  rating >= 0 && rating < 4
                    ? 'text-red-500'
                    : rating >= 4 && rating < 8
                    ? 'text-yellow-500'
                    : rating >= 8 && rating <= 10
                    ? 'text-green-500'
                    : ''
                }`}>{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className='text-center'>
            <button type="submit" className='font-bold border px-4 py-1 rounded-full border-none text-violet-500 bg-white hover:text-black hover:border-violet-300 transition duration-200 ease-out shadow-xl hover:shadow-inner'>
              Submit
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
        {message && <p className='text-center text-black mt-4 font-bold'>{message}</p>}
      </div>
    </div>
  );
};

