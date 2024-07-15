import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TitledComponent from './TitledComponent';

interface Data {
  name: string;
  id: string;
}

interface Props {
  placeholder: string;
  data: Data[];
  iconName?: any;
  title?: string;
  disabled?: boolean;
  value: string;
  onChange: (newValue: string) => void;
}

export default function AutocompleteInput({
  placeholder,
  data,
  iconName,
  title,
  disabled,
  value,
  onChange,
}: Props) {
  const [input, setInput] = useState<Data>({
    name: data.filter((d) => d.id === value)[0]?.name || '',
    id: value,
  });
  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidHide', () =>
      setShowKeyboard(false),
    );

    return () => {
      showSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (value === '') {
      setInput({
        name: data.filter((d) => d.id === value)[0]?.name || '',
        id: value,
      });
    }
  }, [value]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(input.name.toLowerCase()),
    );
  }, [input]);

  const renderList = useMemo(
    () => showKeyboard && filteredData.length > 0,
    [showKeyboard, filteredData],
  );

  function handleSelection(item: Data) {
    setInput(item);
    onChange(item.id);
    setShowKeyboard(false);
  }

  function handleUnfocus() {
    const possibleData = data.filter((item) => item.name === input.name);
    if (possibleData.length === 1) {
      onChange(possibleData[0].id);
    }
    setShowKeyboard(false);
  }

  return (
    <TitledComponent title={title || ''}>
      <View
        style={[
          styles.autocompleteInput,
          {
            borderBottomRightRadius:
              renderList && filteredData.length > 0 ? 0 : 10,
            borderBottomLeftRadius:
              renderList && filteredData.length > 0 ? 0 : 10,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {iconName != undefined && <Ionicons size={30} name={iconName} />}
        <TextInput
          style={{ width: '100%' }}
          placeholder={placeholder}
          onChangeText={(newInput) =>
            setInput((currInput) => ({ ...currInput, name: newInput }))
          }
          value={input.name}
          onFocus={() => setShowKeyboard(true)}
          onSubmitEditing={handleUnfocus}
          editable={!disabled}
        />
      </View>
      {renderList && (
        <FlatList
          style={[styles.optionsList, { maxHeight: filteredData.length * 25 }]}
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelection(item)}
              style={styles.optionItem}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </TitledComponent>
  );
}

const styles = StyleSheet.create({
  optionItem: {
    padding: 5,
    paddingLeft: 20,
    width: '90%',
  },
  optionsList: {
    backgroundColor: '#fff',
    width: '90%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  autocompleteInput: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    gap: 15,
    padding: 5,
    borderRadius: 10,
  },
});
