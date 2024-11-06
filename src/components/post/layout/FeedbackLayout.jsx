import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaComment, FaClock } from 'react-icons/fa';

const FeedbackLayout = ({ newsId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing feedbacks
  useEffect(() => {
    fetchFeedbacks();
  }, [newsId]);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`/api/feedbacks?newsId=${newsId}`);
      const data = await response.json();
      setFeedbacks(data.feedbacks || []);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setError('Failed to load comments');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !newComment.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newsId,
          userName: userName.trim(),
          comment: newComment.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      // Clear form and refresh feedbacks
      setNewComment('');
      await fetchFeedbacks();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 mb-8">
      <h2 className="text-4xl font-bold mb-8 text-center">Reader Comments</h2>
      
      {/* Comment Form */}
      <motion.form 
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 font-semibold mb-2">
            Your Comment
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Share your thoughts..."
            required
          />
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit Comment'}
        </button>
      </motion.form>

      {/* Comments List */}
      <div className="space-y-4">
        {feedbacks.map((feedback, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 rounded-full p-2 text-white mr-3">
                <FaUser />
              </div>
              <div>
                <h3 className="font-bold text-lg">{feedback.userName}</h3>
                <div className="text-gray-500 text-sm flex items-center">
                  <FaClock className="mr-1" />
                  {new Date(feedback.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
            <p className="text-gray-700">{feedback.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackLayout; 