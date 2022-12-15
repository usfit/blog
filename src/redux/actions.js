export const setIsError = (error) => ({ type: 'SET_IS_ERROR', ...error });

export const setIsLoading = (isLoading) => ({ type: 'SET_IS_LOADING', isLoading });

export const setUser = (user) => ({ type: 'SET_USER', user });

export const deleteUser = () => ({ type: 'DELETE_USER' });

export const setLog = (isLog) => ({ type: 'SET_LOG', isLog });
