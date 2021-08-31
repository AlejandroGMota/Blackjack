export default function nuevoJuego() {
    let puntosTemp=0,puntosJugador,puntosComputadora, nombre_jugador;
    let statistics=[0,0,0,0,];
    let deck=[];
    let ordenDeck=[];
    let calcularCartas=[];
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
    crearDeck();
    const crearDeckRandom=()=>{
        for (let index = 1; index <= 52; index++) {
            const n=Math.round((Math.random()*103)/2);
            if (deck[n]){
                ordenDeck.push(deck[n]);
                deck.splice(n,1)
            }else{
            const n2=Math.round((deck.length-1)/2)
            ordenDeck.push(deck[n2]);
            deck.splice(n2,1)
            }            
        }
        return ordenDeck;
    }
    crearDeckRandom();
    const pedirCarta=()=>{
        if (ordenDeck.length===0){
            throw 'No hay más cartas';
        }
        return ordenDeck.shift();
    } 
    const valorCarta=(carta)=>{
        const valor=carta.substring(0,carta.length-1);
        let puntos=0;
        if ( isNaN(valor)) {
            if (puntos=(valor==='A')) {
                puntos=11
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
    const calcularPuntos=()=>{
        puntosTemp=0
        let contador=0;        
        calcularCartas.forEach(element =>{
            puntosTemp=puntosTemp+valorCarta(element)
            switch (element) {
                case 'AC':
                    contador++;
                    break;
                case 'AH':
                    contador++;
                    break;
                case 'AD':
                    contador++;
                    break;
                case 'AS':
                    contador++;
                    break;
                default:
                    break;
            }
            return contador;
        }) 
        while(puntosTemp>21&&puntosTemp!=21&&contador>0){
            puntosTemp=puntosTemp-10;
            contador--;
        }
        return puntosTemp;
    }
    const turnoComputadora=(puntosMinimos)=>{
        calcularCartas=[];
        do{
            calcularCartas.push(ordenDeck[0])
            const carta=ordenDeck[0]
            pedirCarta();
            calcularPuntos();
            puntosComputadora=puntosTemp
            
            puntosHTML[5].innerText=puntosComputadora;
    
            const imgCarta=document.createElement('img');
            imgCarta.src=`cartas/${carta}.png`;
            imgCarta.classList.add('carta-computadora')
            
    
            let img2 = document.getElementById('back2');
            img2.style.visibility = 'hidden';
    
            divCartasComputadora.append(imgCarta) 
    
            if (puntosMinimos>21) {
                break
            }
        }
        while ((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21)) {  
        }
        setTimeout(() => {
            if (puntosComputadora===puntosMinimos){
                statistics[0]=statistics[0]+1;
                statistics[3]=statistics[3]+1;
                statisticsCount();
                guardarLocalStorage();
                alert('Empate')
            }else if (puntosMinimos>21){
                statistics[0]=statistics[0]+1;
                statistics[2]=statistics[2]+1;
                statisticsCount();
                guardarLocalStorage();
                alert('Perdiste')
            }else if (puntosComputadora>21){
                statistics[0]=statistics[0]+1;
                statistics[1]=statistics[1]+1;
                statisticsCount();
                guardarLocalStorage();
                alert('Ganaste')
            }else{
                statistics[0]=statistics[0]+1;
                statistics[2]=statistics[2]+1;
                statisticsCount();
                guardarLocalStorage();
                alert('Perdiste')
            }
        }, 200);
    }
    const btnIniciar=document.querySelector('#btnPlay'), 
    btnPedir=document.querySelector('#btnHit'), 
    btnDetener=document.querySelector('#btnStand'), 
    btnReset=document.querySelector('#btnReset'), 
    bntNombreJugador=document.querySelector("#btnPlayerName" ),
    btnResetStatistics=document.querySelector('#btnResetStatistics'), 
    puntosHTML=document.querySelectorAll('small'), //0 Puntos jugador, 1 Juegos Totales , 2 Juegos Ganados, 3 Juegos perdidos, 4 Juegos Empatados, 5 Puntos computadora,
    divCartasJugador=document.querySelector('#jugadorCartas'), 
    divCartasComputadora=document.querySelector('#computadoraCartas'),
    nombreJugador=document.querySelector('strong');

    const statisticsCount=()=>{
        puntosHTML[1].innerText=statistics[0];
        puntosHTML[2].innerText=statistics[1];
        puntosHTML[3].innerText=statistics[2];
        puntosHTML[4].innerText=statistics[3];
        nombreJugador.innerText=(statistics[4] ||"Jugador");
    }
    cargarLocalStorage()
    statisticsCount();
    
    btnDetener.disabled=true;
    btnPedir.addEventListener('click', ()=>{
        const carta=ordenDeck[0];
        calcularCartas.push(ordenDeck[0]);
        pedirCarta();
        calcularPuntos();
        puntosJugador=puntosTemp;
        
        btnDetener.disabled=false;
        
        puntosHTML[0].innerText=puntosJugador;
    
        const imgCarta=document.createElement('img')
        imgCarta.src=`cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasJugador.append(imgCarta)
    
        btnIniciar.disabled=true;
    
        let img1 = document.getElementById('back1');
        img1.style.visibility = 'hidden';
            
        if(puntosJugador>21){
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);
        }else if (puntosJugador===21){ 
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);
        }
    
    });
    btnIniciar.addEventListener('click', ()=>{
        const carta=ordenDeck[0];
        calcularCartas.push(ordenDeck[0]);
        pedirCarta();
        calcularPuntos();
        puntosJugador=puntosTemp;
        puntosHTML[0].innerText=puntosJugador;
    
        const imgCarta=document.createElement('img')
        imgCarta.src=`cartas/${carta}.png`;
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
    });
    btnDetener.addEventListener('click', () =>{
        btnDetener.disabled=true;
        btnPedir.disabled=true;
    
        turnoComputadora(puntosJugador);
    });
    btnReset.addEventListener('click',()=> {
        console.clear();
        ordenDeck=[]
        calcularCartas=[];
        crearDeck();
        crearDeckRandom();
        
        puntosComputadora=0;
        puntosJugador=0;
    
        puntosHTML[0].innerHTML=0;
        puntosHTML[5].innerHTML=0;
    
    
        divCartasComputadora.innerHTML='';
        divCartasJugador.innerHTML='';
    
        btnPedir.disabled=false;
        btnIniciar.disabled=false;
        btnDetener.disabled=true;
    
        let img1 = document.getElementById('back1');
        img1.style.visibility = 'visible';
        img1.style.width = '250px';
    
        let img2 = document.getElementById('back2');
        img2.style.visibility = 'visible';
        img2.style.width = '250px';
    
    }),
    bntNombreJugador.addEventListener('click', ()=>{
        nombre_jugador = prompt ('Introduzca su nombre');  
        if(nombre_jugador.length>16){
            nombre_jugador=nombre_jugador.substring(0,16);
        }

        statistics[4]=nombre_jugador;
        guardarLocalStorage();
        nombreJugador.innerText=statistics[4];
    });
    btnResetStatistics.addEventListener('click',()=>{
        nombre_jugador=statistics[4];
        localStorage.removeItem('statistics')
        statistics=[0,0,0,0,];
        statistics[4]=nombre_jugador;
        statisticsCount();
        guardarLocalStorage();
    });

    function guardarLocalStorage(){
        localStorage.setItem('statistics', JSON.stringify(statistics))
    }
    function cargarLocalStorage(){
        const statisticsCargados=JSON.parse(localStorage.getItem('statistics'));
        if(statisticsCargados){
            statistics=statisticsCargados;
        } 
    }
};


