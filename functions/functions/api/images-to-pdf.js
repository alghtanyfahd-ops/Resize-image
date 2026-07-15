export async function onRequestPost(context) {

    try {

        const formData =
        await context.request.formData();


        const images =
        formData.getAll("images");


        if (!images.length) {

            return new Response(
                "No images",
                {
                    status:400
                }
            );

        }


        const { PDFDocument } =
        await import(
        "pdf-lib"
        );


        const pdfDoc =
        await PDFDocument.create();



        for (const image of images) {


            const arrayBuffer =
            await image.arrayBuffer();



            let img;


            if(image.type === "image/png"){

                img =
                await pdfDoc.embedPng(
                    arrayBuffer
                );

            } else {

                img =
                await pdfDoc.embedJpg(
                    arrayBuffer
                );

            }



            const page =
            pdfDoc.addPage([
                img.width,
                img.height
            ]);



            page.drawImage(img,{
                x:0,
                y:0,
                width:img.width,
                height:img.height
            });


        }



        const pdfBytes =
        await pdfDoc.save();



        return new Response(
            pdfBytes,
            {
                headers:{

                    "Content-Type":
                    "application/pdf",

                    "Content-Disposition":
                    'attachment; filename="images.pdf"',

                    "Cache-Control":
                    "no-store"

                }
            }
        );


    }
    catch(error){


        return new Response(
            error.message,
            {
                status:500
            }
        );


    }

}
