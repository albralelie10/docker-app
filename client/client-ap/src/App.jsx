import { useEffect, useState } from 'react'


function App() {
  const [user, setUser] = useState({})
  const [toggle,setToggle]=useState(true)
  console.log(user?.name,user?.estado)
  
async function loadData (){
   try{
    const res =await fetch("http://localhost:3000/")
    const scums=await res.json();
    if(scums == null) return <h1>Loading...</h1>
    if(scums.length > 1 ){
      setUser(scums[1])
    }
   }catch(error){
    console.log(error)
   }

}
 useEffect(()=>{
  loadData();
 },[])


 const handleChange=(e)=>{
  const {name,value}=e.target 
  setUser({
    ...user,
    [name]:value
  })
 }
  const handleUpdate=async()=>{
    const res = await fetch(`http://localhost:3000/${user._id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    })
    const data= await res.json();
    if(data == null) return <h1>Loading...</h1>
    setUser(data);
    setToggle(true)
  }
 

 if(user == {})return <h1>Loading ....</h1>

  return (
    <>
    <div style={{width:"70%",margin:"auto auto",marginTop:"50px"}}>
    <form onSubmit={handleChange} style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
        {toggle ? <>
        <h1 style={{backgroundColor:"lightcyan",padding:"10px",textAlign:"center"}}>User Form</h1>
        <span  style={{marginBottom:"10px",borderBottom:"1px solid lightgrey",padding:"5px"}} >{user?.name ?? "Mary"}</span>
        <span  style={{marginBottom:"10px",borderBottom:"1px solid lightgrey",padding:"5px"}}  >{user?.estado ?? "Poppins"}</span>
        <button 
        style={{marginTop:"10px"}}
        onClick={(e)=>{
          e.preventDefault()
          setToggle(false)
        }}
        type="submit">Editar</button></>
        : 
        <>
        <input
        style={{marginBottom:"10px",padding:"5px"}}
        type="text"
        placeholder='add name'
        name="name"
        value={user?.name ?? "mary"}
        onChange={handleChange}
        />
        <input
        style={{marginBottom:"10px",padding:"5px"}}
        type="text"
        placeholder='add estado'
        name="estado"
        value={user?.estado ?? "poppins"}
        onChange={handleChange}
        />
        <button 
        style={{marginTop:"10px"}}
        onClick={e=>{
          e.preventDefault();
          handleUpdate()
        }}
        >Update Info</button>
        </>}
      </form>
    </div>
    </>
  )
}

export default App
