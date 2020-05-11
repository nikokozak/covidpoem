const axios = require('axios').default
import Papa from './papaparse.min.js'

axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto5/TotalesNacionales_T.csv')
.then( response => {
	
	let handleError = (err, f) => { console.log(f) }

	let result = Papa.parse(response.data, 
		{ skipEmtpyLines: true, 
			header: true, 
			dynamicTyping: true,
			error: handleError,
		});

	let error = result.errors[0].row

	result.data.splice(error, 1)
	
	console.log(result);
});

console.log("Hey!");
