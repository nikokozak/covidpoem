const axios = require('axios').default
import Papa from './papaparse.min.js'
import helpers from './utils.js'

axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto5/TotalesNacionales_T.csv')
.then( response => {
	
	let result = Papa.parse(response.data, 
		{ skipEmtpyLines: true, 
			header: true, 
			dynamicTyping: true,
		});

	helpers.handleErrors(result)

	console.log(result);
});

console.log("Hey!");
