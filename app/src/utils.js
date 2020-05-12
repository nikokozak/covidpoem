// UTILITIES AND HELPERS

const _h = (function() {

	// Handle errors thrown by Papa while parsing.
	// Use instead of Papa callback.
	function handleParseErrors (parseObj) {
		
		let errorRows = parseObj.errors.map(x => x.row)
		errorRows.sort((a, b) => b - a)

		for (const index of errorRows) {
			parseObj.data.splice(index, 1)
		}

		return parseObj

	}

	// Format a number by adding decimal places (returns a string)
	function formatNumber (number) {
		
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

	}

	// Change the text of a given DOM element
	function changeText (id, newText) {

		let element = document.getElementById(id)

		element.innerHTML = newText

		return element

	}
	
	// Get the latest data entry from the Papa object data array.
	function getLatestData (parseObj) {

		return parseObj.data[parseObj.data.length - 1]

	}

	// Return a slice from the tail of the Papa object data array.
	function getTailData (parseObj, count = 1, includeLast = false) {
	
		let data = parseObj.data

		let sliceStart = data.length - 1 - count
		let sliceEnd = data.length

		return includeLast ? data.slice(sliceStart, sliceEnd) : data.slice(sliceStart, sliceEnd - 1)

	}
	
	// Simple ternary - if positive return first arg, if not second.
	function switchFormat (value, optionPos, optionNeg) {
		
		return value >= 0 ? optionPos : optionNeg

	}

	// Calculate the difference between two data rows using an index relative to the end
	// of the Papa data array.
	function diffDataFromEnd (row1, row2, column, parseObj, format = false) {

		let data = parseObj.data
		let index = parseObj.data.length - 1

		let rowa = data[index - row1]
		let rowb = data[index - row2]

		let result = rowa[column] - rowb[column]

		return format ? formatNumber(result) : result		
	}

	function meanDataFromEnd (numRows, column, parseObj, includeLast = true) {
		
		let data = parseObj.data
		let start = data.length - 1 - numRows
		let end = includeLast ? data.length : data.length - 1
		
		let slice = data.slice(start, end)

		let result = slice.reduce( (a, c) => a + parseFloat(c[column]), 0.0 )
		result = (result / numRows).toFixed(2)

		return result

	}

	// Get the total count from a single Papa data object.
	function getTotalCount (parseData, format = true) {

		let result = parseData['Casos totales']

		return format ? formatNumber(result) : result	
	}

	function getDuplDayCount(parseData,) {
		
		let result = parseData['Casos totales'] / parseData['Casos nuevos totales']
		
		return Math.round(result)
		
	}

	function getActiveCount (parseData, format = true) {

		let result = parseData['Casos activos']

		return format ? formatNumber(result) : result	
	}

	// Get the new cases count from a single Papa data object.
	function getNewCount (parseData, format = true) {
	
		let result = parseData['Casos nuevos totales']

		return format ? formatNumber(result) : result
	}

	// Get the recovered cases from a single Papa data object.
	function getRecoveredCount (parseData, format = true) {

		let result = parseData['Casos recuperados']

		return format ? formatNumber(result) : result
	}

	// Get the death count from a single Papa data object.
	function getDeadCount (parseData, format = true) {

		let result = parseData['Fallecidos']

		return format ? formatNumber(result) : result
	}

	// Get the date string from a single Papa data object.
	function getDate (parseData) {

		return parseData['Fecha']

	}

	// Get the total number of occupied ventilators from a Papa data object.
	function getVentilatorCount (parseData, format = true) {

		let result = parseData['disponibles']

		return format ? formatNumber(result) : result

	}

	function getCriticalCount (parseData, format = true) {

		let result = parseData['Pacientes criticos']

		return format ? formatNumber(result) : result

	}

	function getBedCount (parseData, format = true) {

		let result = parseData['<=39']
			+ parseData['40-49']
			+ parseData['50-59']
			+ parseData['60-69']
			+ parseData['>=70']

		return format ? formatNumber(result) : result

	}

	function getTestingCount (parseData, format = true) {
		
		let result = parseData['Numero de PCR']

		return format ? formatNumber(result) : result

	}

	// Aggregate all Quarantine names to string, prune with regexp.
	function getQuarantineList (data) {
		
		let result = data.reduce( (a, c) => 
			{
				
				let re = /([\s\S]*)(Extensión a Total|Extendido)/gu
				let test = re.exec(c['Nombre'].toString())

				let result = test ? test[1].slice(0, -1) : c['Nombre']
				
				return a + result + ', ' 
			
			}, '')

		return result.slice(0, result.length - 2)

	}
	
	// Change the count displayed in a given id tag.
	function changeCount (id, newCount) {
		
		let element = document.getElementById(id)

		element.innerHTML = newCount

		return element

	}

	return {
		// Make public
		handleParseErrors,
		formatNumber,
		changeText,
		meanDataFromEnd,
		changeCount,
		switchFormat,
		diffDataFromEnd,
		getTailData,
		getLatestData,
		getDuplDayCount,
		getTotalCount,
		getActiveCount,
		getNewCount,
		getRecoveredCount,
		getDeadCount,
		getVentilatorCount,
		getCriticalCount,
		getBedCount,
		getTestingCount,
		getQuarantineList,
		getDate,

	}

})()

export default _h 
