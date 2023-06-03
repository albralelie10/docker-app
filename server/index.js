const express=require("express")
const app=express();
const mongoose=require("mongoose")
const PORT=3000
const cors=require("cors")

const Slut= mongoose.model("Slut",new mongoose.Schema({
    name:String,
    estado:String
}))

mongoose.connect("mongodb://yosaba:9988@mon:27017/mySlutDB?authSource=admin")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/",async(req,res)=>{
    console.log("listando....")
    const scums=await Slut.find()
    if(!scums)return res.status(400).send("no data...") 
    return res.status(200).json(scums)
});

app.get("/add",async(req,res)=>{
    await Slut.create({name:"Yosaba",estado:"Dirty"})
    return res.send("ok")
});

app.put("/:id",async (req,res)=>{
    console.log("actualizando....")
    console.log(req.body)
    console.log(req.params.id)
    const slut= await Slut.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!slut)return res.status(400).send("empty...")
    return res.status(200).json(slut)
})

app.listen(PORT,()=>console.log("runnig server...."))

