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
    state.forEach(image => {
        let listItemEl = document.createElement('li');
        let parentContainer = document.getElementById('results-list');
        parentContainer.appendChild(listItemEl);
        listItemEl.innerHTML = `Product: ${image.name} had ${image.timesClicked} votes and was shown ${image.timesShown} times.`;
        image.timesClicked;
        image.timesShown;
        document.getElementById("results-button").disabled = true;
    });
};

function compareDataPointYAscend(dataPoint1, dataPoint2) {
    return dataPoint1.y - dataPoint2.y;
}

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

canvasEl.options.data[0].dataPoints.sort(compareDataPointYAscend);
