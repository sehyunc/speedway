import storage from "node-persist"
import server from "./server.js"
import supertest from "supertest"
import { accountLoggedIn } from "./test-archetypes.js"
const app = supertest(server)

expect.extend({
	toBeAddress: (str) => ({ pass: str.slice(0, 3) === "snr" }),
	toBeDid: (str) => ({ pass: str.slice(0, 8) === "did:snr:" }),
})
const addressToDid = (address) => `did:snr:${address.slice(3)}`

beforeAll(async () => {
	await storage.init({ dir: ".node-persist-test" })
})

beforeEach(async () => {
	await Promise.all([app.get("/logout"), storage.clear()])
})

it("creates an account", async () => {
	const { body } = await app.post("/api/v1/account/create")
	expect(body.Address).toBeAddress()
})

it("logs an account in", async () => {
	const responseAuth = await app.post("/api/v1/account/create").send({
		password: "123",
	})

	const { body: result } = await app.post("/api/v1/account/login").send({
		Address: responseAuth.body.Address,
		Password: "123",
	})
	expect(result.Address).toBeAddress()
})

it("checks for logged in account", async () => {
	const responseAuthFalse = await app.get("/api/v1/account/info")
	expect(responseAuthFalse.status).toBe(500)

	const responseAuth = await app.post("/api/v1/account/create").send({
		password: "123",
	})
	await app.post("/api/v1/account/login").send({
		Address: responseAuth.body.Address,
		Password: "123",
	})

	const { body: result } = await app.get("/api/v1/account/info")
	expect(result.Address).toBe(responseAuth.body.Address)
})

it("creates a schema", async () => {
	const address = await accountLoggedIn(app)

	const { body: result } = await app.post("/api/v1/schema/create").send({
		label: "Dinosaurs",
		fields: { name: 4 },
	})

	expect(result).toHaveProperty("whatIs")
	expect(result.whatIs.did).toBeDid()
	expect(result.whatIs.creator).toBeDid()
	expect(result.whatIs.creator).toBe(addressToDid(address))

	expect(result).toHaveProperty("definition")
	expect(result.definition.creator).toBe(addressToDid(address))
	expect(result.definition.label).toBe("Dinosaurs")
	expect(result.definition.fields.length).toBe(1)
	expect(result.definition.fields[0]).toEqual({
		name: "name",
		field: 4,
	})
})

it("gets an individual schema", async () => {
	const address = await accountLoggedIn(app)

	const responseSchema = await app.post("/api/v1/schema/create").send({
		label: "Dinosaurs",
		fields: { name: 4 },
	})

	const { body: result } = await app.post("/api/v1/schema/get").send({
		creator: addressToDid(address),
		schema: responseSchema.body.whatIs.did,
	})

	expect(result.creator).toBe(addressToDid(address))
	expect(result.label).toBe("Dinosaurs")
	expect(result.fields.length).toBe(1)
	expect(result.fields[0]).toEqual({
		name: "name",
		field: 4,
	})
})

it("fetches a list of schemas", async () => {
	const address = await accountLoggedIn(app)

	const { body: resultEmpty } = await app.get("/proxy/schemas")
	expect(resultEmpty).toHaveProperty("what_is")
	expect(resultEmpty.what_is.length).toBe(0)

	const responseSchema = await app.post("/api/v1/schema/create").send({
		label: "Dinosaurs",
		fields: { name: 4 },
	})

	const { body: result } = await app.get("/proxy/schemas")
	expect(result.what_is.length).toBe(1)
	expect(result.what_is[0].creator).toBe(addressToDid(address))
	expect(result.what_is[0].did).toBe(responseSchema.body.whatIs.did)
	expect(result.what_is[0].schema.did).toBe(responseSchema.body.whatIs.did)
	expect(result.what_is[0].schema.label).toBe("Dinosaurs")
	expect(result.what_is[0].schema.cid).toBe(
		responseSchema.body.whatIs.schema.cid
	)
})

it("builds an object", async () => {
	await accountLoggedIn(app)

	const responseSchema = await app.post("/api/v1/schema/create").send({
		label: "Dinosaurs",
		fields: { firstName: 4 },
	})

	const { body: result } = await app.post("/api/v1/object/build").send({
		SchemaDid: responseSchema.body.whatIs.did,
		Label: "Sonrsaur",
		Object: { firstName: "Rex" },
	})

	expect(result).toHaveProperty("reference")
	expect(result.reference.Label).toBe("Sonrsaur")
	expect(typeof result.reference.Cid).toBe("string")
})

it("when building object, checks schema properties", async () => {
	await accountLoggedIn(app)

	const responseSchema = await app.post("/api/v1/schema/create").send({
		label: "Dinosaurs",
		fields: { firstName: 4 },
	})

	const result = await app.post("/api/v1/object/build").send({
		SchemaDid: responseSchema.body.whatIs.did,
		Label: "Sonrsaur",
		Object: { lastName: "Smith" },
	})

	expect(result.status).toBe(500)
	expect(result.body.error).toBe("Object Upload Failed")
})

