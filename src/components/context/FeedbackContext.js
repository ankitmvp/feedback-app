import { useEffect } from 'react';
import { createContext, useState } from 'react';

const FeedbackContext = createContext();
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch(`/feedback`);
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete the item?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = async (newFeedback) => {
    const response = await fetch(`/feedback`, {
      method: 'POST',
      body: JSON.stringify(newFeedback),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  const editFeedback = (item) => {
    setFeedbackEdit({ item: item, edit: true });
  };

  const updateFeedback = async (id, item) => {
    const response = await fetch(`/feedback/${id}`,{
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        'Content-Type':'application/json'
      }
    })
    const data = await response.json();
    setFeedback(
      feedback.map((i) => (i.id === id ? { ...feedback, ...data } : i))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
export default FeedbackContext;
