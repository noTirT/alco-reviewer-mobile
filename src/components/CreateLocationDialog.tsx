import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateLocationDialog({ show, setShow }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={show}
      onRequestClose={() => setShow(false)}
    >
      <View style={styles.modalContainer}>
        <Text>test</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {},
});
