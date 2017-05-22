
class Game{

	constructor(cellSize, screen_width, screen_height, grid)
	{  
		this.finalGrid = grid;


	    this.canvas = document.getElementById("game");
	    this.context = this.canvas.getContext("2d");
	    


	    this.vert_ = -100;
	    this.hor_ = -100;
		this.c_w = 5;
		this.c_h = 5;
		this.cellSize = cellSize;
		this.screen_width = screen_width;
		this.screen_height = screen_height;;
		this.cellsHorizontal = this.screen_width/this.cellSize;
		this.cellsVertical = this.screen_height/this.cellSize;
		this.udBuffer = [];
		this.canvas.width =screen_width+this.c_w*this.cellSize;
	    this.canvas.height =screen_height+this.c_h*this.cellSize;

		this.grid = this.buildBoard(this.cellsVertical,this.cellsHorizontal);
		
		
		this.linesFilled = this.analyzeBoardLines();
		this.columnFilled = this.analyzeBoardColumns();

		this.canvas.width =screen_width+this.c_w*this.cellSize;
	    this.canvas.height =screen_height+this.c_h*this.cellSize;

		

		this.leftGrid = this.buildBoard(this.cellsVertical,this.c_w);
		this.topGrid = this.buildBoard(this.c_h,this.cellsHorizontal);

		this.pos = this.posCanvas(this.canvas);
		this.coorX = this.pos.x+this.cellSize*this.c_w;
		this.coorY = this.pos.y+this.cellSize*this.c_h;
	

	}

	

	buildBoard(Vertical,Horizontal) {
		var grid = [];

		for(var i = 0; i<Vertical; i++){
			var line = [];
			for(var j = 0; j<Horizontal; j++){
				line.push(0);
			}
			grid.push(line);
		}
		return grid;
	}

	analyzeBoardLines() {
		var filledTiles = [];

		for(var i = 0; i<this.finalGrid.length; i++){
			var count1 = [];
			var count2 = 0;
			for(var j = 0; j<this.finalGrid[i].length; j++){
				if(this.finalGrid[i][j] == 1){
					count2++;
					if(j == this.finalGrid[i].length-1){
						count1.push(count2);
						count2 = 0;
					}
				}else {
					if(count2 != 0){
						count1.push(count2);
						count2 = 0;
					}
				}
			}
			if(count1.length > this.c_w){
						this.c_w=count1.length;
					}
			filledTiles.push(count1);
		}
		return filledTiles;
	}

	analyzeBoardColumns() {
		var filledTiles = [];

		var grid = this.transpon(this.finalGrid);

		for(var i = 0; i<grid.length; i++){
			var count1 = [];
			var count2 = 0;
			for(var j = 0; j<grid[i].length; j++){
				if(grid[i][j] == 1){
					count2++;
					if(j == grid[i].length-1){
						count1.push(count2);
						count2 = 0;
					}
				}else {
					if(count2 != 0){
						count1.push(count2);
						count2 = 0;
					}
				}
			}
			if(count1.length > this.c_h){
						this.c_h=count1.length;
					}
			filledTiles.push(count1);
		}
		return filledTiles;
	}

	transpon(masiv){
		var grid = [];
		for(var i=0; i<masiv[0].length;i++){
			var t = [];
			for(var j=0;j<masiv.length;j++){
				t.push(masiv[j][i]);
			}
			grid.push(t);
		}
		return grid;
	}

