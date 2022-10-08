  'use strict';

//selecting elements
const score0El=document.querySelector('#score--0');//with querySelector, dot is used for class and hash for id
const score1El=document.getElementById('score--1');//with getElementById no hash is used coz we are writing the name of id.//only querySelector uses hash or dot

const current0El=document.querySelector(`#current--0`);
const current1El=document.querySelector('#current--1');

const diceEl=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');  

const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');

let  currentScore,activePlayer,scores,playing;


//starting conditions
const init=function(){

currentScore=0;
activePlayer=0;
scores=[0,0];//total scores
playing=true;//set to false when u want to deactivate all buttons except new game

score0El.textContent=0;
score1El.textContent=0;
current0El.textContent=0;
current1El.textContent=0;

diceEl.classList.add('hidden');
player0El.classList.remove(`player--winner`);
player1El.classList.remove('player--winner');
player0El.classList.add('player--active');
player1El.classList.remove(`player--active`);

};

init();

const switchPlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
        currentScore=0;
        activePlayer=activePlayer===0?1:0;
        player0El.classList.toggle('player--active');
        player0El.classList.toggle('player--active');//toggle adds if not there and removes if it's there
}
//Rolling dice functionality

btnRoll.addEventListener('click',function(){
    if(playing){

   //1.Generating a random dice roll
   const dice=Math.trunc(Math.random()*6)+1;

   //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`;

    //3.Check for rolled 1:if true,switch to next player
    if(dice!==1){
        //add dice to next player
        currentScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    }
    else{
        //switch to next player
        switchPlayer();
    }
}});

btnHold.addEventListener(`click`,function(){
    if(playing){
    //1.Add current score to active player's score
    scores[activePlayer]+=currentScore; 

    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

    //2.Check if player's score>=100
    //Finish the game
if(scores[activePlayer]>=20){
    //Finish the game
   document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`); 
   document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
   playing=false;
   diceEl.classList.add(`hidden`);
}

//Switch to the next player
else{
switchPlayer();
}
}});

btnNew.addEventListener('click',init);//we dont call init function it is javascript which calls the function on click event