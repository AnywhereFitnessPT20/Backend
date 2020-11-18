const express = require('express')
const server = express()
server.use(express.json())
const lessons = require('./models/dbHelpers.js')

const PORT = 5000

server.get('/api/lessons', (req, res) => {
    lessons.find()
    .then(lesson => {
        res.status(200).json(lessons)
    })
    .catch(err => {
        res.status(500).json({message: "Server Issuse Fix Me"})
    }) 
})


server.post('/api/lessons', (req,res) => {
lessons.add(req.body)
.then(lesson => {
    res.status(201).json(lesson)
})
.catch(err => {
    res.status(500).json({message: "Cannot Add A Lesson"})
})
})

server.get('/api/lessons/:id', (req,res) => {
    const { id } = req.params
    lessons.findById(id)
    .then(lesson => {
      if (lesson) {
          res.status(200).json(lessons)
      } else {
          res.status(404).json({message: "Unable To Find That Lesson ID"})
      }
    })
    .catch(err => {
        res.status(500).json({message: "No Lesson Found"})
    })
})

server.delete('/api/lessons/:id', (req,res) => {
    const { id } = req.params
    lessons.remove(id) 
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "Lessons Deletetd"})
        } else {
            res.status(500).json({message: "Cannot Delete Selected Lesson"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Server Issuse Fix Me"})
    })
})




server.listen(PORT, () => console.log(`Server Running Strong on port${PORT}`))