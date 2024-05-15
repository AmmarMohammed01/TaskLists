'use client';
//https://react.dev/reference/react-dom/components/input
//https://react.dev/reference/react-dom/components/form
import { useState } from "react";

export default function List() {
  const [list, setList] = useState("");

  return (
    <>
      <p>{list}</p>
      <input placeholder="Type Time and Task Here" onChange={e => setList(e.target.value)}></input>
      <button>Submit</button>
    </>
  );
}