const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

// Declarar dependencias para subir imagen
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err)=>{
    if(err){
        console.error('Hubo un error al conectarse con la base de datos',err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});



// Configurar almacenamiento para imagenes 
const storage = multer.diskStorage({
    // 2 funciones principales destination y filename
    // 3 parametros req, file, cb 
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    },

    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

// Crea el middleware de Multer con la configuración definida
const upload = multer({ storage })


// Servir imágenes estáticas desde "uploads"
app.use("/uploads", express.static("uploads"));


// Enpoints

app.get('/api/comentarios',(req, res)=>{
    db.query('SELECT * FROM comentarios',(err, results)=>{
        if(err){
            res.status(500).send(err);
            return;
        }
        res.json(results)
    })
});


app.post('/api/comentarios',upload.single('imagen'),(req, res)=>{
    console.log(req.body);
    console.log(req.file)
    const {rating, titulo, texto} = req.body;
    const imagen = req.file ?  `/uploads/${req.file.filename}` : null;

    db.query('INSERT INTO comentarios (img, rating, titulo, texto) VALUES(?,?,?,?)',[imagen, rating, titulo, texto],(err, results)=>{
        if(err){
            res.status(400).send(err);
            return;
        }
        res.status(200).json({message: 'datos enviados', id: results.insertId})
    })
})

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Base de datos corriendo en el puerto ${PORT}`);
});