import FeedbackItem from './FeedbackItem';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import FeedbackContext from './context/FeedbackContext';
import { FaSpinner } from 'react-icons/fa';

function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext);

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No feedback found.</p>;
  }
  return (
    <>
      {isLoading ? (
        <FaSpinner size={100} />
      ) : (
        <div className='feedback-list'>
          <AnimatePresence>
            {feedback.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FeedbackItem key={item.id} item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default FeedbackList;
