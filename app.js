document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('#grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
    const refresh = document.querySelector('#refresh')
    const width = 4
    let squares = []
    let score = 0

    refresh.addEventListener('click',function() {
        clearBoard()
        scoreDisplay.innerHTML = 0
        resultDisplay.innerHTML = 'Result'
    })    

    function clearBoard(){
        for(let i=0;i<16;i++){
            squares[i].innerHTML = 0
        }
        generate()
        generate()
    }

    // creating the board
    function createBoard(){
        for(let i =0; i<width*width;i++){
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()


    // generate a number randomly
    function generate(){
        let randomNum = Math.floor(Math.random()*squares.length)
        
        if(squares[randomNum].innerHTML == 0){
            squares[randomNum].innerHTML = 2
            checkForLose()
        }else{
            generate()
        }
    }

// ------------------------------------------------------
//GAME FUNCTION
    //swipe right
    function moveRight(){
        for(let i=0;i<16;i++){
            if(i%4 === 0){
                let totalOne = parseInt(squares[i].innerHTML)
                let totalTwo = parseInt(squares[i+1].innerHTML)
                let totalThree = parseInt(squares[i+2].innerHTML)
                let totalFour = parseInt(squares[i+3].innerHTML)

                let row = [totalOne,totalTwo,totalThree,totalFour]
                
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                
                let zeroes = Array(missing).fill(0)

                let newRow = zeroes.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }


    //swipe left
    function moveLeft(){
        for(let i=0;i<16;i++){
            if(i%4 === 0){
                let totalOne = parseInt(squares[i].innerHTML)
                let totalTwo = parseInt(squares[i+1].innerHTML)
                let totalThree = parseInt(squares[i+2].innerHTML)
                let totalFour = parseInt(squares[i+3].innerHTML)

                let row = [totalOne,totalTwo,totalThree,totalFour]
                
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                
                let zeroes = Array(missing).fill(0)

                let newRow = filteredRow.concat(zeroes)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }


    //swipe down
    function moveDown(){
        for(let i=0;i<4;i++){
            let totalOne = parseInt(squares[i].innerHTML)
            let totalTwo = parseInt(squares[i+width].innerHTML)
            let totalThree = parseInt(squares[i+(width*2)].innerHTML)
            let totalFour = parseInt(squares[i+(width*3)].innerHTML)

            let column = [totalOne,totalTwo,totalThree,totalFour]
            
            let filteredColumn = column.filter(num => num)

            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0)
            let newColumn = zeroes.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+(width*2)].innerHTML = newColumn[2]
            squares[i+(width*3)].innerHTML = newColumn[3]
        }
    }

    //swipe up
    function moveUp(){
        for(let i=0;i<4;i++){
            let totalOne = parseInt(squares[i].innerHTML)
            let totalTwo = parseInt(squares[i+width].innerHTML)
            let totalThree = parseInt(squares[i+(width*2)].innerHTML)
            let totalFour = parseInt(squares[i+(width*3)].innerHTML)

            let column = [totalOne,totalTwo,totalThree,totalFour]
            
            let filteredColumn = column.filter(num => num)

            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeroes)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+(width*2)].innerHTML = newColumn[2]
            squares[i+(width*3)].innerHTML = newColumn[3]
        }
    }


    function combineRow() {
        for(let i=0;i<15;i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineColumn() {
        for(let i=0;i<12;i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }
    

    // assign key codes
    function control(e){
        if(e.keyCode === 39){
            keyRight()
        }else if(e.keyCode === 37){
            keyLeft()
        }else if(e.keyCode === 38){
            keyUp()
        }else if(e.keyCode === 40){
            keyDown()
        }
    }

    document.addEventListener('keyup', control)

    function keyRight(){
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }
    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }
    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }


    //check for number 2048 to win
    function checkForWin(){
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You Win!!'
                document.removeEventListener('keyup',control)
            }
        }
    }

    //check for number of 0s for game over
    function checkForLose(){
        let zeroes = 0
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 0){
                zeroes++
            }
        }
        if(zeroes === 0){
            resultDisplay.innerHTML = 'You lose!!'
            document.removeEventListener('keyup',control)
        }
    }
})