	drawing(){
		this.context.fillStyle = "white";
		this.context.fillRect(0, 0, this.screen_width+this.c_w*this.cellSize, this.screen_height+this.c_h*this.cellSize);

		this.context.fillStyle = "#C8C0C0";
		this.context.fillRect(0, 0,this.c_w*this.cellSize, this.c_h*this.cellSize);

		this.context.fillStyle = "#CDC9C9";
		this.context.fillRect(this.c_w*this.cellSize, 0,this.screen_width, this.c_h*this.cellSize);
		this.context.fillRect(0, this.c_h*this.cellSize,this.c_w*this.cellSize, this.screen_height);

		this.context.fillStyle = "#F5F5F5";
		this.context.fillRect(this.c_w*this.cellSize+this.cellSize*this.vert_, 0, this.cellSize, this.c_h*this.cellSize);
		this.context.fillRect(0, this.c_h*this.cellSize+this.cellSize*this.hor_,this.c_w*this.cellSize, this.cellSize);


		this.context.fillStyle = "black";
		for(var i=0; i<this.grid.length;i++){
			for(var j=0;j<this.grid[i].length;j++){
				if(this.grid[i][j] == 1){
					this.context.fillStyle = "black";
					this.context.fillRect(this.cellSize*this.c_w+this.cellSize*j,this.cellSize*this.c_h+this.cellSize*i,this.cellSize,this.cellSize);
				}else{
					if(!this.gridComplete()){
						if(this.grid[i][j] == 2){
							this.drawLine(this.cellSize*this.c_w+this.cellSize*j,this.cellSize*this.c_h+this.cellSize*i,this.cellSize*this.c_w+this.cellSize*(j+1),this.cellSize*this.c_h+this.cellSize*(i+1),"gray",1);
							this.drawLine(this.cellSize*this.c_w+this.cellSize*(j+1),this.cellSize*this.c_h+this.cellSize*i,this.cellSize*this.c_w+this.cellSize*j,this.cellSize*this.c_h+this.cellSize*(i+1),"gray",1);
						}
					}
				}
			}
		}

		if(!this.gridComplete()){
			for(var i=0; i<this.grid.length; i++){
				this.drawLine(this.cellSize*this.c_w,this.cellSize*this.c_h+i*this.cellSize,this.cellSize*this.c_w+this.screen_width,this.cellSize*this.c_h+i*this.cellSize,"#1F1F1F",1);
				if(i%5 == 0){
					this.drawLine(this.cellSize*this.c_w,this.cellSize*this.c_h+i*this.cellSize,this.cellSize*this.c_w+this.screen_width,this.cellSize*this.c_h+i*this.cellSize,"#1F1F1F",3);
				}
			}

			for(var i=0; i<this.grid[0].length; i++){
				this.drawLine(this.cellSize*this.c_w+i*this.cellSize,this.cellSize*this.c_h,this.cellSize*this.c_w+i*this.cellSize,this.cellSize*this.c_h+this.screen_height,"#1F1F1F",1);
				if(i%5 == 0){
					this.drawLine(this.cellSize*this.c_w+i*this.cellSize,this.cellSize*this.c_h,this.cellSize*this.c_w+i*this.cellSize,this.cellSize*this.c_h+this.screen_height,"#1F1F1F",3);
				}
			}
		}

		this.context.font = "15px helvetica";
		this.context.fillStyle = "black";

		for(var i=0;i<this.leftGrid.length; i++){
			this.drawLine(0,this.cellSize*this.c_h+i*this.cellSize,this.cellSize*this.c_w,this.cellSize*this.c_h+i*this.cellSize,"#1F1F1F",1);
			if(i%5 == 0){
				this.drawLine(0,this.cellSize*this.c_h+i*this.cellSize,this.cellSize*this.c_w,this.cellSize*this.c_h+i*this.cellSize,"#1F1F1F",3);
			}
		}

		for(var i=0; i<=this.leftGrid[0].length; i++){
			this.drawLine(this.cellSize*i,this.cellSize*this.c_h,this.cellSize*i,this.cellSize*this.c_h+this.screen_height,"#1F1F1F",1);
		}


		for(var i=0; i<this.leftGrid.length; i++){
			for(var j=0; j<this.leftGrid[0].length; j++){
				if(this.leftGrid[i][j] == 2){
					this.drawLine(this.cellSize*j,this.cellSize*this.c_h+this.cellSize*i,this.cellSize*(j+1),this.cellSize*this.c_h+this.cellSize*(i+1),"gray",1);
					this.drawLine(this.cellSize*(j+1),this.cellSize*this.c_h+this.cellSize*i,this.cellSize*j,this.cellSize*this.c_h+this.cellSize*(i+1),"gray",1);
				}
			}
		}

		for(var i=0; i<this.linesFilled.length; i++){
			for(var j=0; j<this.linesFilled[i].length; j++){
				if(this.linesFilled[i][j]>9){
					this.context.fillText(this.linesFilled[i][j],(this.c_w-this.linesFilled[i].length)*this.cellSize+this.cellSize*j+2,this.cellSize*this.c_h+this.cellSize*i+15);
				}else{
					this.context.fillText(this.linesFilled[i][j],(this.c_w-this.linesFilled[i].length)*this.cellSize+this.cellSize*j+5,this.cellSize*this.c_h+this.cellSize*i+15);
				}
				
			}
		}


		for(var i=0;i<=this.topGrid.length; i++){
			this.drawLine(this.cellSize*this.c_w,i*this.cellSize,this.cellSize*this.c_w+this.screen_width,i*this.cellSize,"#1F1F1F",1);
		}

		for(var i=0; i<this.topGrid[0].length; i++){
			this.drawLine(this.cellSize*this.c_w+this.cellSize*i,0,this.cellSize*this.c_w+this.cellSize*i,this.cellSize*this.c_h,"#1F1F1F",1);
			if(i%5 == 0){
				this.drawLine(this.cellSize*this.c_w+this.cellSize*i,0,this.cellSize*this.c_w+this.cellSize*i,this.cellSize*this.c_h,"#1F1F1F",3);
			}
		}

		for(var i=0; i<this.topGrid.length; i++){
			for(var j=0; j<this.topGrid[0].length; j++){
				if(this.topGrid[i][j] == 2){
					this.drawLine(this.cellSize*this.c_w+this.cellSize*j,this.cellSize*i,this.cellSize*this.c_w+this.cellSize*(j+1),this.cellSize*(i+1),"gray",1);
					this.drawLine(this.cellSize*this.c_w+this.cellSize*(j+1),this.cellSize*i,this.cellSize*this.c_w+	this.cellSize*j,this.cellSize*(i+1),"gray",1);
				}
			}
		}

		for(var i=0; i<this.columnFilled.length; i++){
			for(var j=0; j<this.columnFilled[i].length; j++){
				if(this.columnFilled[i][j]>9){
					this.context.fillText(this.columnFilled[i][j],this.cellSize*this.c_w+this.cellSize*i+2,(this.c_h-this.columnFilled[i].length)*this.cellSize+this.cellSize*j+15);
				}else{
					this.context.fillText(this.columnFilled[i][j],this.cellSize*this.c_w+this.cellSize*i+5,(this.c_h-this.columnFilled[i].length)*this.cellSize+this.cellSize*j+15);
				}
			}
		}
	}

