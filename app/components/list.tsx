'use client';
import { useState } from "react";

export default function List() {
  const [list, setList] = useState();

  return (
    <>
      <input placeholder="Type Time and Task Here"></input>
      <button>Submit</button>
    </>
  );
}