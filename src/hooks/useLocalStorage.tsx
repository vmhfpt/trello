import { useState } from 'react';


type StoredValue<T> = T | undefined;


function useLocalStorage<T>(key: string, initialValue?: T): [StoredValue<T>, (value: T) => void] {

  const storedValue: StoredValue<T> = (() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error retrieving data from local storage: ${error}`);
      return initialValue;
    }
  })();


  const [value, setValue] = useState<StoredValue<T>>(storedValue);


  const updateValue = (newValue: T) => {
    try {
    
      window.localStorage.setItem(key, JSON.stringify(newValue));
   
      setValue(newValue);
    } catch (error) {
      console.error(`Error updating data in local storage: ${error}`);
    }
  };

  return [value, updateValue];
}



export default useLocalStorage;
