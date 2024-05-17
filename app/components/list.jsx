'use client';

import { use, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import "./task.css";
import "./inputhead.css";

export default function List() {
  const [list, setList] = useState(() => {
    if(typeof window !== 'undefined') { //Handles localStorage not defined, 3 lines below are old code
      const localValue = localStorage.getItem("list");
      if(localValue == null) return [];

      //console.log(JSON.parse(localValue)); //test check color
      return JSON.parse(localValue);
    }
    else { //Handles localStorage not defined
      return [];
    }
    
  });
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [check, setCheck] = useState(0);
  const [currentEdit, setCurrentEdit] = useState("");

  useEffect(() => {
    if(typeof window !== 'undefined') { //if branch around original code to fix localStorage not defined
      localStorage.setItem("list", JSON.stringify(list))
      console.log("HERE1"); //test check color
    }
  }, [list])

  useEffect(() => {
    if(typeof window !== 'undefined') { //if branch around original code to fix localStorage not defined
      localStorage.setItem("list", JSON.stringify(list))
      console.log("HERE2"); //test check color
      console.log(list); //test check color
    }
  }, [check])
  // console.log(JSON.parse(localStorage.getItem("list")));
  // if(JSON.parse(localStorage.getItem("list")) !== null)
  //   setList(JSON.parse(localStorage.getItem("list")));

  const addTodo = (name, description) => {
    const newTodo = {
      id: Math.random(),
      name: name,
      description: description,
      complete: false,
    };

    //add the todo to the list
    setList([...list, newTodo]); //the ... spreads out the elements of list so that it is like [todo1, todo2, todo3, ... , newTodo]. Without the ... we would have [[todo1, todo2, ...], newTodo]

    //clear input box
    setName("");
    setDes("");
    //console.log(list);
  };

  const deleteTodo = (id) => {
    //filter out todo with the id
    const newList = list.filter((todo) => todo.id !== id);

    setList(newList);
  };

  const completeTodo = (id) => {
    const index = list.indexOf(list.find((element) => element.id == id));
    if (list[index].complete === false) {
      list[index].complete = true;
      setCheck(check + 1);
      console.log(list[index].name + " is complete: " + list[index].complete);
      document.getElementById("check" + id).style["background-color"] = "rgb(20,200,20)";
      //console.log(list);
      //setList(list);
    } else {
      list[index].complete = false;
      setCheck(check + 1);
      console.log(list[index].name + " is complete: " + list[index].complete);
      document.getElementById("check" + id).style["background-color"] = "azure";
      //setList(list);
    }
  };

  const clearAll = () => {
    setList([]);
  };

  const renameTodo = (id) => {
    // if(document.getElementById("edit" + id).style["background-color"] == "azure")
    //   document.getElementById("edit" + id).style["background-color"] = "red";
    // else
    //   document.getElementById("edit" + id).style["background-color"] = "azure";

  };

  return ( <>
  <div className="input-container">
    <input 
    type="text" 
    value={name} 
    onChange={e => setName(e.target.value)}
    placeholder="Type task name..."
    className="todo-input js-name"
    onKeyDown={(e) => {if(e.key === "Enter") {addTodo(name, des)} }}/>
    <input type="text" value={des} onChange={e => setDes(e.target.value)} placeholder="Type task description..." className="todo-input js-des" onKeyDown={(e) => {if(e.key === "Enter") {addTodo(name, des)} }}/>
    <button onClick={() => addTodo(name, des)} className="todo-add-button">Add</button>
  </div>

  <ul>
    {
      list.map( (todo) => { 
        if(currentEdit === todo.id) {
          return (<>
          <p>hi</p>
          </>)
        }
        else {
          return(<>
            <li key={todo.id} className="todo-container">
              <div className="todo-title">
                {todo.name}
              </div>
              <div className="todo-description">
                {todo.description}
              </div>
              <div className="todo-buttons-container">
                <button id={"edit" + todo.id}onClick={() => setCurrentEdit(todo.id)} className="todo-buttons"><MdEdit /></button>
                <button onClick={() => deleteTodo(todo.id)} className="todo-buttons"><FaRegTrashAlt /></button>
                {/*console.log(todo.complete)*/}
                <button id={"check" + todo.id} onClick={() => completeTodo(todo.id)} className={todo.complete.toString()}><IoMdCheckmark /></button>
              </div>
            </li>
          </>)
        }
      })
    }
  </ul>

  <div className="clear-center">
    <div></div>
    <div>
      <button className="todo-clear-button" onClick={() => clearAll()}>Clear All Data</button>
    </div>
    
  </div>
  </>);
}