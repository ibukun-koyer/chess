

const chessBoard = [["black castle", "black pawn", "", "", "", "", "white pawn", "white castle"],
["black knight", "black pawn", "", "", "", "", "white pawn", "white knight"],
["black glider", "black pawn", "", "", "", "", "white pawn", "white glider"],
["black queen", "black pawn", "", "", "", "", "white pawn", "white queen"],
["black king", "black pawn", "", "", "", "", "white pawn", "white king"],
["black glider", "black pawn", "", "", "", "", "white pawn", "white glider"],
["black knight", "black pawn", "", "", "", "", "white pawn", "white knight"],
["black castle", "black pawn", "", "", "", "", "white pawn", "white castle"]];


const images = {
    "black castle": "../black carlos.png",
    "black knight": "../black knight.png",
    "black glider": "../black glider.png",
    "black queen": "../black queen.png",
    "black king": "../black king.png",
    "black pawn": "../black pawn.png",
    "white castle": "../white carlos.png",
    "white knight": "../white knight.png",
    "white glider": "../white glider.png",
    "white queen": "../white queen.png",
    "white king": "../white king.png",
    "white pawn": "../white pawn.png",

};
const chessPieces = document.querySelectorAll(".image-bgd");
for (let chess of chessPieces) {
    chess.addEventListener("mouseenter", function (event) {
        chess.classList.add("info");

        const doc = document.createElement("span");
        doc.innerText = `${chess.children[0].name}`;
        chess.append(doc);



    });
    chess.addEventListener("mouseleave", function (event) {
        let index = chess.innerHTML.indexOf('>');
        if (index !== -1) {
            let val = chess.innerHTML;
            chess.innerHTML = val.slice(0, index + 1);

        }
        else {
            console.log("something went wrong");
        }
        chess.children[0].setAttribute("id", "");

        chess.classList.remove("info");


    });
};
let min = 0;
let hr = 0;
setInterval(function () {
    const nextTime = document.querySelector("#timer");
    if (min < 59) {
        min++;
    }
    else {
        min = 0;
        hr++;
    }
    nextTime.innerText = `${hr}hr : ${min}min`;
}, 60000);
const spaces = document.querySelector("#playSection");
for (let i = 0; i < 64; i++) {
    const newSpace = document.createElement("span");
    newSpace.classList.add("boxes");
    newSpace.classList.add("centered");
    spaces.append(newSpace);
}
const boxes = document.querySelectorAll(".boxes");

function drawBoard() {
    for (let i = 0; i < chessBoard.length; i++) {
        for (let j = 0; j < chessBoard[i].length; j++) {
            if (chessBoard[i][j] === undefined) {
                continue;
            }
            else {
                const newImage = document.createElement("img");
                newImage.setAttribute("src", images[chessBoard[i][j]]);
                newImage.setAttribute("alt", chessBoard[i][j]);
                newImage.setAttribute("name", chessBoard[i][j]);
                newImage.classList.add("imgSizes");

                // console.log(images[chessBoard[i][j]]);
                boxes[(i * chessBoard[i].length) + j].append(newImage);
                // console.log(`${(i * chessBoard[i].length) + j}`);
            }
        }
    }
}
//THIS ARE THE CHECKS NEEDED TO KNOW WHAT CLICKS MEAN
//CHECK TO SEE IF THE CURRENT CLICK IS THE CURRENT PLAYER
//IF IT IS THE CURRENT PLAYER, RETURN A FUNCTION THAT CALCULATES THE POSSIBLE BOXES THAT CAN BE MOVED TO
//IF IT IS NOT THE CURRENT PLAYER,
//CHECK TO SEE THAT IT IS SPACE
//IF THE SPACE IS ALSO HIGHLIGHTED, RETURN A FUNCTION THAT MOVES TO THAT BLOCK(OBVIOUSLY NO PIECE NEEDS TO BE ETURNED)
//IF THE SPACE IS NOT HIGHLIGTED, DO NOTHING
//CHECK TO SEE THAT IT IS AN OPPOSITE COLOR SPACE
//IF THE OPPOSITE COLOR SPACE IS ALSO HIGHLIGHTED, RETURN A FUNCTION THAT MOVES TO THAT BLOCK(OBVIOUSLY REMOVING THE PIECE AT LOC)
//IF THE OPPOSITE COLOR SPACE IS NOT HIGHLIGHTED, DO NOTHING

