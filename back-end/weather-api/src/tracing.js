const { HoneycombSDK } = require('@honeycombio/opentelemetry-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const opentelemetry = require('@opentelemetry/api');

const sdk = new HoneycombSDK({
    instrumentations: [getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': {
            enabled: false,
        },
    })]
});

//
// Global tracer for this service.
//
const tracer = opentelemetry.trace.getTracer(process.env.OTEL_SERVICE_NAME);

sdk.start();