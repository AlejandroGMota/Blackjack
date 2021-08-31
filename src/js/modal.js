export default function modal() {
    const btnInstrucciones=document.getElementById('instrucciones'),
    modalC=document.getElementById('modal-container'),
    modal = document.getElementById('modal'),
    cerrar = document.getElementById('close');

    btnInstrucciones.addEventListener('click',()=>{
        modalC.style.visibility = "visible";
        modal.style.transform= "translateY(0%)";
    });
    
    cerrar.addEventListener('click', () =>{
    modal.style.transform= "translateY(-150%)";
    setTimeout( ()=>{
        modalC.style.visibility='hidden';
        },810)
    });
   
    
};
