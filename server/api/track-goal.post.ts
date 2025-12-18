export default defineEventHandler(async (event) => {
  const body = await readBody<{ eventName: string, metadata?: Record<string, unknown> }>(event)
  const datafastVisitorId = getCookie(event, 'datafast_visitor_id')
  const runtimeConfig = useRuntimeConfig()

  if (!body?.eventName) {
    return { error: 'Missing eventName' }
  }

  try {
    await $fetch('https://datafa.st/api/v1/goals', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${runtimeConfig.datafastApiKey}`,
        'Content-Type': 'application/json',
      },
      body: {
        datafast_visitor_id: datafastVisitorId,
        name: body.eventName,
        metadata: body.metadata || {},
      },
    })
    return { success: true }
  }
  catch (err) {
    console.error('Error sending goal to DataFast:', err)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Failed to send goal' }))
  }
})
