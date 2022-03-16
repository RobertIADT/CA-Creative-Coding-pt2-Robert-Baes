class StBarChart {
    constructor(_data, _legend) {
        this.data = _data;
        this.legend = _legend;

        this.chartWidth = 300;
        this.chartHeight = 300;
        this.spacing = 5;
        this.margin = 30;
        this.numTicks = 10;
        this.posX = 50;
        this.posY = 400;

        this.tickIncrements;
        this.maxValue;
        this.numPlaces;
        this.tickSpacing;
        this.barWidth;
        this.availableWidth;

        this.showValues = true;
        this.showLabels = true;
        this.rotateLabels = true;

        this.title;
        this.titleFontSize;
        this.yTitle;


        this.colors = [color('#eb5c00'), color('#e52f2e'), color('#41aa29'), color('#009fec'), color('#423117')];

        this.fontColor;

        this.updateValues();
        this.calculateMaxValue();
    }

    updateValues() {
        this.tickSpacing = this.chartHeight / this.numTicks;
        this.availableWidth = this.chartWidth - (this.margin * 2) - (this.spacing * (this.data.length - 1));
        this.barWidth = this.availableWidth / this.data.length;

        this.title = "Most common words in their songs";
        this.yTitle = "percentage";
        this.titleFontSize = 22;
        this.fontColor = (0, 0, 0);
    }


    drawLegend() {

        push();
        translate(0, -this.chartHeight);
        for (let i = 0; i < this.legend.length; i++) {
            noStroke();
            fill(this.fontColor);
            textSize(14);
            textAlign(LEFT, CENTER);
            text(this.legend[i].name, this.chartWidth + this.margin, this.tickSpacing * i);
            fill(this.legend[i].colour)
            ellipse(this.chartWidth + this.margin - 10, this.tickSpacing * i, 10, 10)
        }
        pop();


    }

    calculateMaxValue() {
        let listValues = this.data.map(function (x) {
            return x.sTotal
        })
        this.maxValue = max(listValues);
        this.tickIncrements = this.maxValue / this.numTicks;
    }

    render() {

        push()
        translate(this.posX, this.posY);

        this.drawTicks();
        this.drawHorizontalLines();
        this.drawRects();
        this.drawAxis();
        this.drawTitle();
        this.drawLegend();
        pop()
    }

    drawTitle() {
        fill(this.fontColor);
        textAlign(CENTER, CENTER)
        textSize(this.titleFontSize);
        text(this.title, this.chartWidth / 2, -this.chartHeight - 50)

        // y axis title
        push()
        rotate(PI / -2)
        fill(this.fontColor);
        textAlign(CENTER, CENTER)
        textSize(this.titleFontSize);
        text(this.yTitle, this.chartHeight / 2, -this.barWidth)
        pop()

    }
    scaleData(num) {
        return map(num, 0, this.maxValue, 0, this.chartHeight);
    }

    drawAxis() {
        //chart
        stroke(this.fontColor);
        strokeWeight(1);
        line(0, 0, 0, -this.chartHeight); //y
        line(0, 0, this.chartWidth, 0); //x
    }

    drawTicks() {
        for (let i = 0; i <= this.numTicks; i++) {
            //ticks
            stroke(0);
            strokeWeight(1)
            line(0, this.tickSpacing * -i, -10, this.tickSpacing * -i);


            //numbers (text)
            if (this.showValues) {
                fill(0);
                noStroke();
                textSize(14);
                textAlign(RIGHT, CENTER);
                text((i * this.tickIncrements).toFixed(this.numPlaces), -15, this.tickSpacing * -i);
            }
        }
    }

    drawHorizontalLines() {
        for (let i = 0; i <= this.numTicks; i++) {

            //horizontal line
            stroke(0, 50);
            strokeWeight(1)
            line(0, this.tickSpacing * -i, this.chartWidth, this.tickSpacing * -i);


        }
    }

    drawRects() {
        push();

        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {

            push();
            for (let j = 0; j < this.data[i].values.length; j++) {
                let colorNumber = j % 5;
                fill(this.colors[colorNumber]);
                noStroke();
                rect((this.barWidth + this.spacing) * i, 0, this.barWidth, this.scaleData(-this.data[i].values[j]));
                translate(0, this.scaleData(-this.data[i].values[j]))
            }
            pop();

            //bars


            //numbers (text)
            noStroke();
            fill(0);
            textSize(18);
            textAlign(CENTER, BOTTOM);
            text(this.data[i].stotal, ((this.barWidth + this.spacing) * i) + this.barWidth / 2, this.scaleData(-this.data[i].stotal));

            //text
            if (this.showLabels) {
                if (this.rotateLabels) {
                    push()
                    noStroke();
                    textSize(14);
                    textAlign(LEFT, CENTER);
                    translate(((this.barWidth + this.spacing) * i) + this.barWidth / 2, 10);
                    rotate(PI / 4)
                    text(this.data[i].name, 0, 0);
                    pop()
                } else {

                    noStroke();
                    fill(255);
                    textSize(14);
                    textAlign(CENTER, BOTTOM);
                    text(this.data[i].name, ((this.barWidth + this.spacing) * i) + this.barWidth / 2, 20);
                }
            }


        }
        pop()
    }
}