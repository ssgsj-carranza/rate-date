import { useState } from 'react';
import { init, send } from 'emailjs-com';

init("POBKLVg6n0fX_s9DO");

interface RatingProps {
  rating: number;
  onChange: (value: number) => void;
}

function Rating({ rating, onChange }: RatingProps): JSX.Element {
  return (
    <div className='flex items-center'>
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          className={`text-2xl focus:outline-none ${
            i < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => onChange(i + 1)}
        >
          {i < rating ? '⭐' : '☆'}
        </button>
      ))}
    </div>
  );
}


export default function Form(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(1);
  const [message, setMessage] = useState<string>('');

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
      setMessage('Thank you for your feedback!');
    } catch (error) {
      console.log(error);
      setMessage('Failed to send email. Please try again later.');
    }
  };

  return (
    <div className='bg-gray-100 px-4 sm:px-6 lg:px-8 py-10'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-8'>Hey Sarah, Leave a Review! 😊</h2>
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
              className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="comment" className='block text-gray-700 font-bold mb-2'>Leave your review here...😬:</label>
            <textarea
              className='resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40'
              id="comment"
              name= "comment"
              value={comment}
              onChange={handleCommentChange}
              required
            ></textarea>
          </div>
          <div className='mb-4'>
            <label htmlFor="rating" className='block text-gray-700 font-bold mb-2'>Your Rating:</label>
            <Rating rating={rating} onChange={handleRatingChange} />
          </div>
          <div className='text-center'>
            <button type="submit" className='font-bold border px-4 py-1 rounded-full border-emerald-700 hover:border-none hover:text-emerald-700 hover:bg-white transition duration-200 ease-out hover:shadow-xl'>
              Submit
            </button>
          </div>
        </form>
        {message && <p className='text-center text-green-500 mt-4'>{message}</p>}
      </div>
    </div>
  );
}

