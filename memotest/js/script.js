//Declaración de variables 

// Banderas seleccionables;
let flags = [
    {
        "country": "img/america/argentina.svg",
        "value": 0,
        "name": "Argentina"
    },
    {
        "country": "img/oceania/australia.svg",
        "value": 1,
        "name": "Australia"
    },
    {
        "country": "img/europe/belgium.svg",
        "value": 2,
        "name": "Belgica"
    },
    {
        "country": "img/america/brazil.svg",
        "value": 3,
        "name": "Brasil"
    },
    {
        "country": "img/america/canada.svg",
        "value": 4,
        "name": "Canada"
    },
    {
        "country": "img/europe/croatia.svg",
        "value": 5,
        "name": "Croacia"
    },
    {
        "country": "img/europe/czechrepublic.svg",
        "value": 6,
        "name": "Republica Checa"
    },
    {
        "country": "img/europe/france.svg",
        "value": 7,
        "name": "Francia"
    },
    {
        "country": "img/europe/germany.svg",
        "value": 8,
        "name": "Alemania"
    },
    {
        "country": "img/europe/greece.svg",
        "value": 9,
        "name": "Grecia"
    },
    {
        "country": "img/asia/japan.svg",
        "value": 10,
        "name": "Japon"
    },
    {
        "country": "img/europe/netherlands.svg",
        "value": 11,
        "name": "Holanda"
    },
    {
        "country": "img/asia/southkorea.svg",
        "value": 12,
        "name": "Corea del Sur"
    },
    {
        "country": "img/europe/spain.svg",
        "value": 13,
        "name": "España"
    },
    {
        "country": "img/europe/sweden.svg",
        "value": 14,
        "name": "Suecia"
    },
    {
        "country": "img/europe/switzerland.svg",
        "value": 15,
        "name": "Suiza"
    },
    {
        "country": "img/europe/ukraine.svg",
        "value": 16,
        "name": "Ucrania"
    },
    {
        "country": "img/america/unitedstates.svg",
        "value": 17,
        "name": "Estados Unidos"
    },
];

let player = 1; // jugador;
let matrix = []; // tamaño del tablero;
let positions = []; // guardo las posiciones de la matriz en un objeto;
let selected = []; // guardo los valores de las matriz para compararlos y buscar la imagen que corresponda;
let idKeep = []; // guardo los id de las imagenes;
let tableSize = 0; // tamaño de la tabla;
let pairs = 0; // contador de pares;
/*let scoreOne = 0; // puntaje del jugador 1;
let scoreTwo = 0; // puntaje del jugador 2;*/
let keepPlaying = true; // estado del juego ;
let theme = 0; 
let player1 = JSON.parse (localStorage.getItem("player1"));
let player2 = JSON.parse (localStorage.getItem("player2"));
/*let player1 = JSON.parse(localStorage.getItem("player1"));
let player2 = JSON.parse(localStorage.getItem("player2"));*/
let values = 0; // guarda el valor de la posición de la matriz para saber que bandera seleccionar;
let idFind = 0; // guarda el id donde se hizo click para saber donde colocar la bandera;
let matches = 0; // partidas jugadas;
let matchesOne = 0; // partidas ganadas por jugador uno;
let matchesTwo = 0; // partidas ganadas por jugador dos;
let ties = 0; // partidas empatadas;
let rightChoice = document.getElementById("rightChoice"); // Estas variables que toman un ID son las de sonido;
let flipCard = document.getElementById("flipCard");
let playerOneWins = document.getElementById("playerOneWins");
let playerTwoWins = document.getElementById("playerTwoWins");
let soundState = true; // booleano para activar/desactivar el sonido;
let pickFlags = 0; // variable el select de las banderas;

// Funciones;

function startGame(){ // Función que se ejecuta al cargar la página;
    playerName(); // 
    createTable(); // 
}

