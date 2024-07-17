import {FC} from 'react';
import {Text, TextProps} from 'react-native';
interface IText extends TextProps {
  textStyle?: any;
}
export const SmallText: FC<IText> = ({...props}) => (
  <Text style={{color: 'black', fontSize: 12, ...props.textStyle}} {...props} />
);

export const MediumText: FC<IText> = ({...props}) => (
  <Text style={{color: 'black', fontSize: 14, ...props.textStyle}} {...props} />
);
