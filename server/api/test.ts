import { trace, SpanStatusCode, metrics } from '@opentelemetry/api'
import { logs, SeverityNumber } from '@opentelemetry/api-logs'

const tracer = trace.getTracer('serverlist-api')
const meter = metrics.getMeter('serverlist-api')
const logger = logs.getLogger('serverlist-api')

const requestCounter = meter.createCounter('api_requests_total', {
  description: 'Total number of API requests',
})

const responseTimeHistogram = meter.createHistogram('api_response_time_ms', {
  description: 'API response time in milliseconds',
})

export default defineEventHandler(async (event) => {
  console.log('[API] /api/test endpoint called')
  const startTime = Date.now()

  return tracer.startActiveSpan('test-endpoint', async (span) => {
    try {
      span.setAttribute('http.method', 'GET')
      span.setAttribute('http.route', '/api/test')

      requestCounter.add(1, { endpoint: '/api/test', method: 'GET' })

      logger.emit({
        severityNumber: SeverityNumber.INFO,
        severityText: 'INFO',
        body: 'Test endpoint called',
        attributes: { endpoint: '/api/test' },
      })

      await tracer.startActiveSpan('database-query', async (dbSpan) => {
        dbSpan.setAttribute('db.system', 'mock')
        dbSpan.setAttribute('db.operation', 'SELECT')

        await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50))

        dbSpan.setStatus({ code: SpanStatusCode.OK })
        dbSpan.end()
      })

      await tracer.startActiveSpan('external-api-call', async (apiSpan) => {
        apiSpan.setAttribute('http.url', 'https://api.example.com/data')

        await new Promise(resolve => setTimeout(resolve, Math.random() * 150 + 100))

        apiSpan.setStatus({ code: SpanStatusCode.OK })
        apiSpan.end()
      })

      const responseTime = Date.now() - startTime
      responseTimeHistogram.record(responseTime, { endpoint: '/api/test' })

      span.setStatus({ code: SpanStatusCode.OK })

      return {
        success: true,
        message: 'Hello from the test endpoint!',
        timestamp: new Date().toISOString(),
        responseTimeMs: responseTime,
        telemetry: {
          traceId: span.spanContext().traceId,
          spanId: span.spanContext().spanId,
        },
      }
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: String(error) })
      span.recordException(error as Error)

      logger.emit({
        severityNumber: SeverityNumber.ERROR,
        severityText: 'ERROR',
        body: `Error in test endpoint: ${error}`,
      })

      throw error
    } finally {
      span.end()
    }
  })
})