// Comento la función para cambiar el tema de fondo;
/*function changeTheme(){
    theme = document.getElementById("theme").value;
    if(theme == "blueSpace"){
        document.getElementById("body").classList.add("space");
    } 
    if(theme == "aurora"){
        document.getElementById("body").classList.add("aurora");
    }
}*/

function changePlayer(){  // Función que cambia de jugador
    if(player == 1){
        player = 2;
        document.getElementById("1").classList.remove("player");
        document.getElementById("2").classList.add("player");
        document.getElementById("1").classList.remove("player");
    } else if(player == 2){
        player = 1;
        document.getElementById("1").classList.add("player");
        document.getElementById("2").classList.remove("player");
    }
}

function createTable(){ // Función que crea la tabla
    generateMatrix(); // Ejecuta la función que genera la matriz 
    tiles(); // Ejecuta la función que asigna valores de a pares a las posiciones de la matriz
    selected = []; // Vacia el array que guarda los valores de las fichas seleccionadas 
    idKeep = []; // Vacia el array que guarda los ID de las fichas seleccionadas
    document.getElementById("container").innerHTML = "";
    for(i=0;i<tableSize;i++){
        document.getElementById("container").innerHTML += "<div class='align' id='row"+i+"'></div>";
        for(j=0;j<tableSize;j++){ // Crea los divs necesarios para el efecto de voltear la ficha. Asigna un onclick que va a ejecutar la función game() pasando tres parametros: ID, posición 1 de la matriz y posición 2 de la matriz. Cuando termina de crear todos los divs, se ejecuta la función putFlag() pasando los mismos tres parametros: posición 1 de la matriz, posición 2 de la matriz e ID.
            document.getElementById("row"+i).innerHTML += "<div class='flip-card' onclick='game(\"img"+i+j+"\","+[i]+","+[j]+")'><div id='img"+i+j+"' class='flip-card-inner'><div class='flip-card-front'><img width='100px' ></div><div class='flip-card-back'></div></div>";
            putFlag(i,j,"img"+i+j+""); 
        }
    }
}

function generateMatrix(){ // Función que genera la matriz según el valor del select
    tableSize = parseInt(document.getElementById("pick").value); // Toma el valor del select de tabla.
    matrix = []; // Vacia el array de la matriz
    positions = []; // Vacia el array el array de posiciones
    for(i=0;i<tableSize;i++){
        matrix.push([]);
        for(j=0;j<tableSize;j++){
            matrix[i].push(0);
            positions.push({"row":i, "col":j});
        }
    }
    shuffler(positions); // Se mezclan el array de posiciones
}

function tiles(){ // Función que asigna valores de a pares
    if(tableSize % 2 == 0){ // Si el tamaño de la tabla es par
        for(i=0;i<Math.floor((tableSize*tableSize)/2);i++){
            matrix[positions[i].row][positions[i].col] = flags[i].value;
            matrix[positions[i+1].row][positions[i+1].col] = flags[i].value;
            positions.splice(0,1); // Remueve la posicion i actual para que no se sobrescriba en el próximo ciclo del for. Sin hacerlo, el resultado sería: 0, 1, 2, 3...en vez de 0, 0, 1, 1, 2, 2...
        }
    } else if(tableSize % 2 !== 0){ // Si el tamaño de la tabla es impar
        for(i=0;i<Math.floor((tableSize*tableSize)/2);i++){
            matrix[positions[i].row][positions[i].col] = flags[i].value;
            matrix[positions[i+1].row][positions[i+1].col] = flags[i].value;
            positions.splice(0,1);
        }
        for(i=0;i<matrix.length;i++){ // Busca uno de los 0 que se repite y lo cambia por el valor 17 (para la ficha especial de la tabla 5x5. Cuando termina de llenar los valores de a pares, al valor impar restante lo llena con un 0. Por eso quedan tres 0 en vez de dos.)
            if(matrix[i].indexOf(0) !== -1){ // indexOf busca si hay un 0. Devuelve -1 al no encontrarlo. 
                let x = matrix[i].indexOf(0);
                matrix[i][x] = flags[17].value;
                break // Cuando llegue a está línea, nunca más vuelve a entrar en el IF. Sin el break, podría reemplazar más de un 0 si se encuentra en el mismo array. Se usa para que el condicional se ejecute solo una vez. 
            }
        }
    }
}