//HOW TO CHECK HIGHLIGHTED BLOCK?-USE ARRAYS
//HOW TO KNOW IT IS THE NEXT PLAYERS TURN?
//WHAT HAPENS IF A PLAYER SELECTS ANOTHER VALID COLOR AND MORE HIGHLIGHTS OPEN UP WITHOUT CLEARING PREVIOUS
//BE SURE TO CHECK TO SEE THAT PREVIOUS DID NOT HIGHLIGHT
//IF THE PREVIOUS HIGHLIGHTED, UNHIGHLIGHT THEM BY REMOVING THEM FROM HIGHLIGHT ARRAY AND ALSO CHANGING DISPLAY


//TO HIGHLIGHT, JUST COLOR THE SPAN
let current_player = "white";
let selected = undefined;
let highlight = [];
function find_i_j(num) {
    if (num === undefined) {
        console.log("num wasn't entered");
        return undefined;
    }
    let i = Math.floor(num / chessBoard.length);
    let j = num % chessBoard.length;
    return { i: i, j: j };

}
function calc_span(i = 0, j = 0) {
    return (i * chessBoard[i].length) + j;
}
function clear_highlight() {
    for (let i = 0; i < highlight.length; i++) {
        boxes[highlight[i]].classList.toggle("highlight");

    }
    highlight = [];

}
/*
@param i- the outer value
@param j- the inner value
@param select- the selected item, mostly set to span_number
*/
function opposite() {
    if (current_player === "black") {
        return "white";
    }
    if (current_player === "white") {
        return "black";
    }
}
function color_box(i, j, select,) {
    selected = select;
    let num = calc_span(i, j);
    highlight.push(num);

    boxes[num].classList.toggle("highlight");
}
function castle(name, span_number) {
    try {
        const { i, j } = find_i_j(span_number);
        for (let k = j + 1; k < chessBoard.length; k++) {
            if (chessBoard[i][k] === "") {
                color_box(i, k, span_number);
            }
            else if (chessBoard[i][k].indexOf(opposite()) !== -1) {
                color_box(i, k, span_number);
                break;
            }
            else {
                break;
            }
        }
        for (let k = j - 1; k >= 0; k--) {
            if (chessBoard[i][k] === "") {
                color_box(i, k, span_number);
            }
            else if (chessBoard[i][k].indexOf(opposite()) !== -1) {
                color_box(i, k, span_number);
                break;
            }
            else {
                break;
            }
        }
        for (let k = i + 1; k < chessBoard.length; k++) {
            if (chessBoard[k][j] === "") {
                color_box(k, j, span_number);
            }
            else if (chessBoard[k][j].indexOf(opposite()) !== -1) {
                color_box(k, j, span_number);
                break;
            }
            else {
                break;
            }
        }
        for (let k = i - 1; k >= 0; k--) {
            if (chessBoard[k][j] === "") {
                color_box(k, j, span_number);
            }
            else if (chessBoard[k][j].indexOf(opposite()) !== -1) {
                color_box(k, j, span_number);
                break;
            }
            else {
                break;
            }
        }
    }
    catch (e) {
        console.error(e);
    }
}
function glider(name, span_number) {
    try {
        const { i, j } = find_i_j(span_number);
        let m = i + 1;
        let n = i - 1;
        let ignore_m = false;
        let ignore_n = false;
        for (let k = j + 1; k < chessBoard.length; k++) {
            if (m === chessBoard.length) {
                ignore_m = true;
            }
            if (n < 0) {
                ignore_n = true;
            }
            if ((ignore_m === true) && (ignore_n === true)) {
                break;
            }
            if (ignore_m !== true) {
                if (chessBoard[m][k] === "") {
                    color_box(m, k, span_number);
                }
                else if (chessBoard[m][k].indexOf(opposite()) !== -1) {
                    color_box(m, k, span_number);
                    ignore_m = true;
                }
                else {
                    ignore_m = true;
                }
            }

            if (ignore_n !== true) {
                if (chessBoard[n][k] === "") {
                    color_box(n, k, span_number);
                }
                else if (chessBoard[n][k].indexOf(opposite()) !== -1) {
                    color_box(n, k, span_number);
                    ignore_n = true;
                }
                else {
                    ignore_n = true;
                }
            }


            m++;

            n--;

        }


        m = i + 1;
        n = i - 1;
        ignore_m = false;
        ignore_n = false;
        for (let k = j - 1; k >= 0; k--) {
            if (m === chessBoard.length) {
                ignore_m = true;
            }
            if (n < 0) {
                ignore_n = true;
            }
            if ((ignore_m === true) && (ignore_n === true)) {
                break;
            }
            if (ignore_m !== true) {
                if (chessBoard[m][k] === "") {
                    color_box(m, k, span_number);
                }
                else if (chessBoard[m][k].indexOf(opposite()) !== -1) {
                    color_box(m, k, span_number);
                    ignore_m = true;
                }
                else {
                    ignore_m = true;
                }
            }

            if (ignore_n !== true) {
                if (chessBoard[n][k] === "") {
                    color_box(n, k, span_number);
                }
                else if (chessBoard[n][k].indexOf(opposite()) !== -1) {
                    color_box(n, k, span_number);
                    ignore_n = true;
                }
                else {
                    ignore_n = true;
                }
            }


            m++;

            n--;
        }





    }
    catch (e) {
        console.error(e);
    }
}
function pawn(name, span_number) {
    try {

        const { i, j } = find_i_j(span_number);
        if (name.indexOf("white") !== -1) {
            if (chessBoard[i][j - 1] === "") {
                color_box(i, j - 1, span_number);
            }
            if (i + 1 < chessBoard.length) {
                if (chessBoard[i + 1][j - 1].indexOf("black") !== -1) {
                    color_box(i + 1, j - 1, span_number);
                }
            }
            if (i - 1 >= 0) {
                if (chessBoard[i - 1][j - 1].indexOf("black") !== -1) {
                    color_box(i - 1, j - 1, span_number);
                }
            }
            if (j === 6) {
                if ((chessBoard[i][j - 1] === "") && (chessBoard[i][j - 2] === "")) {
                    color_box(i, j - 2, span_number);
                }
            }

        }
        else {
            if (chessBoard[i][j + 1] === "") {
                color_box(i, j + 1, span_number);
            }
            if (i + 1 < chessBoard.length) {
                if (chessBoard[i + 1][j + 1].indexOf("white") !== -1) {
                    color_box(i + 1, j + 1, span_number);
                }
            }
            if (i - 1 >= 0) {
                if (chessBoard[i - 1][j + 1].indexOf("white") !== -1) {
                    color_box(i - 1, j + 1, span_number);
                }
            }
            if (j === 1) {
                if ((chessBoard[i][j + 1] === "") && (chessBoard[i][j + 2] === "")) {
                    color_box(i, j + 2, span_number);
                }
            }

        }
    }
    catch (e) {
        console.error(e);
    }
}
function king_checker(i, j, span_number) {
    try {
        if (chessBoard[i][j] === "") {
            color_box(i, j, span_number);
        }
        else if (chessBoard[i][j].indexOf(opposite()) !== -1) {
            color_box(i, j, span_number);
        }
    }
    catch (e) {
        return;
    }

}
function knight_checker(i, j, span_number) {
    try {
        if (chessBoard[i][j] === "") {
            color_box(i, j, span_number);
        }
        else if (chessBoard[i][j].indexOf(opposite()) !== -1) {
            color_box(i, j, span_number);
        }
    }
    catch (e) {
        return;
    }

}

