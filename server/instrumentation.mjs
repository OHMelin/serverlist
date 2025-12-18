if (process.env.OTEL_ENABLED === 'true') {
  const { NodeSDK } = await import('@opentelemetry/sdk-node')
  const { getNodeAutoInstrumentations } = await import('@opentelemetry/auto-instrumentations-node')
  const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http')
  const { OTLPMetricExporter } = await import('@opentelemetry/exporter-metrics-otlp-http')
  const { OTLPLogExporter } = await import('@opentelemetry/exporter-logs-otlp-http')
  const { PeriodicExportingMetricReader } = await import('@opentelemetry/sdk-metrics')
  const { BatchLogRecordProcessor } = await import('@opentelemetry/sdk-logs')
  const { resourceFromAttributes } = await import('@opentelemetry/resources')
  const { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } = await import('@opentelemetry/semantic-conventions')

  const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318'
  console.log(`[OTEL] Initializing with endpoint: ${otlpEndpoint}`)

  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'serverlist-nuxt',
    [ATTR_SERVICE_VERSION]: '1.0.0',
  })

  const sdk = new NodeSDK({
    resource,
    traceExporter: new OTLPTraceExporter({
      url: `${otlpEndpoint}/v1/traces`,
    }),
    metricReader: new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({
        url: `${otlpEndpoint}/v1/metrics`,
      }),
      exportIntervalMillis: 10000,
    }),
    logRecordProcessor: new BatchLogRecordProcessor(
      new OTLPLogExporter({
        url: `${otlpEndpoint}/v1/logs`,
      }),
    ),
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
      }),
    ],
  })

  sdk.start()
  console.log('[OTEL] SDK started successfully')

  process.on('SIGTERM', () => {
    sdk.shutdown()
      .then(() => console.log('OpenTelemetry SDK shut down'))
      .catch(error => console.error('Error shutting down SDK', error))
      .finally(() => process.exit(0))
  })
}
