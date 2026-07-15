
let originalImage = null;

let originalWidth = 0;
let originalHeight = 0;

let ratio = 1;

const imageInput =
document.getElementById("imageInput");

const preview =
document.getElementById("preview");

const widthInput =
document.getElementById("width");

const heightInput =
document.getElementById("height");

const lockRatio =
document.getElementById("lockRatio");

const resizeBtn =
document.getElementById("resizeBtn");

const canvas =
document.getElementById("canvas");

const imageFormat =
document.getElementById("imageFormat");

const quality =
document.getElementById("quality");

const qualityValue =
document.getElementById("qualityValue");

const originalSize =
document.getElementById("originalSize");

const newSize =
document.getElementById("newSize");



// اختيار الصورة

imageInput.addEventListener(
"change",
function(e){

    const file =
    e.target.files[0];


    if(!file){
        return;
    }


    const reader =
    new FileReader();


    reader.onload =
    function(event){


        originalImage =
        new Image();


        originalImage.onload =
        function(){


            originalWidth =
            originalImage.width;


            originalHeight =
            originalImage.height;


            ratio =
            originalWidth /
            originalHeight;


            widthInput.value =
            originalWidth;


            heightInput.value =
            originalHeight;


            preview.src =
            event.target.result;


            preview.style.display =
            "block";
originalSize.textContent =
(file.size / 1024).toFixed(2) + " KB";

        };


        originalImage.src =
        event.target.result;


    };


    reader.readAsDataURL(file);


});
quality.addEventListener("input", function () {

    qualityValue.textContent =
    quality.value + "%";

});


// تغيير العرض مع الحفاظ على النسبة

widthInput.addEventListener(
"input",
function(){


    if(lockRatio.checked){


        heightInput.value =
        Math.round(
            widthInput.value / ratio
        );


    }

});



// تغيير الطول مع الحفاظ على النسبة

heightInput.addEventListener(
"input",
function(){


    if(lockRatio.checked){


        widthInput.value =
        Math.round(
            heightInput.value * ratio
        );


    }

});



// تنفيذ تغيير الحجم

resizeBtn.addEventListener(
"click",
function(){


    if(!originalImage){

        alert("Please select an image first");

        return;

    }


    const newWidth =
    Number(widthInput.value);


    const newHeight =
    Number(heightInput.value);



    if(
        !newWidth ||
        !newHeight
    ){

        return;

    }



    canvas.width =
    newWidth;


    canvas.height =
    newHeight;



    const ctx =
    canvas.getContext("2d");



    ctx.drawImage(

        originalImage,

        0,
        0,

        newWidth,
        newHeight

    );



    downloadBtn.disabled =
    false;


    preview.src =
    canvas.toDataURL(
        "image/jpeg",
        0.9
    );


});



downloadBtn.addEventListener("click", async function () {

    if (!canvas.width || !canvas.height) {
        alert("Please resize the image first");
        return;
    }

    const imageData = canvas.toDataURL("image/jpeg", 0.9);

    try {

        const response = await fetch("/api/download", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: imageData
        });

        if (!response.ok) {
            throw new Error("Download failed");
        }

        const blob = await response.blob();

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "resized-image.jpg";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => URL.revokeObjectURL(url), 1000);

    } catch (e) {

        console.error(e);
        alert("Download failed");

    }

});


window.enterApp = function(){

    const login =
    document.getElementById("loginPage");


    const app =
    document.getElementById("appPage");


    if(login){

        login.style.display="none";

    }


    if(app){

        app.classList.remove("hidden");

    }

};
// ===============================
// Images To PDF
// ===============================

const pdfImagesInput =
document.getElementById("pdfImagesInput");

const pdfPreview =
document.getElementById("pdfPreview");

const convertPdfBtn =
document.getElementById("convertPdfBtn");


let pdfImages = [];


// اختيار عدة صور

if(pdfImagesInput){

pdfImagesInput.addEventListener(
"change",
function(e){


    pdfImages = [];

    pdfPreview.innerHTML = "";


    const files =
    Array.from(e.target.files);



    files.forEach(function(file){


        if(!file.type.startsWith("image/")){
            return;
        }


        pdfImages.push(file);



        const reader =
        new FileReader();


        reader.onload =
        function(event){


            const img =
            document.createElement("img");


            img.src =
            event.target.result;


            img.style.width =
            "120px";


            img.style.margin =
            "5px";


            img.style.borderRadius =
            "8px";


            pdfPreview.appendChild(img);


        };


        reader.readAsDataURL(file);


    });


});

}



// تحويل الصور إلى PDF

if(convertPdfBtn){

convertPdfBtn.addEventListener(
"click",
async function(){


    if(pdfImages.length === 0){

        alert("Please select images first");
        return;

    }



    const formData =
    new FormData();



    pdfImages.forEach(function(image){

        formData.append(
            "images",
            image
        );

    });



    try{


        const response =
        await fetch("/api/images-to-pdf",{

            method:"POST",

            body:formData

        });



        if(!response.ok){

            throw new Error(
            "PDF creation failed"
            );

        }



        const blob =
        await response.blob();



        const url =
        URL.createObjectURL(blob);



        const a =
        document.createElement("a");


        a.href =
        url;


        a.download =
        "images.pdf";


        document.body.appendChild(a);


        a.click();


        document.body.removeChild(a);



        setTimeout(()=>{

            URL.revokeObjectURL(url);

        },1000);



    }
    catch(error){


        console.error(error);

        alert(
        "PDF conversion failed"
        );


    }


});

}
