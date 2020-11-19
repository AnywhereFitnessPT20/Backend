const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

async function add(lesson) {
     const [id] = await db('lessons').insert(lesson)
     return id;
}

function find(){
    return db('lessons')
}

function findById(id) {
    return db('lessons')
    .where({ id })
    .first()
}

function remove(id) {
    return db('lessons')
    .where({ id })
    .del()
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return id;
}

function find(){
    return db('users')
}

async function add(instructors) {
    const [id] = await db('instructor').insert(instructors)
    return id;
}

function find(){
    return db('instructor')
}

module.exports = {
    add,
    find,
    findById,
    remove
}