function putFlag(pos1,pos2,id){ // Función que coloca la bandera correspondiente 
    values = matrix[pos1][pos2]; // variable que guarda el valor que hay en esa posición de la matriz.
    idFind = id; // variable que guarda el id del elemento donde se hizo click
    document.querySelector("#"+idFind+" div img").setAttribute("src", flags[values].country); // se coloca la bandera en el img que se encuentre dentro de un div que sea hijo de un elemento con el id que guarda la variable idFind.
}

function game(id,pos1,pos2){ // Función que ejecuta el juego

    rightChoice.volume = 0.1;

    if(keepPlaying == true){ 
        selected.push(matrix[pos1][pos2]); // guardo la posición de la matriz en la que se hizo click en el array selected
        idKeep.push(id); // guardo el id del elemento en el que se hizo click
        flip(idKeep); // función que muestra la bandera. Se pasa el array idKeep como parametro.
        bonus(); // función que se ejecuta si se encuentra la ficha especial de la tabla 5x5
        if(selected.length === 2){ // cuando el array que guarda las posiciones tenga dos posiciones dentro 
            keepPlaying = false; // no se puede hacer click en el resto de las fichas
            if(selected[0] === selected[1]){ // si los valores de las posiciones de la matriz dentro del array coinciden 
                rightChoice.play(); // sonido 
                selected = []; // vaciar el array para poder elegir otras dos posiciones
                idKeep = [];  // vaciar el array para obtener nuevos ids
                pairs = pairs + 1; // sumar uno al contador de pares que controla el estado del juego
                score(player); // ejecutar la función score, pasandole como parametro el jugador, de manera que le otorgue los puntos al jugador actual. 
                keepPlaying = true; // se puede volver a hacer click en las demas fichas
            } else{
                changePlayer(); // cambia el turno 
                setTimeout(back, 1000, idKeep); // ejecuta la función que vuelve a poner las fichas boca abajo con un retraso de un segundo para poder ver las fichas que se dieron vuelta.
                selected = []; 
                idKeep = []; 
            }
            if(pairs == Math.ceil((tableSize*tableSize)/2)){ // El Math.ceil está para que la ficha especial de la tabla 5x5 cuente como un par, de forma que pairs al final valga 13.
                theEnd(); 
                matchesInfo();
            }  
        }
    }
}

function flip(idKeep){ // funcion que da vuelta la ficha
    flipCard.volume = 0.2; // volumen del sonido
    if(selected.length === 1){ // si selected tiene un valor dentro 
        flipCard.play(); // sonido
        document.getElementById(idKeep[0]).parentElement.classList.add("noMoreClicks"); // asigna clase para que no se pueda hacer click
        document.getElementById(idKeep[0]).classList.add("showCard"); // añade la clase que rota la ficha
    } else{ 
        flipCard.play();
        document.getElementById(idKeep[1]).parentElement.classList.add("noMoreClicks")
        document.getElementById(idKeep[1]).classList.add("showCard"); 
    }
}

function back(idKeep){ // función que vuelve a poner las fichas boca abajo
        document.getElementById(idKeep[0]).classList.remove("showCard");
        document.getElementById(idKeep[0]).parentElement.classList.remove("noMoreClicks")
        document.getElementById(idKeep[1]).classList.remove("showCard");
        document.getElementById(idKeep[1]).parentElement.classList.remove("noMoreClicks");
        keepPlaying = true;  
}

