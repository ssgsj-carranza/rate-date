import { useState, useEffect } from 'react';
import db from '../../../firebase';
import { collection, onSnapshot, query, doc, deleteDoc } from 'firebase/firestore';

type Review = {
    id: string;
    comment: string;
    date: string; 
    rating: number; 
    name: string; 
  };
  

function DateHistoryPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        // Fetching reviews from Firebase on component mount

        const reviewsRef = collection(db, 'reviews');
        const q = query(reviewsRef); // If you add filters, you'd add them here.

        const unsubscribe = onSnapshot(q, snapshot => {
            const fetchedReviews = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))as Review[];
            setReviews(fetchedReviews);
        });

        return () => unsubscribe();
    }, []);

    const onDelete = async (id: string) => {
        const confirmation = window.confirm('Are you sure you want to delete this review?');
        if (confirmation) {
            const reviewRef = doc(db, 'reviews', id);
            await deleteDoc(reviewRef);
            // Firestore listener will handle the review removal from the state
        }
    };

    const totalReviews = reviews.length;
    const reviewsToShow = reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-200 p-5 flex flex-col items-center justify-center space-y-5 md:space-y-10">
            
            <h1 className="text-3xl font-bold mb-4 bg-white p-4 rounded-xl shadow-neumorphic">Date Reviews ({totalReviews})</h1>
            
            <div className="w-full max-w-4xl space-y-4">
                {reviewsToShow.map((review) => (
                    <div key={review.id} className="p-4 bg-white rounded-lg shadow-neumorphic flex justify-between items-center">
                        <div className="space-y-2">
                            <p className="text-gray-700 font-semibold">{review.name}</p>
                            <p>{review.comment}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                            <p className="text-sm text-gray-500">Rating: {review.rating}/10</p>
                        </div>
                        <button onClick={() => onDelete(review.id)} className="text-red-500 hover:text-red-700 transition">
                            🗑️
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-4 bg-white p-2 rounded-full shadow-neumorphic">
                {Array(Math.ceil(totalReviews / itemsPerPage)).fill(null).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 p-2 rounded-full ${currentPage === index+1 ? 'bg-gray-200' : 'bg-white'} transition hover:shadow-inner`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DateHistoryPage;

//npm install firebase firestore

