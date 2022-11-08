const table = document.getElementById('myTable');

var campo = null;

document.getElementById("mode").addEventListener("change", (event) => {
    document.getElementById("myTable").children[0].innerHTML = "";
    document.getElementById("error").innerHTML = "";
    start();
});
document.getElementById("reset").addEventListener("click", (event) => {
    document.getElementById("myTable").children[0].innerHTML = "";
    document.getElementById("error").innerHTML = "";
    start();
});

function start(){
    campo = null;
    campo = new field(document.getElementById("mode").value);
    campo.draw(table.children[0]);
}

function TileClick(x, y, event){
    campo.click(x, y, event);   
}
function FlagClick(x, y, event){
    if(campo.lost) return;

    if(event.src.includes("flag")){ campo.remainingMines++; event.src = "./Images/TILE.png"; }
    else if(event.src.includes("TILE") && campo.remainingMines > 0){ campo.remainingMines--; event.src = "./Images/flag.png"; }

    document.getElementById("numMines").innerHTML = "Mines: " + campo.remainingMines;
}