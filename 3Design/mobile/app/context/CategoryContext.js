import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CategoryContext = createContext({
  categories: [],
  loading: true,
  error: null,
});

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.accessToken) {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(
            `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/categories`,
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          const transformedCategories = response.data.map((category) => ({
            label: category.name,
            value: category.id,
          }));
          setCategories(transformedCategories);
          setLoading(false);
        } catch (err) {
          setError('Failed to load categories');
          setLoading(false);
        }
      };

      fetchCategories();
    }
  }, [user?.accessToken]);

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
