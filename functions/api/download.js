export async function onRequestPost(context) {

    try {

        const image = await context.request.text();

        if (!image) {
            return new Response("No image", {
                status: 400
            });
        }

        const base64 = image.replace(/^data:image\/\w+;base64,/, "");

        const binary = Uint8Array.from(
            atob(base64),
            c => c.charCodeAt(0)
        );

        return new Response(binary, {

            headers: {

                "Content-Type": "image/jpeg",

                "Content-Disposition":
                'attachment; filename="resized-image.jpg"',

                "Cache-Control":"no-store"

            }

        });

    } catch (e) {

        return new Response(e.message,{
            status:500
        });

    }

}
