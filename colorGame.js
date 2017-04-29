$(document).ready(function() {
	
	$('#myModal').modal('show'); //Bootstrap modal
	
	var colorRGB = $("#color-RGB");
	var resetBtn = $("#reset-btn");
	var squares = document.querySelectorAll(".square");
	var header = $("header");
	var result = $(".click-result");
	var modeBtn = $(".game-mode");

	init();

	function init(){
		gameMode = $(".game-mode.selected").attr("data-num");
		colors = generateColors(gameMode);

		for (var i = gameMode; i < squares.length; i++){
			squares[i].style.display = "none";
		}

		if (Number(gameMode) === squares.length){
			for (i = 0; i < squares.length; i++){
				squares[i].style.display = "block";
			}
		}

		applyColors(colors);
		winningColor = pickWinner(gameMode);
		colorRGB.text(winningColor);
		resetBtn.text("New Colors");
		header.css("background-color", "steelblue");
		result.empty();
	};
	
	resetBtn.on("click", function(){
		//reset colors, generate new colors
		init();
	});

	modeBtn.on("click", function(){

		$this = $(this);

		if (!$this.hasClass('selected')){
			$this.addClass('selected');
			$this.siblings().removeClass('selected');
			init();
		}

	});

	$(".square").on("click", function(){

		$this = $(this);
		clickedColor = $this.css("background-color");

		if (clickedColor === winningColor){
			//correct
			header.css("background-color", winningColor);
			$this.siblings().css({

				"background-color": winningColor,
				"opacity": 1

			});
			resetBtn.text("Play again?");
			result.text("Correct!");

		}
		else {		
			//wrong
			result.text("Try Again");
			$this.css("opacity", 0);
		}

	});

	function generateColors(num){

		var arr = [];
		for (i = 0; i < num; i++){

			color = "rgb(" + Math.floor(Math.random()*255) + ", " + 
					Math.floor(Math.random()*255) + ", " + Math.floor(Math.random()*255) + ")";

			arr.push(color);
		}
		return arr;
	};

	function applyColors(arr){
		for (i = 0; i < arr.length; i++){
			squares[i].style.backgroundColor = arr[i];
			squares[i].style.opacity = 1;
		}
	}

	function pickWinner(num){

		return colors[Math.floor(Math.random()*num)];

	}
});

