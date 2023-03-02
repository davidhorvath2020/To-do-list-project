import { useState } from 'react';
import { useEffect } from 'react';


function App() {

  const [darkMode, setDarkMode] = useState(false);

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []);
  const [style, setStyle] = useState("CorrectInput")  


  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  function SetTheDarkMode() {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

  function addItem() {
    if (!newItem) {
      setStyle("Incorrectinput");
      return;
    }
    
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    setItems((oldList) => [...oldList, item]);

    setNewItem("");
  }

  function deleteItem(id) {
    const newArray = items.filter((x) => x.id !== id);
    setItems(newArray);
  }

  function deleteAll () {
    setItems([])
  } 

  return (
    <div className={darkMode ? "App" : "App Dark"}>
      <button className='DarkModeButton'
        onClick={SetTheDarkMode}>
        {darkMode ? "Dark" : "Light"}
      </button>
      <div className='Todo--Container'>
        <h1>THINGS TO DO</h1>
        <h1>Add a new item to do</h1>
        <input
          type="text"
          placeholder="Add an item..."
          value={newItem}
          onChange={(e) =>{setNewItem(e.target.value); setStyle("CorrectInput")}}
          className = {style}
        />
        <div className='AddItems--Button-Counter'>
          <button onClick={() => addItem()} className="AddItemsButton">Add</button>
          <button onClick={deleteAll} className='DeleteAllButton'>Delte all</button>
          <br/>
          <span>You have {items.length} task to do</span>
        </div>
      </div>

      <div className='AddedTodo--Container'>
        <ul>
          {items.map((x) => {
            return (
              <div>
                <li key={x.id} >
                  <input type="checkbox"
                    name='CheckBox'
                  />
                  {x.value}
                  <button
                    className="delete-button"
                    onClick={() => deleteItem(x.id)}
                  >
                    ❌
                  </button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>

    </div>
  )
}

export default App;

