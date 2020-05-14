import Chart from 'chart.js'
import MicroModal from 'micromodal'

// WRAPPER FOR CHARTS LIBRARY //

// Format PapaParse data into something readable for Chart.js
function formatData ( numRows, column, dateColumn, data ) {

	if (!Array.isArray(data)) {
		data = data.data
	}

	let startIndex = data.length - numRows
	let endIndex = data.length

	let tail = data.slice(startIndex, endIndex)

	let formatted = tail.map(d => { return { x: new Date(d[dateColumn]), y: d[column] } })
	
	console.log('formatted', formatted)

	return formatted

}

// Create event listeners for a given count -> activate modal and render chart.
function handleClick (id, chartTitle, _data) {
	
	// let handle = "#" + id

	document.getElementById(id).addEventListener("click", () => { 

		MicroModal.show('modal') 

		document.getElementById('chart-title').textContent = chartTitle 

		let ctx = document.getElementById( 'chartInsert' ).getContext('2d')

		let chart = new Chart (ctx, {

			type: 'line',
			
			// Requires array of objects, x: Date and y: Data keys.
			data: {

				datasets: [{
					
					data: _data,

					lineTension: 0.2,

					borderColor: 'rgba(125, 0, 0, 1)',
					backgroundColor: 'rgba(125, 0, 0, 0.05)',
					pointRadius: 0,
					pointBackgroundColor: 'rgba(125, 0, 0, 0.5)',
		
				}]

			},

			options: {

				legend: {
				
					display: false,

				},

				scales: {
					
					xAxes: [{

						type: 'time',

						time: {
							
							stepSize: 2,

						},

						gridLines: {
							
							display: false,
							drawBorder: false,

						},

					}],

					yAxes: [{

						gridLines: {
							drawBorder: false,
							borderDash: [1, 1],
						},
						ticks: {
							padding: 10,
						}

					}],

				}

			} 

		})
	})

}

export { formatData, handleClick }
