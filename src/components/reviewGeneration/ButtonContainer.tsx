import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onDone: () => void;
}
export default function ButtonContainer({
  currentStep,
  totalSteps,
  onBack,
  onDone,
  onNext,
}: Props) {
  return (
    <View style={styles.buttonContainer}>
      {currentStep > 1 && (
        <TouchableOpacity
          onPress={onBack}
          style={[styles.button, styles.backButton]}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
      {currentStep < totalSteps ? (
        <TouchableOpacity
          onPress={onNext}
          style={[styles.button, styles.nextButton]}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onDone}
          style={[styles.button, styles.nextButton]}
        >
          <Text style={styles.nextButtonText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  backButton: {
    backgroundColor: '#E7E7E7',
    marginRight: 10,
  },
  backButtonText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: 'pink',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
