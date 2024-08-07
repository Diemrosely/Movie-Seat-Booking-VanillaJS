const movie = document.querySelector('#movie'); 
const container = document.querySelector('.container'); 
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); 
const total = document.querySelector('#total'); 
const count = document.querySelector('#count'); 

let ticketPrice = +movie.value; 

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected') 
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)); 
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); 
    const selectedSeatCount = selectedSeats.length; 
    count.innerText = selectedSeatCount; 
    total.innerText = selectedSeatCount * ticketPrice; 
    
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movie.selectedIndex = selectedMovieIndex; 
    }
}; 

populateUI(); 


container.addEventListener('click', e => {
    if(
        e.target.classList.contains('seat') && !e.target.classList.contains('occupied')
    ){
        e.target.classList.toggle('selected')

        updateSelectedCount(); 
    } else if(e.target.classList.contains('occupied')){
        window.alert('Please select a different seat')
    }
}); 

movie.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
}); 

updateSelectedCount(); 

