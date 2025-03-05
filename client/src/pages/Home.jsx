import React, { useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    console.log(count);
  };

  return <button onClick={handleClick}>Click me</button>;
};

export default Home;
