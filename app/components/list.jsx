'use client';

import { useState } from "react";

export default function List() {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(),
      todo: todo,
    };

    //add the todo to the list
    setList([...list, newTodo]);

    //clear input box
    setText("");
    //console.log(list);
  };


  return ( <>
    <input 
    type="text" 
    value={text} 
    onChange={e => setText(e.target.value)}
    />
    <button onClick={() => addTodo(text)}>Add</button>

    <ul>
      {
        list.map( (todo) => { 
        <li key={todo.id}>
          {todo.todo}
        </li>})
      }
    </ul>
  </>);
}