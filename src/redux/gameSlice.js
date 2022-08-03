import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCountries = createAsyncThunk(
    'game/getCountries',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("https://restcountries.com/v3.1/all");
            const countries = await res.json();
            return countries;
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const generateChoices = (state) => {
    state.choices = state.choices.map((_, i) => {
        let country = state.countries[Math.floor(Math.random() * state.countries.length)];
        country.guessed = false;
        if (i === 0) {
            state.answer = country;
        }
        return country;
    });
    state.choices.sort(() => 0.5 - Math.random());
};

const gameSlice = createSlice({
    name: "game",
    initialState: {
        countries: [],
        choices: [null, null, null, null],
        answer: null,
        streak: 0,
        highest: 0,
        loading: false
    },
    reducers: {
        chooseCountry: (state, action) => {
            if (state.choices[action.payload].name.common === state.answer.name.common) {
                state.streak++;
                state.highest = Math.max(state.highest, state.streak);
                generateChoices(state);
            }
            else {
                state.streak = 0;
                state.choices[action.payload].guessed = true;
            }
        }
    },
    extraReducers: {
        [getCountries.pending]: (state) => {
            state.loading = true;
        },
        [getCountries.fulfilled]: (state, action) => {
            state.loading = false;
            state.countries = action.payload;
            generateChoices(state);
        },
        [getCountries.rejected]: (state, action) => {
            state.loading = false;
            console.log(action.error);
        }
    }
});

export const { chooseCountry } = gameSlice.actions;

export default gameSlice.reducer;