const express = require('express')
const server = express()
server.use(express.json())
const lessons = require('./models/dbHelpers.js')
const users = require('./models/dbHelpers.js')
const instructor = require('./models/dbHelpers.js')
const bcrypt = require('bcryptjs')


const PORT = 5000

server.get('/fitness/lessons', async (req, res, next) => {
    try {
    lessons.find()
    .then(lesson => {
        res.status(200).json(lessons)
    })
    } catch(err) {
        res.status(500).json({message: "Server Issuse Fix Me"})
    }
    })


server.post('/fitness/lessons', async (req,res) => {
try {
lessons.add(req.body)
.then(lesson => {
    res.status(201).json(lesson)
})
} catch(err) {
    res.status(500).json({message: "Cannot Add A Lesson"})
}
})

server.get('/fitness/lessons/:id', async (req,res,next) => {
    try{
        const { id } = req.params
        lessons.findById(id)
        .then(lesson => {
          if (lesson) {
              res.status(200).json(lessons)
          } else {
              res.status(404).json({message: "Unable To Find That Lesson ID"})
          }
    
        }) 
        

    }
    catch(err) {
    next(err)
    }
})

server.delete('/fitness/lessons/:id',  (req,res) => {
 
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

server.post('/fitness/signup', async (req,res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = {name: req.body.name, password: hashedPassword}
        signup.push(user)
        res.status(201).json()
    } catch {
        res.status(500).json()
    }
})
server.post('/fitness/users/login', async (req,res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).json('Cant Find User')
    } 
    try {
      if  (await bcrypt.compare(req.body.password, user.password)){
       res.json('success')
      } else {
          res.json('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }

})

    server.get('/fitness/users/:id', (req,res) => {
        const { id } = req.params
        users.findById(id)
        .then(user => {
          if (user) {
              res.status(200).json(users)
          } else {
              res.status(404).json({message: "Unable To Find That user with that ID"})
          }
        })
        .catch(err => {
            res.status(500).json({message: "No user Found"})
        })
    })

    server.post('/fitness/instructors', (req,res) => {
        instructor.add(req.body)
        .then(instructors => {
            res.status(201).json(instructors)
        })
        .catch(err => {
            res.status(500).json({message: "Cannot Add A instructor"})
        })
        })

        server.get('/fitness/instructor/:id', (req,res) => {
            const { id } = req.params
            users.findById(id)
            .then(instructors => {
              if (instructors) {
                  res.status(200).json(instructor)
              } else {
                  res.status(404).json({message: "Unable To Find That instructor with that ID"})
              }
            })
            .catch(err => {
                res.status(500).json({message: "No instructor Found"})
            })
        })
        




server.listen(PORT, () => console.log(`Server Running Strong on port${PORT}`))