it("gets an object", async () => {
	await accountLoggedIn(app)

	const responseSchema = await app.post("/api/v1/schema/create").send({
		label: "Dinosaurs",
		fields: { firstName: 4 },
	})

	const responseObject = await app.post("/api/v1/object/build").send({
		SchemaDid: responseSchema.body.whatIs.did,
		Label: "Sonrsaur",
		Object: { firstName: "Rex" },
	})

	const { body: result } = await app.post("/api/v1/object/get").send({
		SchemaDid: responseSchema.body.whatIs.did,
		ObjectCid: responseObject.body.reference.Cid,
	})

	expect(result.firstName).toBe("Rex")
})

it("creates a bucket", async () => {
	const address = await accountLoggedIn(app)

	const { body: result } = await app.post("/api/v1/bucket/create").send({
		label: "Lunar base",
		creator: address,
	})

	expect(result["service-information"].serviceEndpoint.did).toBeDid()
})

it("fetches a list of buckets", async () => {
	const address = await accountLoggedIn(app)

	await app.post("/api/v1/bucket/create").send({
		label: "Dragons",
		content: address,
	})
	await app.post("/api/v1/bucket/create").send({
		label: "Furniture",
		content: address,
	})

	const { body: result } = await app.get("/proxy/buckets")
	expect(result).toHaveProperty("where_is")
	expect(result.where_is.length).toBe(2)
	expect(result.where_is[0].did).toBeDid()
	expect(result.where_is[0].label).toBe("Dragons")
	expect(result.where_is[0].content.length).toBe(1)
	expect(result.where_is[1].did).toBeDid()
	expect(result.where_is[1].label).toBe("Furniture")
	expect(result.where_is[1].content.length).toBe(1)
})

it("can add objects to buckets", async () => {
	const address = await accountLoggedIn(app)

	const responseSchema = await app.post("/api/v1/schema/create").send({
		label: "Dinosaurs",
		fields: { firstName: 4 },
	})

	const responseBucket = await app.post("/api/v1/bucket/create").send({
		label: "Mars colony",
		creator: address,
	})
	const bucketDid = responseBucket.body["service-information"].serviceEndpoint.did

	const responseObject = await app.post("/api/v1/object/build").send({
		SchemaDid: responseSchema.body.whatIs.did,
		Label: "Sonrsaur",
		Object: { firstName: "Rex" },
	})
	const objectCid = responseObject.body.reference.Cid

	await app.post("/api/v1/bucket/update").send({
		did: bucketDid,
		content: { uri: objectCid },
	})

	const { body: result } = await app.get("/proxy/buckets")
	expect(result.where_is[0].did).toBe(bucketDid)
	expect(result.where_is[0].creator).toBe(address)
	expect(result.where_is[0].label).toBe("Mars colony")
	expect(result.where_is[0].content.length).toBe(2)
	expect(result.where_is[0].content[0].ui).toBeUndefined()
	expect(result.where_is[0].content[1].uri).toBe(objectCid)
})

it("gets a bucket content", async () => {
	const address = await accountLoggedIn(app)

	const responseSchema = await app.post("/api/v1/schema/create").send({
		label: "Dinosaurs",
		fields: { firstName: 4 },
	})
	const schemaDid = responseSchema.body.whatIs.did

	const responseBucket = await app.post("/api/v1/bucket/create").send({
		label: "Mars colony",
		creator: address,
	})
	const bucketDid = responseBucket.body["service-information"].serviceEndpoint.did

	const responseObject = await app.post("/api/v1/object/build").send({
		SchemaDid: schemaDid,
		Label: "Sonrsaur",
		Object: { firstName: "Marcel" },
	})
	const objectCid = responseObject.body.reference.Cid

	await app.post("/api/v1/object/build").send({
		SchemaDid: schemaDid,
		Label: "Not on bucket",
		Object: { firstName: "Jane" },
	})

	await app.post("/api/v1/bucket/update").send({
		did: bucketDid,
		content: { uri: objectCid },
	})

	const { body: result } = await app.post("/api/v1/bucket/get").send({
		did: bucketDid,
	})
	expect(result.length).toBe(2)
	expect(result[0].uri).toBeUndefined()
	expect(result[1].uri).toBe(objectCid)
})

it("(compatibility) gets a bucket content", async () => {
	const address = await accountLoggedIn(app)

	const responseSchema = await app.post("/api/v1/schema/create").send({
		label: "Dinosaurs",
		fields: { firstName: 4 },
	})
	const schemaDid = responseSchema.body.whatIs.did

	const responseBucket = await app.post("/api/v1/bucket/create").send({
		label: "Mars colony",
		creator: address,
	})
	const bucketDid = responseBucket.body["service-information"].serviceEndpoint.did

	const responseObject = await app.post("/api/v1/object/build").send({
		SchemaDid: schemaDid,
		Label: "Sonrsaur",
		Object: { firstName: "Marcel" },
	})
	const objectCid = responseObject.body.reference.Cid

	await app.post("/api/v1/object/build").send({
		SchemaDid: schemaDid,
		Label: "Not on bucket",
		Object: { firstName: "Jane" },
	})

	await app.post("/api/v1/bucket/update").send({
		did: bucketDid,
		content: {uri: objectCid},
	})

	const { body: result } = await app.post("/api/v1/bucket/content-compatible").send({
		bucket: bucketDid,
	})
	expect(result.length).toBe(1)
	expect(result[0].firstName).toBe("Marcel")
	expect(result[0].cid).toBe(objectCid)
	expect(result[0].schema).toBe(schemaDid)
})
