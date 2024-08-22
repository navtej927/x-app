import Fastify from 'fastify'
import axios from "axios";
import AWSXRay from 'aws-xray-sdk'

const fastify = Fastify({
  logger: true
})

// Initialize AWS X-Ray
AWSXRay.setDaemonAddress(process.env.AWS_XRAY_DAEMON_ADDRESS);

// Middleware to log incoming requests
fastify.addHook('onRequest', (request, reply, done) => {
    // Start a new segment for the incoming request
    const segment = AWSXRay.getSegment();
    if (segment) {
        AWSXRay.captureHTTPsGlobal(require('http'));
        AWSXRay.captureHTTPsGlobal(require('https'));
        segment.addAnnotation('service', 'todos-api');
    }
    console.log(`Received request for ${request.url}`);
    done();
});

fastify.get('/api/combine', async function handler (request, reply) {
  const URL = "http://notification-api:3000/api/combine";
  const response = await axios.get(URL);
  reply.send({ data: response.data })
})


// Close the X-Ray segment on response
fastify.addHook('onResponse', (request, reply, done) => {
  const segment = AWSXRay.getSegment();
  if (segment) {
      segment.close(); // Ensure the segment is closed
  }
  done();
});


// Run the server!

try {
  await fastify.listen({ port: 3000 , host: '0.0.0.0'})
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}