import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {Product} from '../../types/product.types';

export default function useGetMyProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getProducts = async () => {
    setLoading(true);
    try {
      const result = await AsyncStorage.getItem('@products');

      if (!result) {
        setLoading(false);

        return;
      }
      const convertedData: Product[] = JSON.parse(result);
      if (Array.isArray(convertedData)) {
        setLoading(false);
        console.log(convertedData);
        setData(() => [...convertedData]);
      }
    } catch (error: any) {
      setLoading(false);

      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    data,
    getProducts,
    loading,
  };
}
