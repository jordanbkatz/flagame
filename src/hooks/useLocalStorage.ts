import React, { useEffect, useState } from 'react';

function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } 
        catch (error) {
            return defaultValue;
        }
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
};

export default useLocalStorage;