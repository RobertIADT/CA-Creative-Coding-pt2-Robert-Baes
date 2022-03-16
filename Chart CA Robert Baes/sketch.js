let data01 = [{
        name: "Lennon & McCartney",
        songsWritten: 26,
        values: [47, 51, 14, 37, 27],
        total: 100,
        year: 1964,
        sTotal: 200,
        wTotal: 140,
        uWords: 129,
        sWriter: 40,
        chart: 99,
        hit: "Something New!"
    },

    {
        name: "McCartney",
        songsWritten: 29,
        values: [42, 40, 23, 28, 23],
        total: 100,
        year: 1965,
        sTotal: 200,
        wTotal: 140,
        uWords: 121,
        sWriter: 150,
        chart: 95,
        hit: "Help!"
    },

    {
        name: "Lennon",
        songsWritten: 31,
        values: [42, 48, 21, 32, 32],
        total: 100,
        year: 1966,
        sTotal: 200,
        wTotal: 140,
        uWords: 117,
        sWriter: 280,
        chart: 96,
        hit: "Yesterday"
    },

    {
        name: "Harrison",
        songsWritten: 12,
        values: [50, 54, 25, 21, 42],
        total: 100,
        year: 1967,
        sTotal: 200,
        wTotal: 140,
        uWords: 70,
        sWriter: 390,
        chart: 94,
        hit: "Magical Mystery Tour"
    },

    {
        name: "Ringo",
        songsWritten: 2,
        values: [20, 15, 33, 33, 33],
        total: 100,
        year: 1970,
        sTotal: 200,
        wTotal: 140,
        uWords: 89,
        sWriter: 500,
        chart: 96,
        hit: "Let it Be"
    },

];

let legend = [{
        name: "Love",
        colour: '#eb5c00'
    },
    {
        name: "Know",
        colour: '#e52f2e'
    },
    {
        name: "Yeah",
        colour: '#41aa29'
    },
    {
        name: "Can",
        colour: '#009fec'
    },
    {
        name: "Got",
        colour: '#423117'
    }
];

let sLegend = [{
        name: "Lennon & McCartney / A Day in the Life",
        colour: '#eb5c00'
    },
    {
        name: "McCartney / Penny Lane",
        colour: '#e52f2e'
    },
    {
        name: "Lennon / I'll Cry instead",
        colour: '#41aa29'
    },
    {
        name: "Harrison / Savoy Truffle",
        colour: '#009fec'
    },
    {
        name: "Ringo / Octopus's Garden",
        colour: '#423117'
    }
];


let chart01;
let chart02;
let chart03;
let chart04;

function setup() {
    createCanvas(1700, 1700);

    chart01 = new BarChart(data01)
    chart01.chartWidth = 400;
    chart01.chartHeight = 200
    chart01.posX = 200;
    chart01.posY = 400;
    chart01.updateValues();

    chart02 = new HrBarChart(data01)
    chart02.chartWidth = 200;
    chart02.chartHeight = 400
    chart02.posX = 900;
    chart02.posY = 400;
    chart02.updateValues();

    chart03 = new StBarChart(data01, legend)
    chart03.chartWidth = 400;
    chart03.chartHeight = 200
    chart03.posX = 200;
    chart03.posY = 1000;
    chart03.updateValues();

    chart04 = new ScatterBarChart(data01, sLegend)
    chart04.chartWidth = 500;
    chart04.chartHeight = 300
    chart04.posX = 900;
    chart04.posY = 1000;
    chart04.updateValues();


}


function draw() {
    background('#dbceac');
    textSize(50);
    text("Beatles Charts", 650, 80);
    line(100, 100, 1600, 100);
    scale(1); //scales the charts
    chart01.updateValues();
    chart02.updateValues();
    chart03.updateValues();
    chart04.updateValues();
    chart01.render();
    chart02.render();
    chart03.render();
    chart04.render();

}