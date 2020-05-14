const axios = require('axios').default // HTTP Requests
import Papa from './papaparse.min.js' // CSV Parser
import MicroModal from 'micromodal' // Modal handler
import _h from './utils.js' // Custom helpers
import {makeTimer} from './timer.js' // Custom timer for clocks
import { formatData, handleClick } from './charts.js' // Chart wrapper

// Modal handler.
MicroModal.init()

// Options for PapaParser.
const PARSEOPTIONS = {
	skipEmptyLines: true,
	header: true,
	dynamicTyping: true,
}

/* ---------------- */
//	MAIN PAGE DATA //
/* ---------------- */

axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto5/TotalesNacionales_T.csv')
.then( response => {

	// Parse response with PapaParse
	let result = Papa.parse(response.data, PARSEOPTIONS);

	result = _h.handleParseErrors(result)

	// -- DEBUG -- console.log('Main Page results:', result)

	// Get the latest data item from the data array.
	let latestData = _h.getLatestData(result)

	// Adjust text on page.
	_h.changeText('refreshDate', _h.getDate(latestData))

	// Refresh counters.
	_h.changeCount("totalCount", _h.getTotalCount(latestData))
	_h.changeCount("newCount", _h.getNewCount(latestData))
	_h.changeCount("activeCount", _h.getActiveCount(latestData))
	_h.changeCount("recoveredCount", _h.getRecoveredCount(latestData))
	_h.changeCount("deadCount", _h.getDeadCount(latestData))

	// Calculate wrangled numbers (difference of dead between yesterday/today, etc)
	let deadYesterday = _h.diffDataFromEnd(0, 1, 'Fallecidos', result)
	let newCountDiff = _h.diffDataFromEnd(0, 1, 'Casos nuevos totales', result)

	_h.changeCount("newCountYesterday", _h.formatNumber(Math.abs(newCountDiff)))

	// Handle lexical switch based on neg/pos numbers.
	_h.changeText('switchNew', _h.switchFormat(newCountDiff, 'más', 'menos'))

	_h.changeCount("yesterdayDeadCount", deadYesterday)

	// Calculate days-to-duplicate
	let duplicateDays = _h.getDuplDayCount(latestData)
	_h.changeCount("dupTime", duplicateDays)

	// Timers
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

/* ---------------- */
//	VENTILATOR DATA //
/* ---------------- */
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto20/NumeroVentiladores_T.csv').then( response => {

	let result = Papa.parse(response.data, PARSEOPTIONS)

	// -- DEBUG -- console.log('Ventilators results:', result)

	let latestData = _h.getLatestData(result)

	// Refresh count.
	_h.changeCount("ventilatorCount", _h.getVentilatorCount(latestData));

	// Chart handler.
	handleClick('ventilatorCount', 'Ventiladores Disponibles', formatData(10, 'disponibles', 'Ventiladores', result))

});

/* ---------------------- */
//	CRITICAL PATIENT DATA //
/* ---------------------- */
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto23/PacientesCriticos_T.csv').then( response => {
	
	let result = Papa.parse(response.data, PARSEOPTIONS)

	// -- DEBUG -- console.log('Critical results:', result)

	let latestData = _h.getLatestData(result)

	// Refresh count
	_h.changeCount("criticalCount", _h.getCriticalCount(latestData));

	// Chart handler.
	handleClick('criticalCount', 'Pacientes Criticos', formatData(10, 'Pacientes criticos', 'Casos', result))

});

/* ----------------- */
//	UCI PATIENT DATA //
/* ---------------- */
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto9/HospitalizadosUCIEtario_T.csv').then( response => {
	
	let result = Papa.parse(response.data, PARSEOPTIONS)

	// -- DEBUG -- console.log('UCI results:', result)

	let latestData = _h.getLatestData(result)

	// Refresh count.
	_h.changeCount("bedCount", _h.getBedCount(latestData));

	// -- DEBUG -- console.log('UCI Bed count:', _h.getBedCount(result.data))

	// Chart handler.
	handleClick('bedCount', 'Pacientes en UCI', formatData(10, 'y', 'x', _h.getBedCount(result.data)))

});

/* ---------------- */
//	PCR TESTING DATA //
/* ---------------- */
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto17/PCREstablecimiento_std.csv').then( response => {
	
	let result = Papa.parse(response.data, PARSEOPTIONS)

	let latestData = _h.getLatestData(result)

	// -- DEBUG -- console.log('Testing results:', result)

	// Refresh count. 
	_h.changeCount("testCount", _h.getTestingCount(latestData));

	// Chart hanlder.
	handleClick('testCount', 'Testeo Diario', formatData(10, 'y', 'x', _h.getTestingCount(result.data)))

});

/* ---------------- */
//	INFEC RATE DATA //
/* ---------------- */
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto12/bulk/producto7.csv').then( response => {
	
	let result = Papa.parse(response.data, PARSEOPTIONS)

	let latestData = _h.meanDataFromEnd(16, 'Tasa', result)

	// Refresh count.
	_h.changeCount("rateCount", latestData);

});

/* ------------------------- */
//	QUARANTINE COMMUNAL DATA //
/* ------------------------ */
axios.get('https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto29/Cuarentenas-Activas.csv').then( response => {

	let result = Papa.parse(response.data, PARSEOPTIONS)
	
	// Refresh quarantine list.
	_h.changeText('quarantineList', _h.getQuarantineList(result.data))

});

console.log("Hola hola!!");