	drawLine(stx,sty,endx,endy,color,line_width){
		this.context.strokeStyle = color;
		this.context.lineWidth = line_width;
		this.context.beginPath();
		this.context.moveTo(stx,sty);
		this.context.lineTo(endx,endy);
		this.context.stroke();
	}

	gridComplete(){
		for(var i=0; i<this.grid.length; i++){
			for(var j=0; j<this.grid[i].length; j++){
				if(this.grid[i][j] != 2 && this.grid[i][j] != this.finalGrid[i][j]){
					return false;
				}
			}
		}
		return true;
	}

	update(){

	}

	ud(){
		if(this.udBuffer.length == 0){
		return;
	}
	var action = this.udBuffer.pop();
	var x = action[0][0];
	var y = action[0][1];
	var prevState = action[1];
	
	var col = Math.floor(x/this.cellSize);
	var row = Math.floor(y/this.cellSize);
	
	this.grid[row][col] = prevState;
		
	}

	posCanvas(obj) {
	    var coorX =  0;
	    var coorY = 0;
	    if (obj.offsetParent) {
	        do {
	            coorX += obj.offsetLeft;
	            coorY += obj.offsetTop;
	        } while (obj = obj.offsetParent);
	    return {x:coorX,y:coorY};
	    }
	}

	inCell(x,y){
		var col = Math.floor(x/this.cellSize);
		var row = Math.floor(y/this.cellSize);
		
		return this.grid[row][col];
	}

	inCellTop(x,y){
		var col = Math.floor(x/this.cellSize);
		var row = Math.floor(y/this.cellSize);
		
		return this.topGrid[row][col];
	}

	inCellLeft(x,y){
		var col = Math.floor(x/this.cellSize);
		var row = Math.floor(y/this.cellSize);
		
		return this.leftGrid[row][col];
	}

	Pointer(x,y){
		if(this.Location(x,y)){
		this.vert_ = Math.floor(x/this.cellSize);
		this.hor_ = Math.floor(y/this.cellSize);
	}
	}

	setClick(x,y,event){

		/*console.log(this.Location(x,y));
		console.log(this.LocationTop(x,y+this.cellSize*this.c_h));
		console.log(this.LocationLeft(x+this.cellSize*this.c_w,y));
		console.log("--------------");*/
		if(this.Location(x,y)){
		if(event == 1){
		switch(this.inCell(x, y)){
			case 0:
				this.clickAction = "BLACK";
				break;
			case 1:
				this.clickAction = "VOID";
				break;
			case 2:
				this.clickAction = "BLACK";
				break;

			}
		}else{
			if(event == 3){
				switch(this.inCell(x, y)){
			case 0:
				this.clickAction = "CLOSE";
				break;
			case 1:
				this.clickAction = "CLOSE";
				break;
			case 2:
				this.clickAction = "VOID";
				break;
			}
			}
		}
	}else{
		if(this.LocationTop(x,y+this.cellSize*this.c_h)){
			switch(this.inCellTop(x, y+this.cellSize*this.c_h)){
			case 0:
				this.clickActionTop = "CLOSE";
				break;
			case 2:
				this.clickActionTop = "VOID";
				break;
			}
		}else{
			if(this.LocationLeft(x+this.cellSize*this.c_w,y)){
				switch(this.inCellLeft(x+this.cellSize*this.c_w, y)){
			case 0:
				this.clickActionLeft = "CLOSE";
				break;
			case 2:
				this.clickActionLeft = "VOID";
				break;
			}
			}
		}
	}

	}

