'use client';

import { useState } from "react";

export default function List() {
  const [list, setList] = useState("");

  function daily(formData : any) {
    const task = formData.get("task");
    //alert(`You searched for '${task}'`);
    setList(task);
  }
  return ( <>
    <p>{list}</p>
    <form action={daily}>
      <input name="task" />
      <button type="submit">Search</button>
    </form>
  </>);
}