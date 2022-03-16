class ScatterBarChart {
    constructor(_data, _sLegend) {
        this.data = _data;
        this.sLegend = _sLegend;

        this.chartWidth = 300;
        this.chartHeight = 300;
        this.spacing = 5;
        this.margin = 30;
        this.numTicks = 10;
        this.numTicksX = 5;
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
        this.tickSpacingX = this.chartWidth / this.numTicksX;
        this.availableWidth = this.chartWidth - (this.margin * 2) - (this.spacing * (this.data.length - 1));
        this.barWidth = this.availableWidth / this.data.length;

        this.title = "Songwriter With Largest Vocabulary";
        this.yTitle = "Unique Words per Song";
        this.titleFontSize = 22;
        this.fontColor = (0, 0, 0);

        let listValuesY = this.data.map(function (x) {
            return x.uWords
        })
        this.maxValueY = max(listValuesY);
        this.tickIncrementsY = this.maxValueY / this.numTicks;

        let listValuesX = this.data.map(function (x) {
            return x.sWriter
        })
        this.maxValueX = max(listValuesX);
        this.tickIncrementsX = this.maxValueX / this.numTicksX;
    }



    calculateMaxValue() {
        let listValues = this.data.map(function (x) {
            return x.wTotal
        })
        this.maxValue = max(listValues);
        this.tickIncrements = this.maxValue / this.numTicks;
    }

    render() {

        push()
        translate(this.posX, this.posY);
        this.drawTicks();
        this.drawHorizontalLines();
        this.drawAxis();
        this.drawTitle();
        this.drawLegend();
        this.drawEllipse();
        pop()
    }

    drawLegend() {

        push();
        translate(0, -this.chartHeight);
        for (let i = 0; i < this.sLegend.length; i++) {
            noStroke();
            fill(this.fontColor);
            textSize(14);
            textAlign(LEFT, CENTER);
            text(this.sLegend[i].name, this.chartWidth + this.margin, this.tickSpacing * i);
            fill(this.sLegend[i].colour)
            ellipse(this.chartWidth + this.margin - 10, this.tickSpacing * i, 10, 10)
        }
        pop();


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
    scaleXdata(num) {
        return map(num, this.maxValueX, 0, this.chartHeight, 0);
    }

    scaleYdata(num) {
        return map(num, this.maxValueY, 0, this.chartHeight, 0);
    }

    drawAxis() {
        //chart
        stroke(1);
        strokeWeight(1);
        line(0, 0, 0, -this.chartHeight); //y
        line(0, 0, this.chartWidth, 0); //x
    }

    drawTicks() {
        for (let i = 0; i <= this.numTicks; i++) {
            //ticks yAxis
            stroke(0);
            strokeWeight(1)
            line(0, this.tickSpacing * -i, -10, this.tickSpacing * -i);

            push();
            for (let j = 0; j <= this.numTicksX; j++) {
                // ticks xAxis
                stroke(0);
                strokeWeight(.1)
                line(this.tickSpacingX * j, 0, this.tickSpacingX * j, 10);
            }
            pop();


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

            push();
            for (let j = 0; j <= this.numTicksX; j++) {
                stroke(0, 50);
                strokeWeight(0.3)
                //vertical line
                line(this.tickSpacingX * j, 0, this.tickSpacingX * j, -this.chartHeight);
            }
            pop();

        }
    }

    drawEllipse() {
        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {

            noStroke();
            fill(this.sLegend[i].colour)
            let ellipseX = this.scaleXdata(this.data[i].sWriter);
            let ellipseY = this.scaleYdata(this.data[i].uWords);
            let ellipseRadius = this.data[i].uWords;

            ellipse(ellipseX, -ellipseY, ellipseRadius / 5)

        }
        pop()
    }
}