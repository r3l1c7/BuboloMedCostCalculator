// src\components\SearchBar.js
import React, { useState,useRef } from 'react';
import { useCombobox } from 'downshift';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [medications, setMedications] = useState([]);
  const inputRef = useRef(null);
  const fetchMedications = async (searchQuery) => {
    const response = await fetch(`/api/medications?searchQuery=${searchQuery}`);
    const data = await response.json();
    setMedications(data);
  };
  const handleInputFocus = () => {
    setInputValue('');
    setComboboxInputValue('');
    setMedications([]);
  };
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    setInputValue: setComboboxInputValue,
  } = useCombobox({
    inputValue,
    items: medications,
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue);
      fetchMedications(inputValue);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onSearch(selectedItem);
      setComboboxInputValue(selectedItem.Medication);
    },
  });

  return (
    <div className="relative">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Prescription</CardTitle>
          <CardDescription>

          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <input
              {...getInputProps({
                type: 'text',
                placeholder: 'Search medications...',
                className:
                  'w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                ref: inputRef,
                onFocus: handleInputFocus,
              })}
            />
            <ul
              {...getMenuProps()}
              className={`${isOpen ? 'block' : 'hidden'
                } absolute z-10 w-full py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-lg`}
            >
              {isOpen &&
                Array.isArray(medications) &&
                medications.map((medication, index) => (
                  <li
                    key={medication.Medication}
                    {...getItemProps({
                      item: medication,
                      index,
                    })}
                    className={`px-4 py-2 cursor-pointer ${highlightedIndex === index ? 'bg-blue-100' : ''
                      }`}
                  >
                    {medication.Medication}
                  </li>
                ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>

  );
};

export default SearchBar;