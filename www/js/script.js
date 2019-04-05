let tempReading =[]; //variable named tempreading
let timeScale =[]; //variable named timescale

const url = "/getData"; //implements this url
fetch(url) //fetches the above url
.then(res => res.json())
.then(data => {
  var sensorReadings = data; //sensorreadings is the variable name to store the data
  sensorReadings.map((sensorReading)=> { //mapping function for the sensorreadings
    tempReading.push(sensorReading.temperature); //push the temperature into the variable tempreading
    timeScale.push(sensorReading.time); //same as above but time into timescale
  });
  console.log(tempReading); //print the tempreadings out
  console.log(timeScale); //print the times out
});

var ctx = document.getElementById('myChart').getContext('2d'); //creating a document, a chart in 2d
var myChart = new Chart(ctx, { //named my chart
    type: 'line', //type is a line graph
    labels: [tempReading, timeScale], //supposed to be the x axis as temperatures and y axis as times
    data: {
        datasets: [{
          label: 'Temperature Readings', //name of the x axis
            data: [{
              label: 'Temperature Readings', //name of the chart
                x: 0,//where the x axis starts (got muddled here)
                y: 0 //where the y axis starts (got muddled here)

            } ]
        }],
        options: {
       scales: {
           xAxes: [{
               type: 'linear', //line graph
               position: 'bottom' //from the bottom

           }]
       }
   }
}
});
