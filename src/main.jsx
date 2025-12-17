import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createServer } from 'miragejs'
import axios from 'axios'
import App from './App'
import makeServer from './server'

// 注释掉真实 API，使用 mock 数据用于演示和测试
// if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = 'https://api.realworld.io/api'
// }

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey[0], { params: queryKey[1] })
  return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 300000,
    },
  },
})

if (window.Cypress && process.env.NODE_ENV === 'test') {
  const cyServer = createServer({
    routes() {
      ;['get', 'put', 'patch', 'post', 'delete'].forEach((method) => {
        this[method]('/*', (schema, request) => window.handleFromCypress(request))
      })
    },
  })
  cyServer.logging = false
} else {
  // 在开发和生产模式下都使用 mock 数据（用于演示和测试）
  makeServer({ environment: 'development' })
}

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} containerElement="div" />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
