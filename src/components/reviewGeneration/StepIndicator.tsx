import { StyleSheet, Text, View } from 'react-native';
interface Props {
  totalSteps: number;
  currentStep: number;
}
export default function StepIndicator({ totalSteps, currentStep }: Props) {
  const indicators = [];

  for (let i = 1; i <= totalSteps; i++) {
    indicators.push(
      <View key={i} style={styles.stepContainer}>
        <View
          style={[styles.stepIndicator, i <= currentStep && styles.activeStep]}
        >
          <Text
            style={[styles.stepText, i <= currentStep && styles.activeStepText]}
          >
            {i}
          </Text>
        </View>
        {i < totalSteps && (
          <View style={[styles.line, i < currentStep && styles.activeLine]} />
        )}
      </View>,
    );
  }

  return <View style={styles.indicatorContainer}>{indicators}</View>;
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E7E7E7',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    borderColor: 'pink',
    backgroundColor: 'pink',
  },
  stepText: {
    color: '#E7E7E7',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeStepText: {
    color: 'white',
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#E7E7E7',
    marginHorizontal: 10,
  },
  activeLine: {
    backgroundColor: 'pink',
  },
});