function king(name, span_number) {
    try {
        const { i, j } = find_i_j(span_number);
        king_checker(i, j + 1, span_number);
        king_checker(i, j - 1, span_number);
        king_checker(i + 1, j, span_number);
        king_checker(i + 1, j + 1, span_number);
        king_checker(i + 1, j - 1, span_number);
        king_checker(i - 1, j, span_number);
        king_checker(i - 1, j - 1, span_number);
        king_checker(i - 1, j + 1, span_number);
    }
    catch (e) {
        console.error(e);
    }
}
function knight(name, span_number) {
    try {
        const { i, j } = find_i_j(span_number);
        for (let k = 1; k < 3; k++) {
            knight_checker(i - k, j + 3 - k, span_number);
            knight_checker(i - k, j - 3 + k, span_number);
            knight_checker(i + k, j + 3 - k, span_number);
            knight_checker(i + k, j - 3 + k, span_number);
        }
    }
    catch (e) {
        return;
    }
}
function queen(name, span_number) {
    glider(name, span_number);
    castle(name, span_number);
}
function move_empty(span_number) {

    let { i: ini_i, j: ini_j } = find_i_j(selected);

    let { i, j } = find_i_j(span_number);
    //fill current index
    chessBoard[i][j] = chessBoard[ini_i][ini_j];
    //empty previous index
    chessBoard[ini_i][ini_j] = "";

    clear_highlight();
    if ((chessBoard[i][j].indexOf("pawn") !== -1) && ((j === 0) || (j === chessBoard.length - 1))) {

        boxes[selected].children[0].setAttribute("src", images[`${current_player} queen`]);
        boxes[selected].children[0].setAttribute("alt", `${current_player} queen`);
        boxes[selected].children[0].setAttribute("name", `${current_player} queen`);
        chessBoard[i][j] = `${current_player} queen`;
    }
    boxes[span_number].innerHTML = boxes[selected].innerHTML;

    boxes[selected].innerHTML = "";
    current_player = opposite();


}
function move_filled(span_number) {
    let { i, j } = find_i_j(span_number);
    let temp = chessBoard[i][j];
    move_empty(span_number);
    const removed = document.createElement("img");
    removed.setAttribute("src", images[temp]);
    removed.setAttribute("alt", temp);
    removed.setAttribute("name", temp);
    removed.classList.add("outside_size");
    if (temp.indexOf("white") !== -1) {
        const rem = document.querySelector("#removedWhite");
        rem.append(removed);
    }
    if (temp.indexOf("black") !== -1) {
        const rem = document.querySelector("#removedBlack");
        rem.append(removed);
    }

    if (temp.indexOf("king") !== -1) {

        // alert(`${opposite()} Wins!!!`);
        const diagram = document.querySelector("#area");
        diagram.innerHTML = "";

        diagram.setAttribute("id", "");
        const newButton = document.createElement("button");
        newButton.innerText = "Restart";
        newButton.classList.add("button");
        const newText = document.createElement("div");
        newText.innerText = `${opposite()} Wins!!!`;
        diagram.append(newText);
        diagram.append(newButton);
        diagram.classList.add("ended");
        // location.reload();
    }
}

