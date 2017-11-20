var qNaList =[
	{
		q:"1. When was Astro Boy's first appearance?",
		a:"1951",
		b:"1970",
		c:"1955",
		d:"1958",
		correct:"a"
	},
	{
		q:"2. Who created Astro Boy?",
		a:"Atom Taishi",
		b:"Dr. Tenma",
		c:"Prof. Ochanomuizu",
		d:"Tetsuwan Atomu",
		correct:"b"	
	},
	{
		q:"3. Who is Astro Boy's relative?",
		a:"Mazinger Z",
		b:"Voltron",
		c:"Voltes V",
		d:"Astro Girl",	
		correct:"d"	
	},	
	{
		q:"4. How many episodes did the original 1963 series aired?",
		a:"200",
		b:"90", 
		c:"193",
		d:"187",	
		correct:"c"
	},
	{
		q:"5. What is Astro boy's name in Japanese?",
		a:"Tatsuko Hinata",
		b:"Tetsuwan Atomu",
		c:"Akane Chouko",
		d:"Katsuro Misaki",
		correct:"b"	
	},
	{
		q:"6. One of the seven-amazing powers of Astro boy is?",
		a:"The ability to tell if a person is good or evil",
		b:"Invisibility",
		c:"Telepathy",
		d:"The ability to foresee future",
		correct:"a"	
	},
	{
		q:"7. One of the major theme of the series? ",
		a:"Inter-Galactic forces",
		b:"Universal Protection",
		c:"Robot Rights",
		d:"Cosmic habitation",
		correct:"c"	
	},
	{
		q:"8. What does Astro boy's name Tetsuwan Atomu literally translates to?",
		a: "Flying Robot",
		b: "Atomic Robot",
		c: "Iron Arm Atom",
		d: "Teletubbies",
		correct:"c"
	},
	{
		q:"9. How many TV series have there been about Astro Boy?",
		a:"3 series: 1963, 1980, 2003",
		b:"4 series: 1951, 1977, 1987, 1995",
		c:"2 series: 1955, 1976",
		d:"1 series: 1963",
		correct:"a"
	},
	{
		q:"10. Who is Astro Boy's brother?",
		a:"Gundam",
		b:"Yukikaze",
		c:"Voltron",
		d:"Cobalt",
		correct:"d"
	}
];//------------------------------------------- objects in an array
var ans =[];
var ndx =0;
var intervalId = null;
var count = 10;
var score = 0;
var userClick = false;

function restart(){
	ans =[];
	ndx =0;
	intervalId = null;
	count = 10;
	score = 0;
}
function showScore(){

	$("#question").hide();
	$("#optionA").hide();
	$("#optionB").hide();
	$("#optionC").hide();
	$("#optionD").hide();
	$("#display").hide();
	$("#scoring_board").show();
	$("#scoring_board").text("Final Score: " + score + " out of 10");
	$("#image").show();
	$("#image").html("<img src='assets/images/astro_correct.jpg'>");
	$("#restart").show();

}

function showQnA(){
	$("#question").show();
	$("#optionA").show();
	$("#optionB").show();
	$("#optionC").show();
	$("#optionD").show();
	$("#display").show();

}

function hideQnA(){
	$("#question").hide();
	$("#optionA").hide();
	$("#optionB").hide();
	$("#optionC").hide();
	$("#optionD").hide();
	$("#display").hide();

}
// ---------------------------------------------- FXN Timer 
function timer(){
	if(intervalId != null){
			clearInterval(intervalId);
			intervalId = null;
		}
		count = 10;
		intervalId = setInterval(function(){
			count --;
			console.log(count);
			$("#display").text("Timer: " + count);
			if((count == 0) && (userClick === false)){
				clearInterval(intervalId);
				intervalId = null;
				ndx = ndx + 1;
				ans.push("");
//---------------------------------------------------- TIMES UP SHOULD SHOW
				hideQnA();
				$("#imageTimesUp").fadeIn(4000,function(){
					$("#imageTimesUp").hide();
				});
				if (ndx != qNaList.length){
					console.log(ans);
					window.setTimeout(function(){
						// ndx = ndx + 1;
						//timer();
						generateQnA();
					},4000);
				} else{
// Below is if the last question is not answered user should see final score & STOP GENERATE Q&A
					clearInterval(intervalId);
					intervalId = null;
					for (var i = 0; i < qNaList.length; i++){
						if (ans[i] === qNaList[i].correct){
							score = score + 1
							console.log("SCORE:---> "+score);
							showScore();
						}else{
							console.log("ELSE-SCORE---> "+score);
							showScore();
						}
					}
					return;
				}
				//----------------------------
			} 
		},1000);
}

//-------------------------------------------------------------- FXN generateQnA
function generateQnA(){
	console.log("generate function");
	if (ans.length === qNaList.length){
		console.log("FINISHED");
		clearInterval(intervalId);
		intervalId = null;
//----------------------------------------------------- should show the score and ask user to restart game.
		for (var i = 0; i < qNaList.length; i++){
			if (ans[i] === qNaList[i].correct){
				score = score + 1
				console.log("SCORE:---> "+score);
				showScore();
			}else{
				console.log("ELSE-SCORE---> "+score);
				showScore();
			}
		}
		return;
	} else {
		showQnA();
//----------------------------------------------------
		$("#question").html(qNaList[ndx].q);
		$("#optionA").text("A. "+ qNaList[ndx].a);
		$("#optionB").text("B. "+ qNaList[ndx].b);
		$("#optionC").text("C. "+ qNaList[ndx].c);
		$("#optionD").text("D. "+ qNaList[ndx].d);
		$("#restart").hide();
		userClick = false;
		timer();
	}
}


$(document).ready(function(){
	$("#start").click(function(){ // when user clicks it will generate QnA and timer
		$("#start").hide();
		generateQnA();
		
	});
	$(".answer").click(function(){ // when the user picked an answer it should stash the answer and check it. Else on ln. 79 it should save an empty string if user didn't picked an answer.
		ans.push(this.getAttribute('data-answer'));
		userClick = true;
		
		if (ans[ndx]=== qNaList[ndx].correct){ // this is to check the answer 
			console.log("yes correct");
			hideQnA();
//------------------------------------------------------HIDE Q&A & notify user is correct--------------
			$("#imageCorrect").fadeIn(4000,function(){
				$("#imageCorrect").hide();
			});
		} else {
			console.log("NOPE!");
//-----------------------------------------------------------HIDE Q&A-----------
			hideQnA();
			$(".wrong").text("NOPE! The answer is: " + qNaList[ndx].correct);
			$("#imageWrong").fadeIn(4000,function(){
				$("#imageWrong").hide();
			});
		}
		if (ndx != qNaList.length){
			console.log(ans);
			window.setTimeout(function(){
				ndx = ndx + 1;
				//timer();
				generateQnA();
			},4000);
		}
	});
	$("#restart").click(function(){
		$("#restart").hide();
		restart();
		generateQnA();
		timer();
		$("#scoring_board").hide();
		$("#image").hide();
		showQnA();
	})


});
