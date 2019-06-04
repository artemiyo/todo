export default class Task {
	constructor() {
		// Arrays of high, middle and low priority tasks
		this.high = [];
		this.middle = [];
		this.low = [];

		// All tasks
		this.all = [];

		// Completed tasks
		this.complete = [];

		// Arrays for done tasks (for calculating efficiency)
		this.high_Done = [];
		this.middle_Done = [];
		this.low_Done = [];

	};

	addTask(priority, value, id) {

		// Create task item
		const taskItem = {
			value,
			id,
			priority
		}
		// add task to the array
		this[priority].push(taskItem);
	};

	doneTask(priority, id) {

		// Find index of done task
		const index = this[priority].findIndex(el => el.id === id);

		// Add task to completed tasks
		this.complete.push(this[priority].slice(index, 1));

		// Add completed task to the done arrays (for calculating efficiency);
		const task = this[priority].splice(index, 1);
		this[`${priority}_Done`].push(task);
	};

	// delete tasks from arrays by priority 
	deleteTask(priority, id) {
		const index = this[priority].findIndex(el => el.id === id);
		this[priority].splice(index, 1);
	};

	// Collect all tasks in one array
	allTasks() {
		return this.all.concat(this.high, this.middle, this.low);
	}

	// Get quantity of all tasks
	quantityOfTasks() {
		return this.allTasks().length;
	};

	// Get length of separate arrays by priority
	separateTasks(priority) {
		return this[priority].length;
	};

	// Calc percentage of completed tasks
	calcComplete() {

		const complete = this.complete.length;
		const all = this.quantityOfTasks();

		return Math.floor((complete / (all + complete)) * 100);
	}

	// Calculation of efficiency percentage
	calcEfficiency() {

		const points = {
			high: 10,
			middle: 7,
			low: 5
		}

		const tasksAll = this.allTasks();
		const tasksComplete = this.complete;
		const completedTasks = [];

		// Add tasks from completed array to completed
		for(let i = 0; i < tasksComplete.length; i++) {
			for(let j = 0; j < tasksComplete[i].length; j++ ) {
				completedTasks.push(tasksComplete[i][j]);
			}
		}
		
		// Replace task by priority on appropriate point 
		const allPoints = tasksAll.map(cur => {
			if(cur.priority) return points[cur.priority];
		});

		// Replace all completed task by priority on appropriate point
		const allCompletedPoints = completedTasks.map(cur => {
			if(cur.priority) return points[cur.priority];
		});

		// the summation of the elements of both arrays
		const all = allPoints.reduce((a, b) => a + b, 0);
		const completed = allCompletedPoints.reduce((a,b) => a + b, 0);
		
		// Return percentage
		return Math.floor((completed / (all + completed)) * 100);

	};
};