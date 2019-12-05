const { Pool } = require('pg')
const squel = require('squel').useFlavour('postgres')
const config = require('../config/development.json')

const userSeed = require('./userSeeds')
const caregiverSeed = require('./caregiverSeeds')
const familySeed = require('./familySeeds')
const serviceSeed = require('./serviceSeeds')
const languageSeed = require('./languageSeeds')
const seniorSeed = require('./seniorSeeds')

const databaseSchema = 'senior_care'

const allSeeds = [
	userSeed,
	caregiverSeed,
	familySeed,
	serviceSeed,
	languageSeed,
	seniorSeed,
]


const seedTable = async (pg, seedsArray, table) => {
	return (seedsArray.map( async seed =>
		pg.query(
			squel
				.insert()
				.into(`${databaseSchema}.${table}`)
				.setFields(seed)
				.toParam()
		)
	))
}

const createSeed = async (pg, seedsArray) => {
	return seedsArray.map(async (seedBundle, index) => (
		seedBundle.length
			? createSeed(pg, seedBundle)
			: seedTable(pg, seedBundle.seeds, seedBundle.table)
	))
}

const seed = async () => {
  const pg = await new Pool(config.db).connect()

  try {
    await pg.query('BEGIN')

    console.log('Seeding tables...')
		await Promise.all( await createSeed(pg, allSeeds))
		
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
