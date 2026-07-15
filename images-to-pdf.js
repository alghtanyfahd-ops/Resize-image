const pdfImageInput =
document.getElementById("pdfImageInput");


const pdfPreview =
document.getElementById("pdfPreview");


const pdfButton =
document.getElementById("convertPdfBtn");


let pdfImages = [];



if(pdfImageInput){


pdfImageInput.addEventListener(
"change",
function(e){


    pdfPreview.innerHTML = "";

    pdfImages = [];


    Array.from(e.target.files)
    .forEach(file=>{


        const reader =
        new FileReader();


        reader.onload =
        function(event){


            pdfImages.push(
                event.target.result
            );


            const img =
            document.createElement("img");


            img.src =
            event.target.result;


            img.style.width =
            "120px";


            img.style.margin =
            "5px";


            img.className =
            "pdf-preview-image";


            pdfPreview.appendChild(img);


        };


        reader.readAsDataURL(file);


    });


});

}




if(pdfButton){


pdfButton.addEventListener(
"click",
createPDF
);


}



async function createPDF(){


    if(pdfImages.length===0){


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



    for(
        let i=0;
        i<pdfImages.length;
        i++
    ){


        if(i>0){

            pdf.addPage();

        }



        const img =
        new Image();


        img.src =
        pdfImages[i];



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
            pageWidth / width,
            pageHeight / height
        );



        width *= ratio;

        height *= ratio;



        const x =
        (pageWidth-width)/2;



        const y =
        (pageHeight-height)/2;



        pdf.addImage(
            pdfImages[i],
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
