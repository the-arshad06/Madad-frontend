import { useState, useEffect } from "react";
import { User, Tag, Calendar, Clock, Star, MessageSquare, Briefcase } from "lucide-react";

export default function BookingCard({ provider }) {
  const [ratings, setRatings] = useState({});
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [serverRatings, setServerRatings] = useState({});
  const [comment, setComment] = useState("");
  const url = "http://localhost:4000";

  function onChange(e) {
    setComment(e.target.value);
  }

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`${url}/review`, { credentials: "include" });
        const data = await res.json();

        setReviews(data.reviews || []);
        const savedRatings = {};
        data.reviews?.forEach((r) => {
          savedRatings[r.bookingId] = { rating: r.rating, comment: r.comment };
        });
        setServerRatings(savedRatings);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, []);

  function handleRatingChange(e, id) {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = "";
    else if (value < 1) value = 1;
    else if (value > 5) value = 5;
    setRatings((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmitRating(bookingId, status, providerId, comment) {
    const rating = ratings[bookingId];
    if (!rating) {
      setMessage("Please enter a rating before submitting!");
      return;
    }

    try {
      const res = await fetch(`${url}/review`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookingId, status, rating, providerId, comment }),
      });

      const data = await res.json();
      if (res.ok) {
        const refresh = await fetch(`${url}/review`, { credentials: "include" });
        const refreshed = await refresh.json();
        setReviews(refreshed.reviews);

        const savedRatings = {};
        refreshed.reviews.forEach((r) => {
          savedRatings[r.bookingId] = { rating: r.rating, comment: r.comment }; 
        });
        setServerRatings(savedRatings); 

        setMessage("✅ Review submitted successfully! Thank you.");
      } else {
        setMessage(data.message || "❌ Failed to submit review!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("❌ Network error occurred while submitting review.");
    }
  }

  if (!provider || provider.length === 0) {
    return (
      <div className="text-center text-gray-600 py-10">
        <h1 className="text-xl font-semibold">No bookings found 😔</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      {provider.map((item) => {
        const existingRating = serverRatings[item._id];
        const bookingDate = new Date(item.createdAt);
        const formattedDate = bookingDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
        const formattedTime = bookingDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
        
        const isCompleted = item.status === "completed";

        return (
          <div
            key={item._id}
            // Card Style: Clean white, deep shadow, subtle hover effect
            className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-blue-200"
          >
            
            {/* 1. Header & Status */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
              <h3 className="font-bold text-xl flex items-center gap-2 text-gray-900">
                <User size={20} className="text-blue-600" /> 
                {item?.providerId?.name}
              </h3>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 text-sm rounded-full font-bold uppercase tracking-wider ${
                  isCompleted
                    ? "bg-green-100 text-green-700 ring-1 ring-green-300"
                    : "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* 2. Booking Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-700 text-sm">
                
                <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-indigo-500 flex-shrink-0" />
                    <span className="font-semibold">Service:</span>
                    <span className="truncate">{item.providerId?.category || 'N/A'}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-teal-500 flex-shrink-0" />
                    <span className="font-semibold">Date:</span>
                    <span>{formattedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock size={16} className="text-red-400 flex-shrink-0" />
                    <span className="font-semibold">Time:</span>
                    <span>{formattedTime}</span>
                </div>
            </div>

            {/* 3. Rating/Review Section */}
            {isCompleted && (
              <div className="mt-5 pt-4 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Your Feedback</h4>
                
                {existingRating ? (
                  // Display Existing Review
                  <div className="space-y-3">
                    <p className="text-base font-bold text-blue-800 bg-blue-50/70 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                      <Star size={18} className="text-yellow-500 fill-yellow-500" /> 
                      Rated: 
                      <span className="text-blue-900 font-extrabold">{existingRating.rating}</span>
                      /5
                    </p>

                    {existingRating.comment && (
                      <p className="text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg flex items-start gap-2">
                        <MessageSquare size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                        <span className="font-semibold">Comment:</span>
                        <span>{existingRating.comment}</span>
                      </p>
                    )}
                  </div>
                ) : (
                  // New Review Form
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Rating (1-5)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={ratings[item._id] || ""}
                        onChange={(e) => handleRatingChange(e, item._id)}
                        placeholder="e.g., 5"
                        className="w-full sm:w-20 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-800 text-center font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={comment}
                        onChange={onChange}
                        name="comment"
                        placeholder="Optional comment (e.g., Great service!)"
                        className="flex-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <button
                      className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 mt-2"
                      onClick={() =>
                        handleSubmitRating(
                          item._id,
                          item.status,
                          item.providerId._id,
                          comment
                        )
                      }
                    >
                      Submit Review
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Message/Error Display */}
            {message && (
              <p className={`mt-4 text-sm font-medium italic ${message.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}>
                {message}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}