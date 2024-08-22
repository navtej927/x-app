const { HoneycombSDK } = require('@honeycombio/opentelemetry-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const opentelemetry = require('@opentelemetry/api');

const sdk = new HoneycombSDK({
    instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();