	click(x,y){
		if(this.Location(x,y)){
		var col = Math.floor(x/this.cellSize);
		var row = Math.floor(y/this.cellSize);
		if(this.Location(x, y) && !this.Clicked(row, col)){
			
			this.udBuffer.push([[x,y], this.grid[row][col]]);
			
			switch(this.clickAction){
				case "VOID":
					this.grid[row][col] = 0;
					this.click.Action = 0;
					break;
				case "BLACK":
					this.grid[row][col] = 1;
					this.click.Action = 0;
					break;
				case "CLOSE":
					this.grid[row][col] = 2;
					this.click.Action = 0;
					break;
			}	
		}
	}else{
		if(this.LocationTop(x,y+this.cellSize*this.c_h)){
			var col = Math.floor(x/this.cellSize);
			var row = Math.floor((y+this.cellSize*this.c_h)/this.cellSize);
			if(this.LocationTop(x, y+this.cellSize*this.c_h)){
				switch(this.clickActionTop){
					case "VOID":
						this.topGrid[row][col] = 0;
						break;
					case "CLOSE":
						this.topGrid[row][col] = 2;
						break;
				}	
			}
		}else{
			if(this.LocationLeft(x+this.cellSize*this.c_w,y)){
			var col = Math.floor((x+this.cellSize*this.c_w)/this.cellSize);
			var row = Math.floor(y/this.cellSize);
			console.log("col:"+col+" row:"+row);
			if(this.LocationLeft(x+this.cellSize*this.c_w, y)){

				switch(this.clickActionLeft){
					case "VOID":
						this.leftGrid[row][col] = 0;
						console.log(this.leftGrid);
						break;
					case "CLOSE":
						this.leftGrid[row][col] = 2;
						console.log(this.leftGrid);
						break;
				}	
			}
		}
		}
	}
	}

	Location(x, y){
		return (x >=0  && x < this.screen_width && y >=0 && y < this.screen_height);
	}

	LocationTop(x, y){
		return (x >=0  && x < this.screen_width && y >=0 && y < this.cellSize*this.c_h);
	}

	LocationLeft(x, y){
		return (x >=0  && x < this.cellSize*this.c_w && y >=0 && y < this.screen_height);
	}

	Clicked(row, col){
		switch(this.clickAction){
			case "VOID":
				return this.grid[row][col] == 0;
			case "BLACK":
				return this.grid[row][col] == 1;
			case "CLOSE":
				return this.grid[row][col] == 2;
		}
	}

	
}

class Grid {
	constructor(){
	}
}


(function(){

	var GRID = [
	[1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
	[0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
	[0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0],
	[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
	[0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
	[0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
	[0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
];

	var mousePressed = false;
	keys = {
		z: false,
		ctrl: false
	};

	var CELL_SIZE = 20;
	
    var SCREEN_WIDTH = GRID[0].length*CELL_SIZE;
	var SCREEN_HEIGHT = GRID.length*CELL_SIZE;

    let game = new Game(CELL_SIZE,SCREEN_WIDTH,SCREEN_HEIGHT,GRID,1);
    
    function mouseDown(e){
		mousePressed = true;
		game.setClick(e.pageX-game.coorX,e.pageY-game.coorY,e.which);
	}

	function mouseDrag(e){
		if(mousePressed){
			game.click(e.pageX-game.coorX, e.pageY-game.coorY);
		}
		game.Pointer(e.pageX-game.coorX, e.pageY-game.coorY);
	}

	function mouseUp(e){
		mousePressed = false;
		game.click(e.pageX-game.coorX, e.pageY-game.coorY);
	}

	function keyDown(e){
		if (event.keyCode == 90) {
			keys["z"] = true;
		} else if (event.keyCode == 17) {
			keys["ctrl"] = true;
		}

		if(keys["z"] && keys["ctrl"]){
			game.ud();	
		}
	}
	
	function keyUp(e){
		if (event.keyCode == 90) {
			keys["z"] = false;
		} else if (event.keyCode == 17) {
			keys["ctrl"] = false;
		}
	}

    document.addEventListener('mousedown', mouseDown, false);
    document.addEventListener('mousemove', mouseDrag, false);
	document.addEventListener('mouseup', mouseUp, false);
	document.addEventListener('keydown', keyDown, false);
	document.addEventListener('keyup', keyUp, false);

    setInterval(
        function(){
			game.update();
			game.drawing();
    }, 10)

	})();
