import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing,setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show: false, msg:'', type:''})

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      //alert
      showAlert(true, "danger", "Please enter some value");
    } else if(name && isEditing ) {
      //alert
      setList( list.map((item)=>{
        if(item.id === editID){
          return {...item, title: name}
        }
        return item;
      }));
      setName('');
      setIsEditing(false);
      setEditID(null);
      showAlert(true, 'success', 'Items updated')
  } else {
      const newItems = {id: new Date().getTime().toString(), title:name};
      setList([...list,newItems]);
      setName('');
      showAlert(true, "success", "Items added");
      // setAlert({show:true, type:"success", msg:"Items added"});
    }
  }

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type, msg});
  }

  const clearList = () => {
    setList([]);
    showAlert(true, 'danger', 'Items Cleared')
  }

  const removeItem = (id) => {
      const newItems = list.filter( item => item.id !== id)
      setList(newItems);
      showAlert(true, 'danger', 'Items Deleted');
  }

  const editItem = (id) => {
    const specificItem = list.find( item => item.id === id);
    setIsEditing(true);
    setEditID(specificItem.id);
    setName(specificItem.title);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  },[list])
  
  return (
    <>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert alert={alert} removeAlert={showAlert} list={list}/>}
          <h3>To-DO</h3>
          <div className="form-control">
            <input className="grocery" type="text" value={name} onChange={ (e) => setName(e.target.value)} placeholder="eg.daily task"/>
            <button type='submit' className="submit-btn">{isEditing ? "edit" : "submit"}</button>
          </div>
        </form>
        {
          list.length > 0 && (
            <div className="groceery-container">
              <List items={list} removeItem={removeItem} editItem={editItem}/>
              <button className="clear-btn" onClick={clearList}>Clear Items</button>
            </div>
          )
        }
      </section>
    </>
  )
}

export default App
