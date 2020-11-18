
exports.up = function(knex) {
  return knex.schema.createTable('lessons', tbl => {
      tbl.increments()
      tbl.text('name').notNull()
      tbl.timestamps(true, true)

  })
  .createTable('users', tbl => {
      tbl.increments()
      tbl.string('username').notNull().unique()
      tbl.string('password',).notNull()
      .index()
      tbl.timestamps(true, true)
  })
  .createTable('instructor', tbl => {
      tbl.increments()
      tbl.string('title')
      tbl.string('username').notNull().unique()
      tbl.string('password').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('instructor')
  return knex.schema.dropTableIfExists('users')
  return knex.schema.dropTableIfExists('lessons')
};
