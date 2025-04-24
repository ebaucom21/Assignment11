const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { ATTR_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');

const { NodeSDK } = require('@opentelemetry/sdk-node');

const {
    getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const {
    ConsoleMetricExporter,
    PeriodicExportingMetricReader,
} = require('@opentelemetry/sdk-metrics');

//Instrumentations
const { ExpressInstrumentation } =
    require("@opentelemetry/instrumentation-express");
const { MongoDBInstrumentation } =
    require("@opentelemetry/instrumentation-mongodb");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'todo-service',
    }),      
    traceExporter: new OTLPTraceExporter(),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new ConsoleMetricExporter(),
    }),
    instrumentations: [
        getNodeAutoInstrumentations(),
        new ExpressInstrumentation(),
        new MongoDBInstrumentation(),
        new HttpInstrumentation()],
});

sdk.start();