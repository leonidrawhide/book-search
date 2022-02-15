const initialState = {
    startIndex: 0,
	books: [],
    sortBy: 'relevance',
    category: 'all'
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_BOOKS':
            console.log(action.data)
            return {...state, books: [...state.books, ...action.data]} 
        default:
            return state
    }
}