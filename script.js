// ===============================
// MARKANE CUP GAME ENGINE
// ===============================


// YOUR 8 TEAMS
// Later we will move this into teams.json

let teams = [

{
name:"Breadlandia",
rating:89,
flag:""
},

{
name:"Edan Island",
rating:82,
flag:""
},

{
name:"K-Folkship",
rating:86,
flag:""
},

{
name:"Pigionia",
rating:76,
flag:""
},

{
name:"Poopland",
rating:73,
flag:""
},

{
name:"Bubbytopia",
rating:84,
flag:""
},

{
name:"Pigland",
rating:79,
flag:""
},

{
name:"Hacker-Ehh Land",
rating:81,
flag:""
}

];



let selectedTeam = null;

let tournamentTeams = [];

let currentRound = [];

let winners = [];

let userWon = false;



// LOAD TEAMS

const teamContainer =
document.getElementById("teams");


teams.forEach(team=>{


let card =
document.createElement("div");


card.className="team";


card.innerHTML=`

<h2>${team.name}</h2>

<p>⭐ ${team.rating}</p>

`;


card.onclick=function(){

document
.querySelectorAll(".team")
.forEach(t=>t.classList.remove("selected"));


card.classList.add("selected");


selectedTeam=team;


};


teamContainer.appendChild(card);


});





// START BUTTON


document
.getElementById("startButton")
.onclick=function(){


if(selectedTeam==null){

alert("Select a team first!");

return;

}



startTournament();


};





// CREATE RANDOM TOURNAMENT


function startTournament(){


tournamentTeams =
shuffle([...teams]);


document
.getElementById("menu")
.classList.add("hidden");


document
.getElementById("tournament")
.classList.remove("hidden");


showBracket();


}




function shuffle(array){

return array.sort(
()=>Math.random()-0.5
);

}





// DISPLAY BRACKET


function showBracket(){


let bracket =
document.getElementById("bracket");


bracket.innerHTML="";


for(let i=0;i<8;i+=2){


let game =
document.createElement("div");


game.className="match";


game.innerHTML=`

<h3>
${tournamentTeams[i].name}

VS

${tournamentTeams[i+1].name}

</h3>

<button onclick="playMatch(${i})">
Play Match
</button>

`;

bracket.appendChild(game);


}


}





// PLAY MATCH


function playMatch(index){


let teamA =
tournamentTeams[index];


let teamB =
tournamentTeams[index+1];



document
.getElementById("tournament")
.classList.add("hidden");



document
.getElementById("match")
.classList.remove("hidden");



document
.getElementById("matchTitle")
.innerHTML=
teamA.name+" VS "+teamB.name;



simulateMatch(teamA,teamB);


}






// MATCH SIMULATION


function simulateMatch(teamA,teamB){


let scoreA=0;

let scoreB=0;


let seconds=10;

let minute=0;



let clock =
document.getElementById("clock");


let score =
document.getElementById("score");


let events =
document.getElementById("events");



events.innerHTML="";



let timer=setInterval(()=>{


minute+=9;


clock.innerHTML=
minute+"'";



// RANDOM GOAL CHANCE


if(Math.random()<0.18){


if(Math.random()<0.5){

scoreA++;

events.innerHTML +=

"<p>⚽ GOAL! "+teamA.name+"</p>";

}

else{

scoreB++;

events.innerHTML +=

"<p>⚽ GOAL! "+teamB.name+"</p>";

}



score.innerHTML=
scoreA+" - "+scoreB;


}




if(minute>=90){


clearInterval(timer);


finishMatch(
teamA,
teamB,
scoreA,
scoreB
);


}


},1000);


}





// END MATCH


function finishMatch(
teamA,
teamB,
scoreA,
scoreB
){



let winner;



if(scoreA>scoreB){

winner=teamA;

}

else if(scoreB>scoreA){

winner=teamB;

}

else{


// PENALTIES


if(Math.random()<0.5){

winner=teamA;

}

else{

winner=teamB;

}


document
.getElementById("events")
.innerHTML +=

"<p>🥅 Penalty Shootout!</p>";

}



document
.getElementById("events")
.innerHTML +=

"<h2>Winner: "+winner.name+"</h2>";



setTimeout(()=>{


document
.getElementById("match")
.classList.add("hidden");


document
.getElementById("tournament")
.classList.remove("hidden");


alert(
winner.name+
" advances!"
);



},3000);



}
