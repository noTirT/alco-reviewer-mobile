import ButtonContainer from '@/components/reviewGeneration/ButtonContainer';
import StepIndicator from '@/components/reviewGeneration/StepIndicator';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StepData {
  title: string;
}

const stepData: Record<string, StepData> = {
  '1': {
    title: 'Choose location',
  },
  '2': {
    title: 'Choose drink',
  },
  '3': {
    title: 'Review selection',
  },
};

export default function CreateReviewScreen() {
  const totalSteps = 3;
  const [step, setStep] = useState(1);

  function handleNext() {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  }

  function handlePrev() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.stepTitle}>{stepData[step.toString()].title}</Text>
        <StepIndicator currentStep={step} totalSteps={totalSteps} />
      </View>
      <ButtonContainer
        currentStep={step}
        totalSteps={totalSteps}
        onBack={handlePrev}
        onNext={handleNext}
        onDone={handleNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  topBar: {
    gap: 20,
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 16,
  },
});
