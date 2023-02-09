const express = require('express')
const routes = express.Router()

// ----GET routes

routes.get('/', (req, res) =>{
    res.send('pagina principal')
})

routes.get('/api', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query("SELECT id, CONCAT('$', price) AS price, article, stock FROM tablaproductos ORDER BY article ASC ", (err, rows)=>{
            res.json(rows)
        })

    })
})



// ----POST routes

routes.post('/api', (req, res) =>{
    req.getConnection((err, conn)=>{
       
        if(err) return res.send(err)
        console.log(req.body)
        const { article, price, stock } = req.body;
        conn.query("INSERT INTO tablaproductos (article, price, stock) VALUES (?, ?, ?)", 
        [article, price, stock], (err, rows) => {
            if (err) {
            console.log(err);
            }
            res.json({ message: "Data inserted successfully." });
            });
            
            

    })
})


// -----DELETE routes



routes.delete('/api/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query("DELETE FROM tablaproductos WHERE id = ?", [req.params.id], (err, rows) =>{ 
            if(err) return res.send(err)
            res.send('Article deleted!')
        })

            
            

    })
})


//------PUT routes
routes.put('/api/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query("UPDATE tablaproductos set ? WHERE id = ?", [req.body, req.params.id], (err, rows) =>{ 
            if(err) return res.send(err)
            res.send('Article updated!')
        })

            
            

    })
})


module.exports = routes