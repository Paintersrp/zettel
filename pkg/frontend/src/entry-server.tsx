import { ServerResponse } from "http"
import * as _ from "react"
import { createMemoryHistory } from "@tanstack/react-router"
import { StartServer } from "@tanstack/start/server"
import express from "express"
import ReactDOMServer from "react-dom/server"

import { createRouter } from "./router"
// index.js
import "./fetch-polyfill"
import "./app.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export async function render(opts: {
  url: string
  head: string
  req: express.Request
  res: ServerResponse
}) {
  const router = createRouter()

  const memoryHistory = createMemoryHistory({
    initialEntries: [opts.url],
  })

  router.update({
    history: memoryHistory,
    context: {
      ...router.options.context,
      head: opts.head,
    },
  })

  await router.load()
  const appHtml = ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <StartServer router={router} />
    </QueryClientProvider>
  )

  opts.res.statusCode = 200
  opts.res.setHeader("Content-Type", "text/html")
  opts.res.end(`<!DOCTYPE html>${appHtml}`)
}
