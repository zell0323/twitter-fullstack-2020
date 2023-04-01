'use strict'
const bcrypt = require('bcryptjs')
const faker = require('faker')
module.exports = {
  up: async (queryInterface) => {
    // Create Regular users' array 
    const fields = await Promise.all(Array.from({ length: 5 }, async (v, i) => ({
      email: `user${i + 1}@example.com`,
      password: await bcrypt.hash('12345678', 10),
      account: `user${i + 1}`,
      name: `user${i + 1}`,
      role: 'regular',
      introduction:faker.lorem.text(),
      avatar:`https://loremflickr.com/240/240/face/?random=${Math.random() * 100}`,
      coverage: `https://loremflickr.com/320/240/restaurant,landscape/?random=${Math.random() * 100}`,
      createdAt: new Date(),
      updatedAt: new Date()
    })))
    const password = await bcrypt.hash('12345678', 10)
    // push Admin user
    fields.push({
      email: 'root@example.com',
      password,
      account: 'root',
      name: 'root',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await queryInterface.bulkInsert('Users', fields, {})
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
