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
      const localValue = localStorage.getItem("list"); //"list" is the name of the item storing the "tasks"
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
  const [editTitle, setEditTitle] = useState("");
  const [editDes, setEditDes] = useState("");

  //this useEffect handler runs whenever a change is made to the "list" array
  useEffect(() => {
    if(typeof window !== 'undefined') { //if-branch encloses original code to fix localStorage not defined
      localStorage.setItem("list", JSON.stringify(list))
      //console.log("HERE1"); //test check color
    }
  }, [list])

  //this useEffect handler runs whenever a task is maked "complete" or "incomplete" 
  useEffect(() => {
    if(typeof window !== 'undefined') { //if-branch encloses original code to fix localStorage not defined
      localStorage.setItem("list", JSON.stringify(list))
      //console.log("HERE2"); //test check color
      console.log(list); //test check color
    }
  }, [check])
  // console.log(JSON.parse(localStorage.getItem("list")));
  // if(JSON.parse(localStorage.getItem("list")) !== null)
  //   setList(JSON.parse(localStorage.getItem("list")));

  /*
  this function takes the todo task from input box on website,
  creates a todo object
  adds an item to the list useState
  finally clears the name and des fields in the input box
  */
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

  /*For the selected task to be deleted the ID is saved
  The program then creates a new list including all the tasks that don't have the ID of the deleted task
  */
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

  const handleUpdateTitle = (value) => {
    setEditTitle( (prev) => {
      console.log(prev);
      return {...prev,name:value}
    })
  };

  const handleUpdateDescription = (value) => {
    setEditDes( (prev) => {
      return {...prev,description:value}
    })
  };



  return ( <>
  {/*This first div contains the input box at the top of the website
  This only concerns adding a todo task
  */}
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
  
  {/*This ul htmlElement diplays the list of todo tasks*/}
  <ul>
    {
      //for each "todo task" in "list" array, display the task, display differently for edit mode
      list.map( (todo) => { 
        if(currentEdit.id === todo.id) 
        {
          return (<>
            <li key={todo.id} className="todo-container">
              <input className="todo-edit-title" placeholder="Type new title here" onChange={e => handleUpdateTitle(e.target.value)} value={currentEdit.name}/>
              <textarea className="todo-edit-description" placeholder="Type new description here" value={currentEdit.description} rows={5} onChange={e => handleUpdateDescription(e.target.value)}/>
              <div className="todo-buttons-container">
                <button>Update</button>
              </div>
            </li>
          </>)
        }

        else 
        {
          return(<>
            {/*Code to display a task: name, des; buttons: complete, edit, delete*/}
            <li key={todo.id} className="todo-container">
              <div className="todo-title">       {todo.name}        </div>
              <div className="todo-description"> {todo.description} </div>
              <div className="todo-buttons-container">

                {/*console.log(todo.complete)*/}
                <button id={"check" + todo.id} onClick={() => completeTodo(todo.id)} className={todo.complete.toString()}> <IoMdCheckmark /> </button>
                <button id={"edit" + todo.id}onClick={() => setCurrentEdit(todo)} className="todo-buttons"> <MdEdit /> </button>
                <button onClick={() => deleteTodo(todo.id)} className="todo-buttons"><FaRegTrashAlt /></button>
                
              </div>
            </li>
          </>)
        }
      })
    }
  </ul>

  {/*This final div displays the clear button*/}
  <div className="clear-center">
    <div></div>
    <div>
      <button className="todo-clear-button" onClick={() => clearAll()}>Clear All Data</button>
    </div>
    
  </div>

  </>);
}