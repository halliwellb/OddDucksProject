'use strict';

const state = [];

let roundsOfVoting = 25;
let chartObj = null;

function Image(name, source) {
    this.name = name;
    this.timesClicked = 0;
    this.timesShown = 0;
    this.source = source;
}

state.push(new Image('Bag', 'assets/bag.jpg'));
state.push(new Image('Banana', 'assets/banana.jpg'));
state.push(new Image('Bathroom', 'assets/bathroom.jpg'));
state.push(new Image('Boots', 'assets/boots.jpg'));
state.push(new Image('Breakfast', 'assets/breakfast.jpg'));
state.push(new Image('Bubblegum', 'assets/bubblegum.jpg'));
state.push(new Image('Chair', 'assets/chair.jpg'));
state.push(new Image('Cthulhu', 'assets/cthulhu.jpg'));
state.push(new Image('Dog-duck', 'assets/dog-duck.jpg'));
state.push(new Image('Dragon', 'assets/dragon.jpg'));
state.push(new Image('Pen', 'assets/pen.jpg'));
state.push(new Image('Pet-sweep', 'assets/pet-sweep.jpg'));
state.push(new Image('Scissors', 'assets/scissors.jpg'));
state.push(new Image('Shark', 'assets/shark.jpg'));
state.push(new Image('Sweep', 'assets/sweep.png'));
state.push(new Image('Tauntaun', 'assets/tauntaun.jpg'));
state.push(new Image('Unicorn', 'assets/unicorn.jpg'));
state.push(new Image('Water-can', 'assets/water-can.jpg'));
state.push(new Image('Wine-glass', 'assets/wine-glass.jpg'));

let imgEls = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('vote-tracker');

console.log('CURRENT STATE', state);

console.log('CURRENTLY RENDERED IMAGES', imgEls);

function generateRandomProduct() {
    return Math.floor(Math.random() * state.length);
}
let uniqueIndexValues = [];

// loading up a line of 6 indexed spots; pulling the first three, and setting the next three 'on deck'
function renderProducts() {
    while (uniqueIndexValues.length < 6) {
        let index = generateRandomProduct();
        while (uniqueIndexValues.includes(index)) {
            index = generateRandomProduct();
        }
        uniqueIndexValues.push(index);
    }
    console.log(uniqueIndexValues);

    let product1 = state[uniqueIndexValues[0]];
    let product2 = state[uniqueIndexValues[1]];
    let product3 = state[uniqueIndexValues[2]];

    uniqueIndexValues.shift();
    uniqueIndexValues.shift();
    uniqueIndexValues.shift();
    console.log(uniqueIndexValues);

    imgEls[0].src = product1.source;
    imgEls[0].id = product1.name;
    product1.timesShown += 1;
    imgEls[1].src = product2.source;
    imgEls[1].id = product2.name;
    product2.timesShown += 1;
    imgEls[2].src = product3.source;
    imgEls[2].id = product3.name;
    product3.timesShown += 1;
}

function handleProductClick(event) {
    // console.log(event.target);

    let productThatWasClicked = event.target.id;
    state.forEach(image => {
        if (image.name === productThatWasClicked) {
            image.timesClicked += 1;
        }
    });

    if (roundsOfVoting) {
        renderProducts();
        roundsOfVoting--;
    } else {
        voteTrackerEl.removeEventListener('click', handleProductClick);
        chartObj = drawChart();
        let buttonEl = document.getElementById('results-button');
        buttonEl.addEventListener('click', renderData);
        alert('No more votes available!');
    };
};


voteTrackerEl.addEventListener('click', handleProductClick);

renderProducts();

function renderData(event) {
    // let buttonClicked = event.target.id;
    state.forEach(image =>{
        let listItemEl = document.createElement('li');
        let parentContainer = document.getElementById('results-list');
        parentContainer.appendChild(listItemEl);
        listItemEl.innerHTML = `Product: ${image.name} had ${image.timesClicked} votes and was shown ${image.timesShown} times.`;
        image.timesClicked;
        image.timesShown;
    });
};

const canvasEl = document.getElementById('myChart');

