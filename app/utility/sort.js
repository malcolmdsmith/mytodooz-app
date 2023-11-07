import { compareDates } from "./dateFunctions";
import moment from "moment";

export function sortTodoItem(itemA, itemB) {
	if (compareDates(itemA.due_date, itemB.due_date) === 0) {
		//return itemA.priority === itemB.priority;
		return itemA.priority > itemB.priority ? 1 : -1;
	}
	return compareDates(itemA.due_date, itemB.due_date);
}

export function sortTodoItemByText(itemA, itemB) {
	return itemA.todo_text > itemB.todo_text ? 1 : -1;
}

export function sortTodoItems(list) {
	const today = moment();
	const overdue = list.filter((item) =>
		moment(item.due_date, "DD-MM-YYYY").isBefore(today)
	);
	const sorted = overdue.sort(sortTodoItem);
}

const data = [
	{ todo_text: "Test1", priority: 3, due_date: "2022-05-14" },
	{ todo_text: "Test2", priority: 2, due_date: null },
	{ todo_text: "Test3", priority: 2, due_date: "2022-05-13" },
	{ todo_text: "Test4", priority: 2, due_date: "2022-05-18" },
	{ todo_text: "Test5", priority: 1, due_date: null },
	{ todo_text: "Test6", priority: 1, due_date: "2022-05-13" },
];

export function SortData(list) {
	//const list = data.sort(sortTodoItem);
	for (i = 0; i < list.length; i++) {
		//console.info("...", list[i].todo_text, list[i].priority, list[i].due_date);
	}
}

// export function sortTodoItem(itemA, itemB) {
//   if (itemA.priority === itemB.priority) {
//     return compareDates(itemA.due_date, itemB.due_date);
//   }
//   return itemA.priority > itemB.priority ? 1 : -1;
// }
