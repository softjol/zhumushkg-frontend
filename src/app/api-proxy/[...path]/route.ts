import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

async function proxy(req: NextRequest, pathSegments: string[]) {
  const path = pathSegments.join('/')
  const url = `${BACKEND_URL}/${path}${req.nextUrl.search}`

  const headers = new Headers()
  headers.set('accept-encoding', 'identity')

  const contentType = req.headers.get('content-type')
  if (contentType) headers.set('content-type', contentType)

  const authorization = req.headers.get('authorization')
  if (authorization) headers.set('authorization', authorization)

  const cookie = req.headers.get('cookie')
  if (cookie) headers.set('cookie', cookie)

  const isBodyMethod = !['GET', 'HEAD'].includes(req.method)
  const body = isBodyMethod ? await req.arrayBuffer() : undefined

  let res: Response
  try {
    res = await fetch(url, {
      method: req.method,
      headers,
      body,
    })
  } catch (err) {
    console.error(`[proxy] ${req.method} /${path} → fetch failed:`, err)
    return new NextResponse(JSON.stringify({ message: 'Backend unreachable' }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    })
  }

  const resHeaders = new Headers(res.headers)
  resHeaders.delete('content-encoding')

  if (res.status >= 500) {
    const text = await res.text()
    console.error(`[proxy] ${req.method} /${path} → ${res.status}:`, text)
    return new NextResponse(text, { status: res.status, headers: resHeaders })
  }

  return new NextResponse(res.body, {
    status: res.status,
    headers: resHeaders,
  })
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxy(req, path)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxy(req, path)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxy(req, path)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxy(req, path)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  return proxy(req, path)
}
