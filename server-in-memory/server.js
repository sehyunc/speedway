import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import _ from "lodash"
import md5 from "md5"
import storage from "node-persist"

function arrayStringDistinct(arr) {
	return arr.sort().filter(function (item, pos, ary) {
		return !pos || item != ary[pos - 1]
	})
}

const generateAddress = () => `snr${md5(Math.random())}`
const generateDid = () => `did:snr:${md5(Math.random())}`
const generateCid = () => md5(Math.random())
const addressToDid = (address) => `did:snr:${address.slice(3)}`

const accountStoreKey = (address) => `account-${address}`
const schemaStoreKey = (did) => `schema-${did}`
const objectStoreKey = (cid) => `object-${cid}`

const app = express()
app.use(cors())
app.use(bodyParser.json())

let sessionAddress = null

/// DEVELOPMENT

app.use("*", async (req, _, next) => {
	// uncomment next line to see request log
	// console.info(`${req.method} ${req.originalUrl}`)
	// uncomment next line to simulate slower network response
	// await new Promise((r) => setTimeout(r, 1000))
	next()
})

app.get("/dump", async (_, res) => {
	const data = await storage.values()
	res.json({ data })
})

app.get("/reset", async (_, res) => {
	sessionAddress = null
	await storage.clear()
	const length = await storage.length()
	res.json({ length })
})

app.get("/logout", (_, res) => {
	sessionAddress = null
	res.status(200).send()
})

/// AUTHENTICATION

app.post("/api/v1/account/create", async ({ body }, res) => {
	const address = generateAddress()

	const password = body.password || ""

	await storage.setItem(accountStoreKey(address), {
		address,
		password,
	})

	res.json({ Address: address })
})

app.post("/api/v1/account/login", async ({ body }, res) => {
	const account = await storage.getItem(accountStoreKey(body.Address))

	if (!account || account.password !== body.Password) {
		res.status(500).send()
		return
	}

	sessionAddress = account.address
	res.json({ Address: account.address })
})

app.get("/api/v1/account/info", async (_, res) => {
	if (!sessionAddress) {
		res.status(500).send()
		return
	}

	res.json({ Address: sessionAddress })
})

app.use((_, res, next) => {
	if (!sessionAddress) {
		res.status(500).json({ message: "Not logged in" })
		return
	}
	next()
})

/// SCHEMAS

app.post("/api/v1/schema/create", async ({ body }, res) => {
	const did = generateDid()
	const creator = addressToDid(sessionAddress)

	const schemaMetaData = {
		did,
		schema: {
			did,
			label: body.label,
			cid: generateCid(),
		},
		creator,
	}

	const fields = _.map(_.keys(body.fields), (name) => ({
		name,
		field: body.fields[name],
	}))
	const schema = {
		label: body.label,
		creator,
		fields,
	}

	const allMetaData = (await storage.getItem("schemaMetaData")) || []
	allMetaData.push(schemaMetaData)

	await Promise.all([
		storage.setItem("schemaMetaData", allMetaData),
		storage.setItem(schemaStoreKey(did), schema),
	])

	res.json({
		definition: schema,
		whatIs: schemaMetaData,
	})
})

app.post("/api/v1/schema/get", async ({ body }, res) => {
	const schema = await storage.getItem(schemaStoreKey(body.schema))
	res.json(schema)
})

/// BUCKETS

app.post("/api/v1/bucket/create", async ({ body }, res) => {
	const did = generateDid()
	const bucket = {
		did,
		label: body.label,
		creator: body.creator,
		content: [{}],
	}

	const allBuckets = (await storage.getItem("buckets")) || []
	allBuckets.push(bucket)
	await storage.setItem("buckets", allBuckets)

	res.json({
		"service-information": { serviceEndpoint: { did } },
	})
})

app.post("/api/v1/bucket/update", async ({ body }, res) => {
	const allBuckets = await storage.getItem("buckets")
	const bucket = _.find(allBuckets, { did: body.did })
	bucket.content.push(body.content)
	await storage.setItem("buckets", allBuckets)
	res.json({})
})

app.post("/api/v1/bucket/content", async ({ body }, res) => {
	const bucket = await storage.getItem(bucketStoreKey(body.bucket))
	const objects = await Promise.all(
		bucket.objects.map(objectStoreKey).map(storage.getItem)
	)
	res.json(objects)
})

/// OBJECTS

app.post("/api/v1/object/build", async ({ body }, res) => {
	const schema = await storage.getItem(schemaStoreKey(body.SchemaDid))

	const fieldsExpected = _.map(schema.fields, "name")
	const fieldsReceived = _.keys(body.Object)
	if (_.difference(fieldsExpected, fieldsReceived).length > 0) {
		res.status(500).json({ error: "Object Upload Failed" })
		return
	}

	const cid = generateCid()
	const object = {
		cid,
		schema: body.SchemaDid,
		...body.Object,
	}
	await storage.setItem(objectStoreKey(cid), object)

	res.json({
		reference: {
			Label: body.Label,
			Cid: cid,
		},
	})
})

app.post("/api/v1/object/get", async ({ body }, res) => {
	const object = await storage.getItem(objectStoreKey(body.ObjectCid))
	res.json(object)
})

/// CHAIN PROXY

app.get("/proxy/schemas", async (_, res) => {
	const metadata = (await storage.getItem("schemaMetaData")) || []
	res.json({ what_is: metadata })
})

app.get("/proxy/buckets", async (_, res) => {
	const buckets = (await storage.getItem("buckets")) || []
	res.json({ where_is: buckets })
})

export default app
