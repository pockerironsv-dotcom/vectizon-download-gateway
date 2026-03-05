export default {
  async fetch(request, env) {

    const url = new URL(request.url)

    const key = url.searchParams.get("file")

    if (!key) {
      return new Response("Missing file parameter", { status: 400 })
    }

    const object = await env.ASSETS.get(key)

    if (!object) {
      return new Response("File not found", { status: 404 })
    }

    return new Response(object.body, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${key.split("/").pop()}"`
      }
    })
  }
}

// test build
