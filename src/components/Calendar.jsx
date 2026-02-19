import React from 'react';
import { motion } from 'framer-motion';

const Calendar = () => {
  return (
    <section>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}
      >
        <h1>Calendar</h1>
        <p>For information on specific dates, please ask your group organizer.</p>
      </motion.div>
    </section>
  );
};

export default Calendar;