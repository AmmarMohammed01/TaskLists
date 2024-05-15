'use client';
//https://react.dev/reference/react-dom/components/input
//https://react.dev/reference/react-dom/components/form
import { useState } from "react";

export default function List() {
  const [list, setList] = useState("");

  function daily(formData : any) {
    const task = formData.get("task");
    //alert(`You searched for '${task}'`);
    setList(task);
    console.log(list);
  }
  return ( <>
    <p>{list}</p>
    <form action={daily}>
      <input name="task" />
      <button type="submit">Search</button>
    </form>
  </>);
}