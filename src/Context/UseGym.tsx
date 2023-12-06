// useGym.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useGym = () => {
  const [gymExists, setGymExists] = useState(true); // Assume gym exists initially
  const navigate = useNavigate();

  useEffect(() => {
    const checkGyms = async () => {
      try {
        const gyms = await getGyms(); // Fetch gyms from API
        if (gyms.length === 0) {
          setGymExists(false);
          navigate('/create-gym');
        } else {
          localStorage.setItem('gymData', gyms[0].id);
          setGymExists(true);
        }
      } catch (error) {
        // Handle error
        console.error(error.message);
        
      }
    };

    checkGyms();
  }, [navigate]);

  return { gymExists };
};

export default useGym;
