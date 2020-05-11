// UTILITIES AND HELPERS

const helpers = (function() {

	// Handle errors thrown by Papa while parsing.
	// Use instead of Papa callback.
	function handleErrors (parseObj) {
		
		let errorRows = parseObj.errors.map(x => x.row)
		errorRows.sort((a, b) => b - a)

		for (const index of errorRows) {
			parseObj.data.splice(index, 1)
		}

		return parseObj

	}

	return {
		// Make public
		handleErrors,

	}

})()

export default helpers 
