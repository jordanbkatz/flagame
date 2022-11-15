import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialState) => {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);
        const initial = JSON.parse(saved);
        return initial || initialState;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
};

export default useLocalStorage;