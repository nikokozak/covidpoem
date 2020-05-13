const axios = require('axios').default
import $ from 'jquery'
import Papa from './papaparse.min.js'
import MicroModal from 'micromodal'
import _h from './utils.js'
import {makeTimer} from './timer.js'
import { formatData, handleClick } from './charts.js'

MicroModal.init()

const PARSEOPTIONS = {
	skipEmptyLines: true,
	header: true,
	dynamicTyping: true,
}

// Get CSV for main page.
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto5/TotalesNacionales_T.csv')
.then( response => {

	// Parse response with PapaParse
	let result = Papa.parse(response.data, PARSEOPTIONS);

	result = _h.handleParseErrors(result)

	console.log('Main Page results:', result)

	// Get the latest data item from the data array.
	let latestData = _h.getLatestData(result)

	// Adjust text on page.
	_h.changeText('refreshDate', _h.getDate(latestData))

	_h.changeCount("totalCount", _h.getTotalCount(latestData))
	_h.changeCount("newCount", _h.getNewCount(latestData))
	_h.changeCount("activeCount", _h.getActiveCount(latestData))
	_h.changeCount("recoveredCount", _h.getRecoveredCount(latestData))
	_h.changeCount("deadCount", _h.getDeadCount(latestData))

	// Calculate wrangled numbers
	let deadYesterday = _h.diffDataFromEnd(0, 1, 'Fallecidos', result)
	let newCountDiff = _h.diffDataFromEnd(0, 1, 'Casos nuevos totales', result)

	_h.changeCount("newCountYesterday", Math.abs(newCountDiff))
	_h.changeText('switchNew', _h.switchFormat(newCountDiff, 'más', 'menos'))

	_h.changeCount("yesterdayDeadCount", deadYesterday)

	let duplicateDays = _h.getDuplDayCount(latestData)
	_h.changeCount("dupTime", duplicateDays)

	makeTimer('newTimer', 'Casos totales', result)
	makeTimer('deathTimer', 'Fallecidos', result)
	makeTimer('recoveredTimer', 'Casos recuperados', result)

	// CHART HANDLERS

	handleClick('totalCount', 'Casos Totales', formatData(10, 'Casos totales', 'Fecha', result))
	handleClick('newCount', 'Casos Nuevos', formatData(10, 'Casos nuevos totales', 'Fecha', result))
	handleClick('activeCount', 'Casos Activos', formatData(10, 'Casos activos', 'Fecha', result))
	handleClick('recoveredCount', 'Recuperados', formatData(10, 'Casos recuperados', 'Fecha', result))
	handleClick('deadCount', 'Fallecidos', formatData(10, 'Fallecidos', 'Fecha', result))

});

// Get CSV for ventilators.
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto20/NumeroVentiladores_T.csv').then( response => {

	let result = Papa.parse(response.data, PARSEOPTIONS)

	console.log('Ventilators results:', result)

	let latestData = _h.getLatestData(result)

	_h.changeCount("ventilatorCount", _h.getVentilatorCount(latestData));

	handleClick('ventilatorCount', 'Ventiladores Disponibles', formatData(10, 'disponibles', 'Ventiladores', result))

});

// Get CSV for critical patients.
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto23/PacientesCriticos_T.csv').then( response => {
	
	let result = Papa.parse(response.data, PARSEOPTIONS)

	console.log('Critical results:', result)

	let latestData = _h.getLatestData(result)

	_h.changeCount("criticalCount", _h.getCriticalCount(latestData));

	handleClick('criticalCount', 'Pacientes Criticos', formatData(10, 'Pacientes criticos', 'Casos', result))

});

// Get CSV for UCI patients.
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto9/HospitalizadosUCIEtario_T.csv').then( response => {
	
	let result = Papa.parse(response.data, PARSEOPTIONS)

	console.log('UCI results:', result)

	let latestData = _h.getLatestData(result)

	_h.changeCount("bedCount", _h.getBedCount(latestData));

	console.log('UCI Bed count:', _h.getBedCount(result.data))

	handleClick('bedCount', 'Pacientes en UCI', formatData(10, 'y', 'x', _h.getBedCount(result.data)))

});

// Get CSV for Testing data.
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto17/PCREstablecimiento_std.csv').then( response => {
	
	let result = Papa.parse(response.data, PARSEOPTIONS)

	let latestData = _h.getLatestData(result)

	console.log('Testing results:', result)

	_h.changeCount("testCount", _h.getTestingCount(latestData));

	handleClick('testCount', 'Testeo Diario', formatData(10, 'y', 'x', _h.getTestingCount(result.data)))

});

// Get CSV for Rate data
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto12/bulk/producto7.csv').then( response => {
	
	let result = Papa.parse(response.data, PARSEOPTIONS)

	let latestData = _h.meanDataFromEnd(16, 'Tasa', result)

	_h.changeCount("rateCount", latestData);

});

// Get CSV for Quarantine
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto29/Cuarentenas-Activas.csv').then( response => {

	let result = Papa.parse(response.data, PARSEOPTIONS)
	
	_h.changeText('quarantineList', _h.getQuarantineList(result.data))

});



console.log("Hey!");
