import type { Tracer, Counter, Span } from '@opentelemetry/api'
import type { Logger } from '@opentelemetry/api-logs'

interface OtelContext {
  tracer: Tracer
  meter: ReturnType<typeof import('@opentelemetry/api').metrics.getMeter>
  logger: Logger
  SpanStatusCode: typeof import('@opentelemetry/api').SpanStatusCode
  SeverityNumber: typeof import('@opentelemetry/api-logs').SeverityNumber
  counter: Counter
}

let otel: OtelContext | null = null

async function getOtel(): Promise<OtelContext | null> {
  if (otel) return otel
  if (process.env.OTEL_ENABLED !== 'true') return null

  const api = await import('@opentelemetry/api')
  const logs = await import('@opentelemetry/api-logs')

  const context: OtelContext = {
    tracer: api.trace.getTracer('serverlist-api'),
    meter: api.metrics.getMeter('serverlist-api'),
    logger: logs.logs.getLogger('serverlist-api'),
    SpanStatusCode: api.SpanStatusCode,
    SeverityNumber: logs.SeverityNumber,
    counter: null!
  }
  context.counter = context.meter.createCounter('api_requests_total')
  otel = context
  return otel
}

export default defineEventHandler(async () => {
  const o = await getOtel()

  if (!o) {
    return { success: true, message: 'Hello from test!', timestamp: new Date().toISOString() }
  }

  return o.tracer.startActiveSpan('test-endpoint', async (span: Span) => {
    o.counter.add(1, { endpoint: '/api/test' })
    o.logger.emit({ severityNumber: o.SeverityNumber.INFO, body: 'Test endpoint called' })

    span.setStatus({ code: o.SpanStatusCode.OK })
    span.end()

    return { success: true, message: 'Hello from test!', timestamp: new Date().toISOString() }
  })
})
