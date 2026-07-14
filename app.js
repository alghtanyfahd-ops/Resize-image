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

const downloadBtn =
document.getElementById("downloadBtn");



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


        };


        originalImage.src =
        event.target.result;


    };


    reader.readAsDataURL(file);


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



downloadBtn.addEventListener("click", function () {

    const dataUrl = canvas.toDataURL("image/jpeg",0.9);
    const win = window.open(dataUrl, "_blank");
    if(!win){
      location.href=dataUrl;
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
