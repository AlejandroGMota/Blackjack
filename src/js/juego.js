export const nuevoJuego=(()=>{
    let deck=[];
    let ordenDeck=[];
    const tipos= ['C','D','H','S'];
    const especiales= ['A','J','Q','K'];
    const crearDeck=()=>{
        for (let i=2; i<=10; i++) {
            for (let tipo of tipos) {
            deck.push(i+tipo)
            }
        }
        for (let tipo of tipos){
            for (let esp of especiales){
            deck.push(esp+tipo)
            }
        }
        return deck;
    }
    const crearDeckRandom=()=>{
        for (let index = 1; index <= 52; index++) {
            const n=Math.round((Math.random()*103)/2);
            if (deck[n]){
                ordenDeck.push(deck[n]);
                deck.splice(n,1)
            }else{
            const n2=deck.length-1
            ordenDeck.push(deck[n2]);
            deck.splice(n2,1)
            }            
        }
        
        return ordenDeck;
    }
    crearDeck();
    crearDeckRandom();
    const pedirCarta=()=>{
        if (ordenDeck.length===0){
            throw 'No hay más cartas';
        }
        return ordenDeck.pop();
    } 
    const valorCarta=(carta)=>{
        const valor=carta.substring(0,carta.length-1);
        let puntos=0;
        if ( isNaN(valor)) {
            if (puntos=(valor==='A')) {
                puntos=11; //hacer que valga 11 0 1
            }
            else{
                puntos=10;
            }
        }
        else{
            puntos=valor*1;
        }
        return puntos;
    }
    const valor=valorCarta(pedirCarta());
    const turnoComputadora=(puntosMinimos)=>{
        do{
            const carta=pedirCarta();
            puntosComputadora=puntosComputadora+valorCarta(carta);
            puntosHTML[1].innerText=puntosComputadora;
    
            const imgCarta=document.createElement('img');
            imgCarta.src=`src/cartas/${carta}.png`;
            imgCarta.classList.add('carta')
            
    
            let img2 = document.getElementById('back2');
            img2.style.visibility = 'hidden';
            img2.style.width = '0px';
            img2.style.left= '0px';
            img2.style.marginLeft = '0px';
    
            divCartasComputadora.append(imgCarta) 
    
            if (puntosMinimos>21) {
                break
            }
        }
        while ((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21)) {    
        }
    
        setTimeout(() => {
            if (puntosComputadora===puntosMinimos){
                alert('Empate')
            }else if (puntosMinimos>21){
                alert('Perdiste')
            }else if (puntosComputadora>21){
                alert('Ganaste')
            }else{
                alert('Perdiste')
            }
        }, 100);
    }
    
    document.querySelector('header').innerText='Blackjack 21'
    
    let puntosJugador=0, puntosComputadora=0, nombre_jugador;
    const btnIniciar=document.querySelector('#btnPlay'), 
    btnPedir=document.querySelector('#btnHit'), 
    btnDetener=document.querySelector('#btnStand'), 
    btnReset=document.querySelector('#btnReset'), 
    bntNombreJugador=document.querySelector("#btnPlayerName" ), 
    puntosHTML=document.querySelectorAll('small'), 
    divCartasJugador=document.querySelector('#jugadorCartas'), 
    divCartasComputadora=document.querySelector('#computadoraCartas')

    btnDetener.disabled=true;
    
    btnPedir.addEventListener('click', ()=>{
        const carta=pedirCarta();

        btnDetener.disabled=false;

        
        puntosJugador=puntosJugador+valorCarta(carta);
        puntosHTML[0].innerText=puntosJugador;
    
        const imgCarta=document.createElement('img')
        imgCarta.src=`src/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasJugador.append(imgCarta)
    
        btnIniciar.disabled=true;
    
        let img1 = document.getElementById('back1');
        img1.style.visibility = 'hidden';
        img1.style.width = '0px';
        img1.style.left= '0px';
        img1.style.marginLeft = '0px';
    
        if(puntosJugador>21){
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);
        }else if (puntosJugador===21){ 
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);
        }
    
    })
    btnIniciar.addEventListener('click', ()=>{
        const carta=pedirCarta();

        
        puntosJugador=puntosJugador+valorCarta(carta);
        puntosHTML[0].innerText=puntosJugador;
    
        const imgCarta=document.createElement('img')
        imgCarta.src=`src/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
    
        let img1 = document.getElementById('back1');
        img1.style.visibility = 'hidden';
        img1.style.width = '0px';
        img1.style.left= '0px';
        img1.style.marginLeft = '0px';
    
    
        divCartasJugador.append(imgCarta)
        btnDetener.disabled=false;
    
        if(puntosJugador>2){
            btnIniciar.disabled=true;
        }
    })
    btnDetener.addEventListener('click', () =>{
        btnDetener.disabled=true;
        btnPedir.disabled=true;
    
        turnoComputadora(puntosJugador);
    })
    btnReset.addEventListener('click',()=> {
        console.clear();
        deck=crearDeck();
        puntosComputadora=0;
        puntosJugador=0;
    
        puntosHTML[0].innerHTML=0;
        puntosHTML[1].innerHTML=0;
    
    
        divCartasComputadora.innerHTML='';
        divCartasJugador.innerHTML='';
    
        btnPedir.disabled=false;
        btnIniciar.disabled=false;
        btnDetener.disabled=true;
    
        let img1 = document.getElementById('back1');
        img1.style.visibility = 'visible';
        img1.style.width = '150px';
        img1.style.left= '125px';
    
        let img2 = document.getElementById('back2');
        img2.style.visibility = 'visible';
        img2.style.width = '150px';
        img2.style.left= '125px';
    
    })
    bntNombreJugador.addEventListener('click', ()=>{
        nombre_jugador = prompt ('Introduzca su nombre');
    
        document.querySelector('strong').innerText=nombre_jugador;
    })
    
})();


