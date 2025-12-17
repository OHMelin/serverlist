let otel: any = null

async function getOtel() {
  if (otel) return otel
  if (process.env.OTEL_ENABLED !== 'true') return null

  const api = await import('@opentelemetry/api')
  const logs = await import('@opentelemetry/api-logs')

  otel = {
    tracer: api.trace.getTracer('serverlist-api'),
    meter: api.metrics.getMeter('serverlist-api'),
    logger: logs.logs.getLogger('serverlist-api'),
    SpanStatusCode: api.SpanStatusCode,
    SeverityNumber: logs.SeverityNumber
  }
  otel.counter = otel.meter.createCounter('api_requests_total')
  return otel
}

export default defineEventHandler(async () => {
  const o = await getOtel()

  if (!o) {
    return { success: true, message: 'Hello from test!', timestamp: new Date().toISOString() }
  }

  return o.tracer.startActiveSpan('test-endpoint', async (span: any) => {
    o.counter.add(1, { endpoint: '/api/test' })
    o.logger.emit({ severityNumber: o.SeverityNumber.INFO, body: 'Test endpoint called' })

    span.setStatus({ code: o.SpanStatusCode.OK })
    span.end()

    return { success: true, message: 'Hello from test!', timestamp: new Date().toISOString() }
  })
})
