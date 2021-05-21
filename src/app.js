const mongoose = require('mongoose');

const express = require('express');
const multer = require('multer');
const path = require('path');


const DB = `mongodb+srv://abhishek:12345@cluster0.4qpkg.mongodb.net/videolink?retryWrites=true&w=majority`;

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log(`connection successful`);
}).catch((err) => console.log(`no coonection`));




const getIframe = (url) =>{
    let _url =  url.split('=')[1];
return `<iframe src='https://www.youtube.com/embed/${_url}' ></iframe>`    
}
console.log(getIframe('https://www.youtube.com/watch?v=68Jd7GXZPe8'))




// Set storage Engine
const storage = multer.diskStorage({
    destination: './src/Config/document',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload 
const upload = multer({
    storage: storage,
    limit:{fileSize: 1000000},
});


//Init app
const app = express();


// applicationCache.post('/admin/videoUpload',(req,res)=>{
//     let url = req.body.split('=')[1];
//  res.status(200).send({status:true});




app.post('/upload',upload.array('image'),(req, res) => {
    
    res.send('test');
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));