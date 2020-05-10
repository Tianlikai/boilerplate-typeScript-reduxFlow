import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("jason");

  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    console.log("useEffect count");
    document.title = `You clicked ${count} times`;
    return () => {
      console.log("unMount count");
    };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>You name is {name} </p>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}

export default Example;
