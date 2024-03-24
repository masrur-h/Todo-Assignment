const express = require('express')
const { query } = require('../helpers/db.js')

const rodoRouter = express.Router()

todoRouter.get("/",async (req,res) => {
    try {
        const result = await query('select * from task')
        res.status(200).json(rows)

    } catch (error) {
        res.statusMessage = error
        res.status(500).json({error:error})

    }
})

todoRouter.post("/new",async (req,res) => {
    try {
        const result = await query('insert into task (description) values ($1) returning *',
        [req.body.description])
        res.status(200).json({id:result.rows[0].id})

    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error:error})

    }
})

todoRouter.delete("/delete/:id",async(req,res)=> {
    const id = Number(req.params.id)
    try {
        const result = await pool.query('DELETE FROM task WHERE id = $1', [id]);
        res.status(200).json({ id: id });
    } catch (error) {
        console.log(error);
        res.statusMessage = error
        res.status(500).json({ error: error.message });
    }
    })

    require('dotenv').config()
    const express = require('express')
    const cors = require('cors')
    const { todoRouter} = require('./routes/todo.js')

    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use('/',todoRouter)

    const port = process.env.port

    app.listen(port)
