export async function onRequest(context) {

    if (context.request.method !== "POST") {
        return new Response("Method Not Allowed", {
            status: 405
        });
    }

    const image = await context.request.arrayBuffer();

    return new Response(image, {
        headers: {
            "Content-Type": "image/jpeg",
            "Content-Disposition": 'attachment; filename="resized-image.jpg"'
        }
    });

}
