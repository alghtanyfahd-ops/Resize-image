const imageInput =
document.getElementById("imageInput");

const preview =
document.getElementById("preview");

let images = [];

imageInput.addEventListener(
    "change",
    function(e){

        preview.innerHTML = "";

        images = [];

        Array.from(
            e.target.files
        ).forEach(file=>{

            const reader =
            new FileReader();

            reader.onload =
            function(event){

                images.push(
                    event.target.result
                );

                const item =
                document.createElement("div");

                item.className =
                "preview-item";

                item.innerHTML =
                `<img src="${event.target.result}">`;

                preview.appendChild(item);

            };

            reader.readAsDataURL(file);

        });

    }
);

async function createPDF(){

    if(images.length===0){

        alert(
            "Please select images first."
        );

        return;

    }

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF(
        "p",
        "mm",
        "a4"
    );

    for(let i=0;i<images.length;i++){

        if(i>0){

            pdf.addPage();

        }

        const img =
        new Image();

        img.src =
        images[i];

        await new Promise(resolve=>{

            img.onload =
            resolve;

        });

        const pageWidth =
        pdf.internal.pageSize.getWidth();

        const pageHeight =
        pdf.internal.pageSize.getHeight();

        let width =
        img.width;

        let height =
        img.height;

        const ratio =
        Math.min(
            pageWidth/width,
            pageHeight/height
        );

        width *= ratio;
        height *= ratio;

        const x =
        (pageWidth-width)/2;

        const y =
        (pageHeight-height)/2;

        pdf.addImage(
            images[i],
            "JPEG",
            x,
            y,
            width,
            height
        );

    }

    pdf.save(
        "images-to-pdf.pdf"
    );

}
