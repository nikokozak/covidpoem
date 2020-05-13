import Chart from 'chart.js'
import $ from 'jquery'

function formatData ( numRows, column, data ) {

	let startIndex = data.data.length - numRows
	let endIndex = data.data.length

	let tail = data.data.slice(startIndex, endIndex)

	let formatted = tail.map(d => { return { x: new Date(d.Fecha), y: d[column] } })

	return formatted

}

function handleClick (id, data) {
	
	let handle = "#" + id

	let ctx = $( handle )

	let chart = new Chart (ctx, {

		type: 'line',
		
		// Requires array of objects, x: Date and y: Data keys.
		data: [{
			
		}]

	})

}

