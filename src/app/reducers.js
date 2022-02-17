const initialState = {
    startIndex: 0,
	books: [],
    sortBy: 'relevance',
    category: 'all',
    searchQuery: 'search+terms'
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_BOOKS':
            console.log(action.data)
            return {...state, books: [...state.books, ...action.data]} 
        case 'CHANGE_SORT':
            return {...state, sortBy: action.data.sortBy, category: action.data.category, startIndex: 0}
        case 'SEARCH_QUERY':
            return {...state, searchQuery: action.data.searchQuery}
        default:
            return state
    }
}