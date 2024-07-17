import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import {MediumText, SmallText} from './AppText';
import {FC} from 'react';
import {FieldError} from 'react-hook-form';
import {APP_COLORS} from '../../../lib/constants';
interface INormalInput extends TextInputProps {
  label: string;
  error: FieldError | undefined;
}
export const NormalInput: FC<INormalInput> = ({error, label, ...props}) => (
  <View style={{gap: 5}}>
    <MediumText textStyle={{...styles.text, color: error ? 'red' : 'black'}}>
      {label}
    </MediumText>
    <TextInput
      placeholderTextColor="#ccc"
      style={{
        ...styles.input,
        borderColor: error ? 'red' : APP_COLORS.input,
      }}
      {...props}
    />
    {error ? (
      <SmallText
        style={{
          color: 'red',
        }}>
        {error.message}
      </SmallText>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    backgroundColor: APP_COLORS.input,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    color: APP_COLORS.black,
  },
  text: {
    fontWeight: 'bold',
  },
});
