import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  children: ReactNode;
}

export default function TitledComponent({ title, children }: Props) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
});
