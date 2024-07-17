import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import CreateProductScreenLayout from '../components/create-product/CreateProductScreenLayout';
import {useNavigation} from '@react-navigation/native';
import {List} from 'lucide-react-native';
import {APP_COLORS} from '../../lib/constants';
import {ProductListScreenName} from './ProductListScreen';

type Props = {};
export const CreateProductScreenName = 'Create Product';
const CreateProductScreen = (props: Props) => {
  const navigation: any = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ProductListScreenName);
            }}>
            <List color={APP_COLORS.button} size={25} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <CreateProductScreenLayout />
    </SafeAreaView>
  );
};

export default CreateProductScreen;
