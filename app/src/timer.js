import _h from './utils.js'

function makeTimer (id, column, data) {
	
	let diff = Math.abs(_h.diffDataFromEnd(0, 1, column, data))

	let seconds = Math.round((24 * 60 * 60) / diff)

	countdownClock (seconds, id)

}

function countdownClock (secs, id=null) {
	
	let store = secs

	return setInterval(() => {

		var sec_num = parseInt(secs, 10)
		var hours   = Math.floor(sec_num / 3600)
		var minutes = Math.floor(sec_num / 60) % 60
		var seconds = sec_num % 60

		secs -= 1

		if (secs == 0) {
			secs = store
		}

		if (id) {
			document.getElementById(id).innerHTML = [hours,minutes,seconds]
			.map(v => v < 10 ? "0" + v : v)
			.filter((v,i) => v !== "00" || i > 0)
			.join(":")
		}

		return [hours,minutes,seconds]
			.map(v => v < 10 ? "0" + v : v)
			.filter((v,i) => v !== "00" || i > 0)
			.join(":")

	}, 1000)

}

export {makeTimer, countdownClock}
