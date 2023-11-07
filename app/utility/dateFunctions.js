import { zeroPad } from "./formatting";
import moment from "moment";

moment.suppressDeprecationWarnings = true;

export function isDatePassed(dateString) {
	const compareDate = moment(dateString, "DD-MM-YYYY");

	const today = new Date();
	if (compareDate.isBefore(today, "day")) {
		const yesterday = moment().add(-1, "day");
		if (compareDate.isSame(yesterday, "day")) return true;
		else return true;
	}
	return false;
}

export function getMySQLDate(date, sep = "/") {
	const numbers = date.split(sep);
	return numbers[2] + "-" + numbers[1] + "-" + numbers[0];
}

export function formatMySqlDate(object, field, sep = "/") {
	if (object[field] !== "" && object[field] !== null)
		return getMySQLDate(object[field], sep);
	return null;
}

export function formatDate(argDate) {
	const slicedDate = argDate.slice(0, 10);
	const numbers = slicedDate.split("-");
	return numbers[2] + "-" + numbers[1] + "-" + numbers[0];
}

export function getDate(date) {
	if (date) {
		const nums = date.split("-");
		return new Date(nums[2], nums[1] - 1, nums[0]);
	}
	return "";
}

export function getDateFromSqlDate(date) {
	const dateStr = date.split("T");
	const nums = dateStr[0].split("-");
	const newdate = new Date(nums[0], nums[1] - 1, nums[2]);
	return newdate;
}

export function getDDMMYYYY(date) {
	const m = date.getMonth() + 1;
	return (
		zeroPad(date.getDate(), 2) + "-" + zeroPad(m, 2) + "-" + date.getFullYear()
	);
}

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

export function getToday() {
	const d = new Date();

	return { dateFrom: getDDMMYYYY(d), dateTo: getDDMMYYYY(d) };
}

export function getDateString(dateString) {
	const compareDate = moment(dateString, "DD-MM-YYYY");

	const today = new Date();
	if (compareDate.isBefore(today, "day")) {
		const yesterday = moment().add(-1, "day");
		if (compareDate.isSame(yesterday, "day")) return "OVERDUE: Yesterday";
		else return "OVERDUE: " + dateString;
	}

	if (compareDate.isSame(today, "day")) return "DUE: Today";

	const tomorrow = moment().add(1, "day");
	if (compareDate.isSame(tomorrow, "day")) return "DUE: Tomorrow";

	const endofweek = moment().add(7, "day");
	if (compareDate.isBefore(endofweek, "day"))
		return "DUE: " + compareDate.format("dddd") + " (" + dateString + ")";

	if (dateString) return "DUE: " + dateString;

	return "";
}

export function getLongFormat(dateStr) {
	//  Convert a string like '2020-10-04T00:00:00' into '4/Oct/2020'
	let months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	let date = getDate(dateStr);
	let str =
		date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
	return str;
}

export function compareDates(dateA, dateB) {
	if (dateA === null && dateB === null) return 0;
	if (dateA === null) return 1;
	if (dateB === null) return -1;
	return moment(dateA, "DD-MM-YYYY") - moment(dateB, "DD-MM-YYYY");
}

export function incrementPeriod(dateFrom, dateTo, increment, weeks, weekdays) {
	//console.info("incrementWeek...", dateFrom, dateTo);
	if (dateFrom === dateTo) {
		const enddate = getDate(dateTo);
		//console.info(enddate, weekdays);
		const startdate = enddate.addDays(-1 * weekdays);
		//console.info(startdate);
		return { dateFrom: getDDMMYYYY(startdate), dateTo: getDDMMYYYY(enddate) };
	} else {
		if (increment < 0) {
			//negative - decrease
			const enddate = getDate(dateFrom).addDays(-1);
			const startdate = enddate.addDays(increment * weekdays);
			return { dateFrom: getDDMMYYYY(startdate), dateTo: getDDMMYYYY(enddate) };
		} else if (increment > 0) {
			const startdate = getDate(dateTo).addDays(1);
			const enddate = startdate.addDays(increment * weekdays);
			return { dateFrom: getDDMMYYYY(startdate), dateTo: getDDMMYYYY(enddate) };
		} else return { dateFrom, dateTo };
	}
}

export function incrementDate(periodType, dateFrom, dateTo, increment) {
	//console.info("incrementDate...", periodType, dateFrom);
	switch (periodType) {
		case "Today":
			if (increment === 0) return getToday();
			else return incrementToday(dateFrom, dateTo, increment);
		case "This Week":
			return incrementPeriod(dateFrom, dateTo, increment, 1, 6);
		case "This Fortnight":
			return incrementPeriod(dateFrom, dateTo, increment, 2, 13);
		case "This Month":
			return incrementMonth(dateFrom, dateTo, increment);
		case "This Quarter":
			return incrementQuarter(dateFrom, dateTo, increment);
		case "This Financial Year":
			return incrementFinancialYear(dateFrom, dateTo, increment);
		case "This Calendar Year":
			return incrementCalendarYear(dateFrom, dateTo, increment);
		default:
			return dateFrom;
	}
}

