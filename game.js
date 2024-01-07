var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

// creating a function to play sound
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

//creating function for animation
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

//detecting when key is pressed
 $(document).on("keydown",function(){
    if(!started){ //checking if(negation of started is true or not)
        nextSequence();
        started=true;  //so that key is pressed only one time
    }
 });
   
function nextSequence(){
  
    //generating random number b/w 0-3
    var randomNumber =Math.floor(Math.random()*4);

    //selecting the colour based on generated number
    var randomChosenColour=buttonColours[randomNumber];

    //adding the random generated color into an empty array gamepattern
    gamePattern.push(randomChosenColour);
    
    //animation to blink the random genrated tile
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //adding sound on random genrated tile
    playSound(randomChosenColour);

    // changing the the h1 value each time nextSequence is called
    $("#level-title").text("Level "+level);
    // increasing level by 1 each time  nextSequence is called
    level++;
}

//detect is any button clicked
$(".btn").on("click",function(){

    var userChosenColour=this.id; //or can write $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    // playing sound for clicked button
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
})

//checking the random and user selected pattern are same (if not then game end)
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("sucess..");
       if(userClickedPattern.length===gamePattern.length){
        setTimeout(nextSequence,500);
       }
    }else{
        console.log("O no you clicked wrong button..!!");

        //playing wrong audio sound
        var audio2=new Audio("./sounds/wrong.mp3");
        audio2.play();

        //adding flash effect of red
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//if got wrong ans then restaring the game
function startOver(){
    started=false;
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}

