import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const isProductUpToFive = async () => {
  try {
    const result = await AsyncStorage.getItem('@products');
    let data;
    if (!result) {
      return false;
    }
    data = JSON.parse(result);
    if (Array.isArray(data) && data.length === 5) {
      Toast.show({
        type: 'info',
        text1: `You have reached your product upload limit of 5`,
      });
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: `Error: ${error.message}`,
    });
    return false;
  }
};
