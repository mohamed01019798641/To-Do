import { useEffect, useRef } from 'react'
import todo_icon from '../assets/todo_icon.png'
import Todoitem from './Todoitem'
import { useState } from 'react';

function Todo() {
    const [todolist,settodolist]=useState(localStorage.getItem('todos')?JSON.parse(localStorage.getItem('todos')):[]);
    const inputref= useRef();

    const add =()=>{
     const inputext=  inputref.current.value.trim();
     if(inputext ===''){
        return null
     }
     const newtodo={
        id:Date.now(),
        text:inputext,
        isComplete:false,

     }
     settodolist((prev)=>[...prev,newtodo]);
     inputref.current.value='';
    }



    {/*-----delet---*/}

    const deletetodo =(id)=>{
        settodolist((prvtodo)=>{
        return  prvtodo.filter((todo)=> todo.id !==id )
                
           
        })


    }

    
    {/*---toggle---*/}

     const toggle =(id)=>{
        settodolist((prevtodo)=>{
            return prevtodo.map((todo)=>{
                if(todo.id ===id){
                    return {...todo,isComplete:!todo.isComplete}
                }
                return todo;
            })
        })
     }


     {/* ---localStorage---*/}

     useEffect(()=>{
      localStorage.setItem('todos', JSON.stringify(todolist))
     },[todolist])





  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col
    pt-7 min-h-[550px] rounded-xl px-7 ">
   
      {/*------title---*/}
      <div className="flex items-center mt-7 gap-2 ">
        <img src={todo_icon} alt="" className='w-8'/>
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>


      {/*------input box---*/}
       
       <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputref} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
         type="text" placeholder='Add your task' />

        <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg 
        font-medium '>ADD +</button>
       </div>

       
      {/*------todo list---*/}

      <div>
         {todolist.map((item,index)=>{
            return <Todoitem key={index} text={item.text} id={item.id} isComplete={item.isComplete} deletetodo={deletetodo} toggle={toggle}/>
         })}
       
      </div>

      
    </div>
  )
}

export default Todo
