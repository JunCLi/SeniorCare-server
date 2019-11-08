const { Pool } = require('pg')
const squel = require('squel').useFlavour('postgres')
const config = require('../config/development.json')

const userSeeds = require('./userSeeds')

const seed = async () => {
  const pg = await new Pool(config.db).connect()

  try {
    await pg.query('BEGIN')

    console.log('Seeding tables...')

    await Promise.all(
      userSeeds.map(userSeed =>
        pg.query(
          squel
            .insert()
            .into('senior_care.users')
            .setFields(userSeed)
            .toParam()
        )
      )
    )
    await pg.query('COMMIT')
  } catch (e) {
    await pg.query('ROLLBACK')
    throw e
  } finally {
    pg.release()
  }
}

seed().catch(e => {
  setImmediate(() => {
    throw e
  })
})