function drawChart() {
    let labels = []
    let timesShownValues = [];
    let timesClickedValues = []
    state.forEach(image => {
    
        labels.push(image.name);
        timesShownValues.push(image.timesShown);
        timesClickedValues.push(image.timesClicked);
    });

return new Chart(canvasEl, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{ 
      label: 'Total # of Votes',
      data: timesClickedValues,
      borderWidth: 1
    }, {
    label: 'Total # of times shown',
    data: timesShownValues,
    borderWidth: 1
  }],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
};

// const canvasEl = document.getElementById('canvas');

// const drawingContext = canvasEl.getContext('2d');

// drawingContext.strokeRect(0, 0, 10, 10);
// drawingContext.strokeRect(10, 10, 10, 10);
// drawingContext.strokeRect(20, 20, 10, 10);
// drawingContext.strokeRect(30, 30, 10, 10);
// drawingContext.strokeRect(40, 40, 10, 10);
// drawingContext.strokeRect(50, 50, 10, 10);
// drawingContext.strokeRect(60, 60, 10, 10);
// drawingContext.strokeRect(70, 70, 10, 10);
// drawingContext.strokeRect(80, 80, 10, 10);
// drawingContext.strokeRect(90, 90, 10, 10);
// drawingContext.strokeRect(100, 100, 10, 10);
// drawingContext.strokeRect(110, 110, 10, 10);
// drawingContext.strokeRect(120, 120, 10, 10);
// drawingContext.strokeRect(130, 130, 10, 10);
// drawingContext.strokeRect(140, 140, 10, 10);
// drawingContext.strokeRect(150, 150, 10, 10);
// drawingContext.strokeRect(160, 160, 10, 10);
// drawingContext.strokeRect(170, 170, 10, 10);
// drawingContext.strokeRect(180, 180, 10, 10);
// drawingContext.strokeRect(190, 190, 10, 10);
// drawingContext.strokeRect(200, 200, 10, 10);
// drawingContext.strokeRect(210, 210, 10, 10);
// drawingContext.strokeRect(220, 220, 10, 10);
// drawingContext.strokeRect(230, 230, 10, 10);
// drawingContext.strokeRect(240, 240, 10, 10);
// drawingContext.strokeRect(250, 250, 10, 10);

// drawingContext.strokeRect(490, 0, 10, 10);
// drawingContext.strokeRect(480, 10, 10, 10);
// drawingContext.strokeRect(470, 20, 10, 10);
// drawingContext.strokeRect(460, 30, 10, 10);
// drawingContext.strokeRect(450, 40, 10, 10);
// drawingContext.strokeRect(440, 50, 10, 10);
// drawingContext.strokeRect(430, 60, 10, 10);
// drawingContext.strokeRect(420, 70, 10, 10);
// drawingContext.strokeRect(410, 80, 10, 10);
// drawingContext.strokeRect(400, 90, 10, 10);
// drawingContext.strokeRect(390, 100, 10, 10);
// drawingContext.strokeRect(380, 110, 10, 10);
// drawingContext.strokeRect(370, 120, 10, 10);
// drawingContext.strokeRect(360, 130, 10, 10);
// drawingContext.strokeRect(350, 140, 10, 10);
// drawingContext.strokeRect(340, 150, 10, 10);
// drawingContext.strokeRect(330, 160, 10, 10);
// drawingContext.strokeRect(320, 170, 10, 10);
// drawingContext.strokeRect(310, 180, 10, 10);
// drawingContext.strokeRect(300, 190, 10, 10);
// drawingContext.strokeRect(290, 200, 10, 10);
// drawingContext.strokeRect(280, 210, 10, 10);
// drawingContext.strokeRect(270, 220, 10, 10);
// drawingContext.strokeRect(260, 230, 10, 10);
// drawingContext.strokeRect(250, 240, 10, 10);
// drawingContext.strokeRect(240, 250, 10, 10);



// let scale = 1;
// function drawRectangles() {
//     let x = 0;
//     let y = 0;
//     let height = 10 * scale;
//     let width = 10 * scale;
//     drawingContext.strokeRect(x, y, height, width);
// }

// setInterval(() => {
//     drawRectangles(scale += 1); 
// }, 500);

// console('THIS IS THE CHART LIBRARY', );