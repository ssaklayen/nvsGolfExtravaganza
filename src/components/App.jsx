import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");

  async function handleSubmit(e) {
      e.preventDefault();
      let result = await fetch(
          "http://localhost:5000/register", {
              method: "post",
              body: JSON.stringify({ name }),
              headers: {
                  "Content-Type": "application/json"
              }
          }
      )
      result = await result.json();
      console.warn(result);
      if (result) {
          console.log("Data saved successfully");
          setName("");
      }
  };

  return (
    <div>
      <h1>Hello, Golfers!</h1>
      <h2>Please register your name below</h2>

      <form action="">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
