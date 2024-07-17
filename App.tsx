import React, {Fragment} from 'react';
import Toast from 'react-native-toast-message';
import CreateProductScreen, {
  CreateProductScreenName,
} from './src/screens/CreateProductScreen';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductListScreen, {
  ProductListScreenName,
} from './src/screens/ProductListScreen';

const Stack = createNativeStackNavigator();
type Props = {};

const App = (props: Props) => {
  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={CreateProductScreenName}
            component={CreateProductScreen}
          />
          <Stack.Screen
            options={{}}
            name={ProductListScreenName}
            component={ProductListScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </Fragment>
  );
};
export default App;
