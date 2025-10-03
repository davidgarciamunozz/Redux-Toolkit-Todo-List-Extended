# Todo List con Redux Toolkit

Aplicación simple de Todo List que demuestra el uso de Redux Toolkit para gestión de estado global.

## Estructura Redux

### Store Setup
```typescript
// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer
  }
});
```

### Estado y Acciones
```typescript
// store/todosSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: { todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    }
  }
});
```

## Uso en Componentes

```typescript
// Acceder al estado
const todos = useAppSelector(state => state.todos.todos);

// Despachar acciones
const dispatch = useAppDispatch();
dispatch(addTodo("Nueva tarea"));
dispatch(toggleTodo(id));
dispatch(deleteTodo(id));
```

## Beneficios de Redux Toolkit
- Estado centralizado y predecible
- Evita prop drilling
- Fácil de escalar y mantener
- Herramientas de desarrollo potentes

## Tecnologías
- React + TypeScript
- Redux Toolkit
- Vite