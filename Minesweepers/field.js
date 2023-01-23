class field{

    constructor(mode){
        this.mode = mode;

        this.w = 0; this.h = 0;
        this.mines = 0;
        this.remainingMines = 0;

        this.field = null;

        this.#prepare();

        this.path = "./Images/TILE.png";

        this.lost = false;
    }

    #prepare(){
        switch(this.mode){
            case "1": //Beginner mode
                this.w = 8; this.h = 8;
                this.mines = 10;
                break;
            case "2": //Intermediate mode
                this.w = 16; this.h = 16;
                this.mines = 40;
                break;
            case "3": //Expert mode
                this.w = 16; this.h = 30;
                this.mines = 99;
                break;
            default:
                console.log("error");
                return;      
        }
    
        document.getElementById("numMines").innerHTML = "Mines: " + this.mines; this.remainingMines = this.mines;
        this.field = new Array(this.w);

        for(let i = 0; i < this.field.length; i++){ this.field[i] = new Array(this.h); this.field[i].fill(""); } //Fill the field with 0s
    
        for(let i = 0; i < this.mines; i++){ //Generate mines in random places
            let x = Math.floor(Math.random() * this.w); //Random x, that represents the row
            let y = Math.floor(Math.random() * this.h); //Random y, that represents the column
    
            if(this.field[x][y] == 0) this.field[x][y] = "B"; //If the field is empty, put a mine there
            else i--; //If the field is not empty, try again
        }
    
        for(let i = 0; i < this.field.length; i++){ //Generate numbers
            for(let j = 0; j < this.field[i].length; j++){
                if(this.field[i][j] == "B") continue;
                this.field[i][j] = this.#countMines(this.field, i, j);
            }
        }

        console.table(this.field); //Debug
    }   
    
    #countMines(field, x, y){
        let mines = 0;
    
        if(x > 0 && y > 0 && field[x - 1][y - 1] == "B") mines++; //Top left
        if(x > 0 && field[x - 1][y] == "B") mines++; //Top
        if(x > 0 && y < field[x].length - 1 && field[x - 1][y + 1] == "B") mines++; //Top right
        if(y > 0 && field[x][y - 1] == "B") mines++; //Left
        if(y < field[x].length - 1 && field[x][y + 1] == "B") mines++; //Right
        if(x < field.length - 1 && y > 0 && field[x + 1][y - 1] == "B") mines++; //Bottom left
        if(x < field.length - 1 && field[x + 1][y] == "B") mines++; //Bottom
        if(x < field.length - 1 && y < field[x].length - 1 && field[x + 1][y + 1] == "B") mines++; //Bottom right
    
        return mines;
    }

    draw(tb){
        for(let i = 0;  i < this.field.length; i++){
            let row = "<tr>";
            for(let j = 0; j < this.field[i].length; j++){
                row += '<td><img src="'+this.path+'" onClick="TileClick('+i+', '+j+', this)" oncontextmenu="FlagClick('+i+', '+j+', this); return false;" role="button" class="tile"></td>';
            }
            row += "</tr>";
            tb.innerHTML += row;
        }
    }

    click(x, y, obj){
        if(this.lost) return;
        if(document.getElementById("myTable").children[0].children[x].children[y].children[0].src.includes("flag")) return;
        if(this.field[x][y] == "B"){
            this.lost = true;
            document.getElementById("error").innerHTML = "You lost!";

            this.#revealAll();
            return;
        }else{
            if(this.field[x][y] == 0){
                this.#revealEmpty(x, y);
            }else{
                obj.src = "./Images/"+this.field[x][y]+".png";
                this.#clickCheck(x, y);
            }
        }

        if(this.#verifyWin()){
            document.getElementById("error").innerHTML = "You won!";
            this.#revealAll();
            this.lost = true;
        }
    }

    #revealAll(){
        for(let i = 0; i < this.field.length; i++){
            for(let j = 0; j < this.field[i].length; j++){
                if(this.field[i][j] == "B") document.getElementById("myTable").children[0].children[i].children[j].children[0].src = "./Images/bomb.png";
            }
        }
    }

    #revealEmpty(x, y){
        if(x < 0 || y < 0 || x >= this.field.length || y >= this.field[x].length) return; //If the coordinates are out of bounds, return
        if(this.field[x][y] == "B") return; //If it's a mine, return
        if(this.field[x][y] != 0 && !(document.getElementById("myTable").children[0].children[x].children[y].children[0].src.includes("flag"))) { //If the tile is not empty, reveal it and return
            document.getElementById("myTable").children[0].children[x].children[y].children[0].src = "./Images/"+this.field[x][y]+".png"; 
            document.getElementById("myTable").children[0].children[x].children[y].children[0].addEventListener(this.click, this.#clickCheck(x, y));
            return;
        }
        if(!document.getElementById("myTable").children[0].children[x].children[y].children[0].src.includes("Images/TILE.png")) return; //If the tile is already revealed, return

        document.getElementById("myTable").children[0].children[x].children[y].children[0].src = "./Images/0.png"; //Reveal the tile

        this.#revealEmpty(x - 1, y); //Top
        this.#revealEmpty(x, y - 1); //Left
        this.#revealEmpty(x, y + 1); //Right
        this.#revealEmpty(x + 1, y); //Bottom

        this.#revealEmpty(x - 1, y - 1); //Top left
        this.#revealEmpty(x - 1, y + 1); //Top right
        this.#revealEmpty(x + 1, y - 1); //Bottom left
        this.#revealEmpty(x + 1, y + 1); //Bottom right
    }

    #verifyWin(){
        for(let i = 0; i < this.field.length; i++){
            for(let j = 0; j < this.field[i].length; j++){
                if(this.field[i][j] != "B" && !document.getElementById("myTable").children[0].children[i].children[j].children[0].src.includes("Images/"+this.field[i][j]+".png")) return false;
            }
        }

        return true;
    }

    #clickCheck(x, y){
        
    }
    #countFlags(x, y){

    }
}