function score(player){ // función que otorga puntajes según el tamaño de la tabla
    if(player == 1){
        if(tableSize == 4){
            player1.scoreMemotest =  player1.scoreMemotest + 10;
            document.getElementById(player).innerHTML = player1.name + " " + ":" + " " +  player1.scoreMemotest + " " + "puntos";
        } else if(tableSize == 5){
            player1.scoreMemotest =  player1.scoreMemotest + 50;
            document.getElementById(player).innerHTML = player1.name + " " + ":" + " " +  player1.scoreMemotest + " " + "puntos"; 
        } else if(tableSize == 6){
            player1.scoreMemotest =  player1.scoreMemotest + 100;
            document.getElementById(player).innerHTML = player1.name + " " + ":" + " " +  player1.scoreMemotest + " " + "puntos";
        }
    } else if(player == 2){
        if(tableSize == 4){
            player2.scoreMemotest = player2.scoreMemotest + 10;
            document.getElementById(player).innerHTML = player2.name + " " + ":" + " " + player2.scoreMemotest + " " + "puntos";
        } else if(tableSize == 5){
            player2.scoreMemotest = player2.scoreMemotest + 50;
            document.getElementById(player).innerHTML = player2.name + " " + ":" + " " + player2.scoreMemotest + " " + "puntos";
        } else if(tableSize == 6){
            player2.scoreMemotest = player2.scoreMemotest + 100;
            document.getElementById(player).innerHTML = player2.name + " " + ":" + " " + player2.scoreMemotest + " " + "puntos";
        }
    }
}

function theEnd(){ // Función que anuncia si alguien ganó o si hubo empate.

    let container = document.createElement("div");
    document.getElementById("container").appendChild(container);
    container.setAttribute("id", "infoDiv")
    let text = document.createElement("p");
    container.appendChild(text);
    text.setAttribute("id", "infoStyle");
    let playAgain = document.createElement("p");
    container.appendChild(playAgain);
    playAgain.innerHTML = "¿Desea volver a jugar?";
    playAgain.setAttribute("id", "playAgain");

    let buttonsContainer = document.createElement("div");
    container.appendChild(buttonsContainer);
    buttonsContainer.setAttribute("id", "buttons");

   /* let buttonTwo = document.createElement("button");
        buttonsContainer.appendChild(buttonTwo);
        buttonTwo.innerHTML = "Cambiar jugadores";
        buttonTwo.setAttribute("id", "changeNames");
        buttonTwo.setAttribute("onclick", "resetPlayers()");*/

    let buttonTwo = document.createElement("button");
        buttonsContainer.appendChild(buttonTwo);
        buttonTwo.innerHTML = "Volver a jugar";
        buttonTwo.setAttribute("id", "newGame"); //esta linea hace que se rompa el código, porque cuando almaceno una victoria de Martina, al primer movimiento de la siguiente partida hace un check e interpreta que ganó;
        buttonTwo.setAttribute("onclick", "startGame()");

    let buttonOne = document.createElement("button");
    buttonsContainer.appendChild(buttonOne);
    buttonOne.innerHTML = "Reiniciar";
    buttonOne.setAttribute("id", "reset");
    buttonOne.setAttribute("onclick", "reset()");

    

    if( player1.scoreMemotest >  player2.scoreMemotest){
        playerOneWins.volume = 0.2;
        playerOneWins.play();
        text.innerHTML = "¡" + player1.name + " " + "ganó!";
        document.getElementById("1").classList.add("winner");
    } else if( player1.scoreMemotest <  player2.scoreMemotest){
        playerTwoWins.volume = 0.2;
        playerTwoWins.play();
        text.innerHTML = "¡" + player2.name + " " + "ganó!";
        document.getElementById("2").classList.add("winner");
    } else{
        text.innerHTML = "empate";
    }
}

