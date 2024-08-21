import Fastify from 'fastify'
import axios from "axios";

const fastify = Fastify({
  logger: true
})

fastify.get('/api/combine', async function handler (request, reply) {
  const URL = "http://notification-api:3000/api/data";
  const response = await axios.get(URL);
  reply.send({ data: response.data })
})

// Run the server!
try {
  await fastify.listen({ port: 3000 , host: '0.0.0.0'})
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}