export function incrementToday(dateFrom, dateTo, increment) {
	const date = getDDMMYYYY(getDate(dateTo).addDays(increment));
	return { dateFrom: date, dateTo: date };
}

function incrementMonth(dateFrom, dateTo, increment) {
	const date = getDate(dateTo);
	let mth = date.getMonth();
	const origMth = mth;
	let year = date.getFullYear();
	let startdate = "";
	if (dateFrom === dateTo) {
		let d = date.getDate();
		if (mth === 0) {
			mth = 11;
			year = year - 1;
		} else mth = mth - 1;

		try {
			const validdate = new Date(year, mth, d);
			startdate = getDDMMYYYY(validdate); //   zeroPad(d, 2) + "-" + zeroPad(mth, 2) + "-" + year;
		} catch (e) {
			startdate = getDDMMYYYY(new Date(year, origMth, "01"));
		}
		return { dateFrom: startdate, dateTo };
	} else {
		if (increment === -1) {
			const date = getDate(dateFrom);
			let year = date.getFullYear();
			const d = date.getDate();
			let newmth = date.getMonth();
			if (newmth === 0) {
				newmth = 11;
				year = year - 1;
			} else newmth = newmth - 1;
			return {
				dateFrom: getDDMMYYYY(new Date(year, newmth, d)),
				dateTo: getDDMMYYYY(date),
			};
		} else {
			const date = getDate(dateTo);
			let year = date.getFullYear();
			const d = date.getDate();
			let newmth = date.getMonth();
			if (newmth === 11) {
				newmth = 0;
				year = year + 1;
			} else newmth = newmth + 1;
			return {
				dateFrom: getDDMMYYYY(date),
				dateTo: getDDMMYYYY(new Date(year, newmth, d)),
			};
		}
	}
}

function incrementQuarter(dateFrom, dateTo, increment) {
	if (dateFrom === dateTo) {
		return getQuarter(dateFrom);
	} else {
		const date = getDate(dateFrom);
		const mth = date.getMonth();
		const year = date.getFullYear();
		const quarter = getNewQuarter(mth, year, increment);
		return getQuarter(getDDMMYYYY(new Date(quarter.year, quarter.month, "01")));
	}
}

function getQuarter(thedate) {
	const date = getDate(thedate);
	const month = date.getMonth() + 1;

	switch (month) {
		case 1:
		case 2:
		case 3:
			return {
				dateFrom: getDDMMYYYY(new Date(date.getFullYear(), "00", "01")),
				dateTo: getDDMMYYYY(new Date(date.getFullYear(), "02", "31")),
			};
		case 4:
		case 5:
		case 6:
			return {
				dateFrom: getDDMMYYYY(new Date(date.getFullYear(), "03", "01")),
				dateTo: getDDMMYYYY(new Date(date.getFullYear(), "05", "30")),
			};
		case 7:
		case 8:
		case 9:
			return {
				dateFrom: getDDMMYYYY(new Date(date.getFullYear(), "06", "01")),
				dateTo: getDDMMYYYY(new Date(date.getFullYear(), "08", "30")),
			};
		default:
			return {
				dateFrom: getDDMMYYYY(new Date(date.getFullYear(), "09", "01")),
				dateTo: getDDMMYYYY(new Date(date.getFullYear(), "11", "31")),
			};
	}
}

function getNewQuarter(month, year, increment) {
	switch (month) {
		case 0:
			if (increment === -1) return { month: 9, year: year - 1 };
			else return { month: 4, year: year };
		case 3:
			if (increment === -1) return { month: 0, year: year };
			else return { month: 6, year: year };
		case 6:
			if (increment === -1) return { month: 3, year: year };
			else return { month: 9, year: year };
		case 9:
			if (increment === -1) return { month: 6, year: year };
			else return { month: 0, year: year + 1 };
		default:
			return { month, year };
	}
}

function incrementFinancialYear(dateFrom, dateTo, increment) {
	if (increment === 0) {
		const date = getDate(dateFrom);
		let month = date.getMonth();
		let year = date.getFullYear();
		if (month >= 6)
			return {
				dateFrom: getDDMMYYYY(new Date(year, "06", "01")),
				dateTo: getDDMMYYYY(new Date(year + 1, "05", "30")),
			};
		else
			return {
				dateFrom: getDDMMYYYY(new Date(year - 1, "06", "01")),
				dateTo: getDDMMYYYY(new Date(year, "05", "30")),
			};
	} else {
		const date = getDate(dateFrom);
		let year = date.getFullYear();
		year = year + increment;
		return {
			dateFrom: getDDMMYYYY(new Date(year, "06", "01")),
			dateTo: getDDMMYYYY(new Date(year + 1, "05", "30")),
		};
	}
}

function incrementCalendarYear(dateFrom, dateTo, increment) {
	const date = getDate(dateFrom);
	let year = date.getFullYear();
	year = year + increment;
	return {
		dateFrom: getDDMMYYYY(new Date(year, "0", "01")),
		dateTo: getDDMMYYYY(new Date(year, "11", "31")),
	};
}
