export const storeTodosInLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};