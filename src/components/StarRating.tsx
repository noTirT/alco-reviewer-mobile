import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface Props {
  rating: number;
  size: number;
  editable?: boolean;
  onChange?: (newRating: number) => void;
}

export default function StarRating({
  rating,
  size,
  editable = false,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => {
        const starPosition = index + 1;
        const child = (
          <View key={starPosition}>
            <Ionicons
              name={starPosition <= rating ? 'star' : 'star-outline'}
              size={size}
              color="#FFD700"
            />
          </View>
        );
        return editable && onChange !== undefined ? (
          <TouchableWithoutFeedback
            key={starPosition}
            onPress={() => onChange(starPosition)}
          >
            {child}
          </TouchableWithoutFeedback>
        ) : (
          child
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
