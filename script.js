const movie = document.querySelector('#movie'); 
const container = document.querySelector('.container'); 
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); 
const total = document.querySelector('#total'); 
const count = document.querySelector('#count'); 

let ticketPrice = +movie.value; 

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected') 
    const selectedSeatCount = selectedSeats.length; 
    count.innerText = selectedSeatCount; 
    total.innerText = selectedSeatCount * ticketPrice; 
    
}

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
    updateSelectedCount()
})

