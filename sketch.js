//https://www.youtube.com/watch?v=NlBt-7PuaLk&ab_channel=CurranKelleher
//I used this video for support when creating this graph 
//I also used this weeks reading for help with the axis

// I did not order the chart because I think alphabetical is useful when looking at countries

const svg=d3.select('svg');
const width= +svg.attr('width');
const height= +svg.attr('height');

const render= data=>{

    const xValue= d=> d.childDeaths;
    const yValue= d=> d.Country; 
    const margin= {top: 20, right: 20, bottom: 40, left:150};
    const innerWidth= width-margin.left - margin.right;
    const innerHeight= height - margin.top -margin.bottom;

    const xScale=d3.scaleLinear()
    .domain([0, d3.max(data, d=> d.childDeaths)])
    .range([0, innerWidth]);



    const yScale=d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.2);

    const yAxis= d3.axisLeft(yScale);

    const g=svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    yAxis(g.append('g'));
    g.append('g').call(d3.axisBottom(xScale))
      .attr('transform', `translate(${0}, ${innerHeight})`);  ;

    g.selectAll('rect').data(data)
    .enter().append('rect')
    .attr('y', d=> yScale(yValue(d)))
    .attr('width', d=> xScale(xValue(d)))
    .attr('height', yScale.bandwidth());

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 600)
    .attr("y",  995)
    .text("Number of AIDS Related Child Deaths");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Country");

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 800)
    .attr("y",  50)
    .text("Number of AIDS Related Child Deaths Per Country");



};

d3.csv('data.csv').then(data => { 
    data.forEach(d =>{
        d.childDeaths= +d.childDeaths;
    })
   render(data);
});


