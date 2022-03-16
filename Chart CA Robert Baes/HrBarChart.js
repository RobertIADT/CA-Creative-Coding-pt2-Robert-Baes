class HrBarChart {
    constructor(_data) {
        this.data = _data;
      
        this.chartWidth = 300;
        this.chartHeight = 300;
        this.spacing = 10;
        this.margin = 30;
        this.numTicks = 5;
        this.posX = 50;
        this.posY = 400;
        this.tickIncrements;
        this.maxValue;
        this.numPlaces;
        this.tickSpacing;
        this.barWidth;
        this.availableWidth;

        this.title; // add a title
        this.titleFontSize;
        this.yTitle;

        this.showValues = true;
        this.showLabels = true;
        this.rotateLabels = true;

        this.colors = [color('#eb5c00'), color('#e52f2e'), color('#41aa29'), color('#009fec'), color('#423117')];

        this.fontColor;
        this.updateValues();
        this.calculateMaxValue();
    }

    updateValues() {
        this.tickSpacing = this.chartHeight / this.numTicks;
        this.availableWidth = this.chartWidth - (this.margin * 2) - (this.spacing * (this.data.length - 1));
        this.barWidth = this.availableWidth / this.data.length;

        this.title = "What Were Their Greatest Hits";
        this.yTitle = "Place in top 100";
        this.titleFontSize = 22;
        this.fontColor = (0, 0, 0);
    }

    calculateMaxValue() {
        let listValues = this.data.map(function (x) {
            return x.total
        })
        this.maxValue = max(listValues);
        this.tickIncrements = this.maxValue / this.numTicks;
    }

    render() {

        push()
        translate(this.posX, this.posY);

        this.drawTicks();
        this.drawVerticalLines();
        this.drawRects();
        this.drawAxis();
        this.drawTitle();
        pop()
    }

    drawTitle() {
        fill(this.fontColor);
        textAlign(CENTER, CENTER)
        textSize(this.titleFontSize);
        text(this.title, this.chartHeight / 2, -this.chartWidth - 50)

        push()

        fill(this.fontColor);
        textAlign(CENTER, CENTER)
        textSize(this.titleFontSize);
        text(this.yTitle, this.chartHeight / 2, this.barWidth + 40)
        pop()

    }

    scaleData(num) {
        return map(num, 0, this.maxValue, 0, this.chartHeight);
    }

    drawAxis() {
        //chart
        stroke(this.fontColor);
        strokeWeight(1);
        line(0, 0, 0, -this.chartWidth); //y
        line(0, 0, this.chartHeight, 0); //x
    }

    drawTicks() {

        for (let i = 0; i <= this.numTicks; i++) {
            //ticks
            stroke(this.fontColor);
            strokeWeight(1)
            line(this.tickSpacing * i, 0, this.tickSpacing * i, 10);



            //numbers (text)
            if (this.showValues) {
                fill(this.fontColor);
                noStroke();
                textSize(14);
                textAlign(RIGHT, CENTER);
                text((i * this.tickIncrements).toFixed(this.numPlaces), this.tickSpacing * i, 20);


            }
        }
    }

    drawVerticalLines() {
        for (let i = 0; i <= this.numTicks; i++) {

            //horizontal line
            stroke(this.fontColor, 50);
            strokeWeight(1)
            line(this.tickSpacing * i, 0, this.tickSpacing * i, -this.chartWidth);


        }
    }

    drawRects() {
        push();
        translate(0, -this.margin);

        for (let i = 0; i < this.data.length; i++) {
            let colorNumber = i % 5;

            //bars
            fill(this.colors[colorNumber]);
            noStroke();
            rect(0, (this.barWidth + this.spacing) * -i, this.scaleData(this.data[i].chart), -this.barWidth);

            //numbers (text)
            noStroke();
            // rect(0,0,30)
            fill(this.fontColor);
            textSize(18);
            textAlign(LEFT, CENTER);
            // text(this.data[i].total, ((this.barWidth + this.spacing) * i) + this.barWidth * 2, this.scaleData(-this.data[i].total));

            text(this.data[i].year, this.scaleData(this.data[i].total), ((this.barWidth + this.spacing) * -i) - this.barWidth / 2);

            //text syntax is text(str, x, y, [x2], [y2])
            //text
            if (this.showLabels) {
                if (this.rotateLabels) {
                    push()

                    noStroke();
                    textSize(14);
                    textAlign(RIGHT, CENTER);

                    translate(-10, ((-this.barWidth - this.spacing) * i) - this.barWidth / 2); //translate(x,y)
                    text(this.data[i].hit, 0, 0);
                    // rotate(PI *  2)

                    // translate(this.data[i].name);
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