function shuffler (array) { // función que mezcla el array de posiciones

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

function reset(){ // Función que reinicia el juego y puntajes
    if( player1.scoreMemotest >  player2.scoreMemotest){
        document.getElementById("1").classList.remove("winner");
    } else if( player1.scoreMemotest <  player2.scoreMemotest){ 
        document.getElementById("2").classList.remove("winner");
    }
    createTable();
    pairs = 0;
    /*player1.scoreMemotest = 0;
    player2.scoreMemotest = 0;*/
    selected = [];
    idKeep = [];
    document.getElementById("1").innerHTML = player1.name;
    document.getElementById("2").innerHTML = player2.name; 
}

function playerName(){ // Función que pide los nombres a los jugadores;

    document.getElementById("1").innerHTML = player1.name;
    document.getElementById("2").innerHTML = player2.name;
}

function resetPlayers(){ // Función que reinicia el estado de los jugadores
    playerName();
    player1.scoreMemotest = 0;
    player2.scoreMemotest = 0;
    matches = 0;
    matchesOne = 0;
    matchesTwo = 0;
    ties = 0;
    reset();
}

function bonus(){ // Función para la ficha especial de la tabla 5x5
    if(selected[0] == 17 && tableSize == 5){ // Si esa ficha fue la primera en darse vuelta de las dos
        pairs = pairs + 1; // Se cuenta como par
        selected = []; // Se vacia el array
        idKeep = []; // Se vacia el array
        keepPlaying = true; // Se puede seguir jugando
        alert("Encontraste la ficha bonus!")
        bonusScore(player); // Puntaje extra
    } else if(selected[1] == 17 && tableSize == 5){ // Si esa ficha fue la segunda en darse vuela de las dos
        pairs = pairs + 1;
        document.getElementById(idKeep[0]).classList.remove("showCard"); // Se vuelve a esconder la primer ficha que se dio vuelta
        document.getElementById(idKeep[0]).parentElement.classList.remove("noMoreClicks"); // Se vuelve a permitir el click en la primer ficha que se dio vuelta
        selected = [];
        idKeep = [];
        keepPlaying = true;
        alert("Encontraste la ficha bonus!");
        bonusScore(player);
    }
}

function bonusScore(player){ // Puntaje extra
    if(player == 1){
        player1.scoreMemotest =  player1.scoreMemotest + 100;
        document.getElementById(player).innerHTML = player1.name + " " + ":" + " " +  player1.scoreMemotest + " " + "puntos";
    } else if(player == 2){
        player2.scoreMemotest =  player2.scoreMemotest + 100;
        document.getElementById(player).innerHTML = player2.name + " " + ":" + " " +  player1.scoreMemotest + " " + "puntos";
    }
}

function matchesInfo(){ // Información de las partidas jugadas
    matches = matches + 1;
    //document.getElementById("matches").innerHTML = "Partidas jugadas:" + " " + matches;
    if( player1.scoreMemotest >  player2.scoreMemotest){
        matchesOne = matchesOne + 1;
        document.getElementById("matchesOne").innerHTML = "Partidas ganadas por" + " " + player1.name + ":" + " " + matchesOne;
    } else if( player2.scoreMemotest >  player1.scoreMemotest){
        matchesTwo = matchesTwo + 1;
        document.getElementById("matchesTwo").innerHTML = "Partidas ganadas por" + " " + player2.name + ":" + " " + matchesTwo;
    } else{
        ties = ties + 1;
        document.getElementById("ties").innerHTML = "Partidas empatadas:" + " " + ties;
    }
}

function soundControl(){ // Sonido para el juego 
    if(soundState == true){ // si el sonido esta activado
        soundState = false; 
        rightChoice.muted = true; // todos los sonidos con .muted = true se apagan
        flipCard.muted = true;
        playerOneWins.muted = true;
        playerTwoWins.muted = true;
        document.getElementById("soundControl").innerHTML = "Actilet sonido";
    } else{
        rightChoice.muted = false; // muted se desactiva
        flipCard.muted = false;
        playerOneWins.muted = false;
        playerTwoWins.muted = false;
        document.getElementById("soundControl").innerHTML = "Desactilet sonido";
    }
}