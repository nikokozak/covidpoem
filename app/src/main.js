const axios = require('axios').default
import Papa from './papaparse.min.js'
import _h from './utils.js'

axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto5/TotalesNacionales_T.csv')
.then( response => {
	
	let result = Papa.parse(response.data, 
		{ skipEmtpyLines: true, 
			header: true, 
			dynamicTyping: true,
		});

	_h.handleParseErrors(result)

	console.log(result);

	let latest = _h.getLatestData(result)

	_h.changeCount("totalCount", _h.getTotalCount(latest))
	_h.changeCount("newCount", _h.getNewCount(latest))
	_h.changeCount("activeCount", _h.getActiveCount(latest))
	_h.changeCount("recoveredCount", _h.getRecoveredCount(latest))
	_h.changeCount("deadCount", _h.getDeadCount(latest))
	
	let deadYesterday = _h.diffDataFromEnd(0, 1, 'Fallecidos', result)
	let newCountDiff = _h.diffDataFromEnd(0, 1, 'Casos nuevos totales', result)

	_h.changeCount("newCountYesterday", Math.abs(newCountDiff))
	_h.changeText('switchNew', _h.switchFormat(newCountDiff, 'mas', 'menos'))

	_h.changeCount("yesterdayDeadCount", deadYesterday)

});

console.log("Hey!");
