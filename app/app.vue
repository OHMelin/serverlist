<template>
  <div class="container">
    <h1>Serverlist - LGTM Test</h1>

    <div class="card">
      <h2>Test OpenTelemetry</h2>
      <p>Click the button to generate traces, metrics, and logs</p>

      <button @click="runTest" :disabled="loading">
        {{ loading ? 'Running...' : 'Run Test' }}
      </button>

      <button @click="runMultipleTests" :disabled="loading" style="margin-left: 10px;">
        {{ loading ? 'Running...' : 'Run 10 Tests' }}
      </button>

      <div v-if="result" class="result">
        <h3>Result:</h3>
        <pre>{{ JSON.stringify(result, null, 2) }}</pre>
      </div>

      <div v-if="error" class="error">
        <h3>Error:</h3>
        <pre>{{ error }}</pre>
      </div>
    </div>

    <div class="card">
      <h2>View in Grafana</h2>
      <p>Open <a href="http://localhost:3001" target="_blank">http://localhost:3001</a> (admin/admin)</p>
      <ul>
        <li><strong>Traces:</strong> Explore &rarr; Select "Tempo" &rarr; Search for traces</li>
        <li><strong>Metrics:</strong> Explore &rarr; Select "Prometheus" &rarr; Query <code>api_requests_total</code></li>
        <li><strong>Logs:</strong> Explore &rarr; Select "Loki" &rarr; Query <code>{service_name="serverlist-nuxt"}</code></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const result = ref<any>(null)
const error = ref<string | null>(null)
const loading = ref(false)

async function runTest() {
  loading.value = true
  error.value = null
  result.value = null

  try {
    const data = await $fetch('/api/test')
    result.value = data
  } catch (e: any) {
    error.value = e.message || 'Unknown error'
  } finally {
    loading.value = false
  }
}

async function runMultipleTests() {
  loading.value = true
  error.value = null
  result.value = null

  try {
    const results = await Promise.all(
      Array.from({ length: 10 }, () => $fetch('/api/test'))
    )
    result.value = {
      message: '10 tests completed!',
      count: results.length,
      lastResult: results[results.length - 1],
    }
  } catch (e: any) {
    error.value = e.message || 'Unknown error'
  } finally {
    loading.value = false
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #1a1a2e;
  color: #eee;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #00dc82;
  text-align: center;
}

.card {
  background: #16213e;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.card h2 {
  margin-top: 0;
  color: #00dc82;
}

button {
  background: #00dc82;
  color: #1a1a2e;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #00b368;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result, .error {
  margin-top: 20px;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
}

.result {
  background: #0f3460;
}

.error {
  background: #4a1942;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

code {
  background: #0f3460;
  padding: 2px 6px;
  border-radius: 4px;
}

a {
  color: #00dc82;
}

ul {
  line-height: 1.8;
}
</style>
