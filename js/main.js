//creating the code for the rest of the card game

document.querySelector('button').addEventListener('click', drawTwoCards)

let scorePlayerOne = 0
let scorePlayerTwo = 0
let deckId = '' 
console.log(deckId)


fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1 ')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      if(localStorage.getItem('deckId') == null ){
        deckId = data.deck_id
        localStorage.setItem('deckId', deckId)
      }else{
        deckId = localStorage.getItem('deckId')
      }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
    

function drawTwoCards(){
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        document.querySelector('#playerOne').src = data.cards[0].image
        document.querySelector('#playerTwo').src = data.cards[1].image

        let playerOne = cardValues(data.cards[0].value)
        let playerTwo = cardValues(data.cards[1].value)
        document.querySelector('p').innerText = data.remaining
        if(playerOne > playerTwo){
          document.querySelector('#winna').innerText = 'Player One Winner'
          scorePlayerOne += 1
          document.querySelector('#playerOneWins').innerText = scorePlayerOne
        }else if(playerTwo > playerOne){
          document.querySelector('#winna').innerText = 'Player Two Winner'
          scorePlayerTwo += 1
          document.querySelector('#playerTwoWins').innerText = scorePlayerTwo
        }else{
          document.querySelector('#winna').innerText = 'We are going to War'
          return data.remaining - 6

        }


      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

//this is to help convert the value of the cards
function cardValues (value){
  if(value =='ACE'){
    return 14
  }else if(value == 'KING'){
    return 13
  }else if(value == 'QUEEN'){
    return 12
  }else if(value == 'JACK'){
    return 11
  }else{
    return Number(value)
  }
}

//this function is for going to war
