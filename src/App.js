import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState,useEffect } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem"
import apiRequest from "./apiRequest";
function App() { 
  const APIURL='http://localhost:3500/items';
  const [items,setItems]=useState([]);
  
  const [newItem,setNewItem]=useState('')
  const [search,setSearch]=useState('')
  const [fetchError,setFetchError]=useState(null)
  const [isLoading,setIsLoading]=useState(true);
    useEffect(()=>{
      const fetchItems=async()=>{
        try{
          const res=await fetch(APIURL);
          if(!res.ok) throw Error("not received");
          const listItems=await res.json();
          console.log(listItems)
          setItems(listItems)
          setFetchError(null)
        }catch(err){
          setFetchError(err.message)
        }
        finally{
          setIsLoading(false);
        }
      }
      setTimeout(()=>{
      (async ()=>await fetchItems())()
      },2000);
},[])

    const addItem=async(item)=>{
      const id=items.length?items[items.length-1].id+1:1;
      const addNewItem={id,checked:false,item}
      const listItems=[...items,addNewItem]
      setItems(listItems)
      localStorage.setItem("todo_list",JSON.stringify
        (listItems)
      )
    
    const postOptions={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(addNewItem)
    }
    const result=await apiRequest(APIURL,postOptions);
    if(result) setFetchError(result)
  }
    const handlecheck=async(id)=>{
        const listItems=items.map((item)=>
        item.id===id?{...item,checked:!item.checked}:item)
        
    setItems(listItems)
    const myItem=listItems.filter((item)=>item.id
  ===id)
  const updateOptions={
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({checked:myItem[0].checked})
  }
  const requrl=`${APIURL}/${id}`

  const result=await apiRequest(requrl,updateOptions);
  if(result) setFetchError(result)
    }
    const handledelete=async(id)=>{
        const listItems=items.filter((item)=>
        item.id!==id)
        setItems(listItems)
       
        const deleteOptions={
          method:'DELETE'
        }
        const requrl=`${APIURL}/${id}`
        const result=await apiRequest(requrl,deleteOptions);
        if(result) setFetchError(result)
          
    }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('submitted')
    if(!newItem)return;
    console.log(newItem)
    addItem(newItem)
    setNewItem('')
  } 
  return (
    <div className="App"> 
     <Header title="To Do List"/>
     <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
    />
    <SearchItem
    search={search}
    setSearch={setSearch}
    />
    <main>
      {isLoading && <p>Loading items...</p>}
      {fetchError &&<p>{`Error:${fetchError}`}</p>}
     {!isLoading && !fetchError &&<Content 
        items={items.filter((item)=>(item.item).
        toLowerCase().includes(search.toLowerCase()))}
        handlecheck={handlecheck}
        handledelete={handledelete}/>}
    </main>
     <Footer 
      length={items.length}
      />
    </div>
  );
} 

export default App;
  