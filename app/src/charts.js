import Chart from 'chart.js'
import $ from 'jquery'
import MicroModal from 'micromodal'

function formatData ( numRows, column, data ) {

	let startIndex = data.data.length - numRows
	let endIndex = data.data.length

	let tail = data.data.slice(startIndex, endIndex)

	let formatted = tail.map(d => { return { x: new Date(d.Fecha), y: d[column] } })
	
	console.log('formatted', formatted)

	return formatted

}

function handleClick (id, chartTitle, _data) {
	
	let handle = "#" + id

	$( handle ).on( 'click', () => MicroModal.show('modal') )

	$( '#chart-title' ).text( chartTitle )

	let ctx = $( '#chartInsert' )

	let chart = new Chart (ctx, {

		type: 'line',
		
		// Requires array of objects, x: Date and y: Data keys.
		data: {

			datasets: [{
				
				data: _data,

				borderColor: 'rgba(125, 0, 0, 0.5)',
				backgroundColor: 'rgba(125, 0, 0, 0.5)',
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

				}]

			}

		} 

	})

	//console.log(chart)

}

export { formatData, handleClick }