function create_function(span_number, name) {

    try {

        let loc = find_i_j(span_number);
        if (chessBoard[loc.i][loc.j].indexOf(current_player) !== -1) {
            //this should clear highlight array before starting
            //calculate the all posible movements of the selected item and display
            clear_highlight();
            if (name.indexOf("pawn") !== -1) {
                // alert("about to call pawn function");
                pawn(name, span_number);
            }
            else if (name.indexOf("king") !== -1) {
                // alert("about to call king function");
                king(name, span_number);
            }
            else if (name.indexOf("queen") !== -1) {
                // alert("about to call queen function");
                queen(name, span_number);
            }
            else if (name.indexOf("castle") !== -1) {
                // alert("about to call castle function");
                castle(name, span_number);
            }
            else if (name.indexOf("glider") !== -1) {
                // alert("about to call glider function");
                glider(name, span_number);
            }
            else if (name.indexOf("knight") !== -1) {
                // alert("about to call the knight function");
                knight(name, span_number);
            }


        }
        else if (chessBoard[loc.i][loc.j] === "") {
            if (highlight.indexOf(span_number) === -1) {
                console.log("This block isn't highighted atm, useless block, continue");
            }
            else {
                // console.log("This block is actually highlighted");
                move_empty(span_number);
                //move into here and change current player
            }
        }
        else {
            if (highlight.indexOf(span_number) === -1) {
                console.log("This block isn't highighted atm, useless block, continue - contains block");
            }
            else {
                move_filled(span_number);
                // console.log("This block is actually highlighted, move into location and remove piece here");
                //move into here and change current player
            }
        }
    }
    catch (e) {
        console.error(e);
    }
}
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function (event) {
        let name = "";
        if (boxes[i].childElementCount !== 0) {
            name = boxes[i].children[0].getAttribute("name");
            // let loc = find_i_j(i);
        }
        create_function(i, name);

    });
}

drawBoard();
const but = document.querySelector("#area");
but.addEventListener("click", function (e) {
    if (e.target.innerText === "Restart") {
        location.reload();
    }
});

const current_time = document.querySelector("#curr_time");
function changeTime(){
    const time = new Date();
    current_time.innerHTML = `${time.getHours().toString().padStart(2, 0)}: ${time.getMinutes().toString().padStart(2, 0)}: ${time.getSeconds().toString().padStart(2, 0)}`;
}
changeTime();
setInterval(changeTime, 1000);