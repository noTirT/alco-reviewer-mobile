import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

interface Props {
  iconName: any;
  size: number;
  color: string;
  onPress: () => void;
}

export default function IconButton({ iconName, size, color, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name={iconName}
        size={size}
        color={color}
        style={{ marginRight: 16 }}
      />
    </TouchableOpacity>
  );
}
