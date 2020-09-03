/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 /*------------------------DECLARO VARIABLES Y OBJETOS------------------------*/

 let player1 = {

    profilePicture : "",
    name : "",
    nickname : "",
    score : 0,
    scoreTateti: 0,
    scoreMemotest: 0,
    scoreSopaDeLetras: 0
 };

 let player2 = {

    profilePicture : "",
    name : "",
    nickname : "",
    score : 0,
    scoreTateti: 0,
    scoreMemotest: 0,
    scoreSopaDeLetras: 0
 };

 let tatetiStorage = {

    board : "",
    gamesO : 0,
    gamesX : 0,
    turn : false,
    moves : 0,

 };

 let memotestStorage = {


 }

 let sopadeLetrasStorage = {


 }
 
 /*------------------------FUNCIONES DE WELCOME------------------------*/

 /*------------------------FUNCIONES DE SETPLAYERS------------------------*/

 function generatePlayers () {

    //let turn = true;
    player1.name = document.getElementById("nameP1").value;
    player1.nickname = document.getElementById("nickNameP1").value;

    player2.name = document.getElementById("nameP2").value;
    player2.nickname = document.getElementById("nickNameP2").value;
 }

 function generatePlayer1()
{
    player1.name = document.getElementById("nameP1").value;
    player1.nickname = document.getElementById("nickNameP1").value;
    localStorage.setItem("player1", JSON.stringify(player1));
    window.location = "setPlayer2.html";

    //para verificar si la función está guardando los datos;
    //document.getElementById("txt1").innerHTML=player1.name + player1.nickname;
    //getInfoFromStorage();
    
}   

function generatePlayer2()
{
    player2.name = document.getElementById("nameP2").value;
    player2.nickname = document.getElementById("nickNameP2").value;
    localStorage.setItem("player2", JSON.stringify(player2));
    window.location = "index.html";

    //para verificar si la función está guardando los datos;
    //document.getElementById("txt2").innerHTML=player2.name + player2.nickname;
    
}   

function getInfoFromStorage() {

    let player1 = JSON.parse (localStorage.getItem("player1"));
    let player2 = JSON.parse (localStorage.getItem("player2"));

    console.log(player1);
    console.log(player2);
}

 /*------------------------FUNCIONES DE INDEX------------------------*/
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        let btn = document.getElementById("imgPlayer1");
        btn.onclick = takePicture;
        
    }


};

app.initialize();



function takePicture() {

    navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
        destinationType: Camera.DestinationType.DATA_URL,
        correctOrientation: true
    });
    
    function onSuccess(imageData) {
        var image = document.getElementById("myImage");
        image.src = "data:image/jpeg;base64," + imageData;
    }
    
    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function displayWelcome () {

    if (player1.name != "" || player2.name != "") {

        document.getElementById(welcome).innerHTML = "culo";
    }
}

/*------------------------FUNCIONES DE CONFIGURATION------------------------*/

function deleteAllPlayers () {

    localStorage.clear ();
}

function deletePlayer1 () {

    localStorage.removeItem("player1");
}

function deletePlayer2 () {

    localStorage.removeItem("player2");
}
