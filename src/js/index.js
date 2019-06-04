// Import SCSS
import '../scss/main.scss';
import uniqid from 'uniqid';
// Import base elements
import Task from './modules/Task';
import * as taskView from './view/taskView';
import { elements, getDate, changeColor } from './view/base';


// Refresh our date informations every 100ms
setInterval(() => {
	getDate();

	// change circle color in select
	changeColor(taskView.getPriority());
}, 100);


/** Global state of the app
 * - added tasks by priority
 * - completed tasks by priority
 */
const state = {};

/* ====== TASK CONTROLLER ====== */

const controlTask = () => {

	if(!state.tasks) state.tasks = new Task();

	const priority = taskView.getPriority();
	const value = taskView.getInput();
	const id = uniqid();


	if(value) {
		// Add task to array
		state.tasks.addTask(priority, value, id);

		state.tasks.allTasks();

		// Render task
		taskView.renderTask(priority, value, id);

		// Render quantity of tasks from each array by priority
		taskView.renderSeparateNumber(state.tasks.separateTasks(priority), priority);

		// Reneder quantity of all tasks
		taskView.renderNumber(state.tasks.quantityOfTasks());

		// Clear task field
		taskView.clearResult();
	};
};

// Event Listener for add task button
elements.add.addEventListener('click', function(e) {
	e.preventDefault();
	controlTask();
});

// Event listener for all done/delete buttons
Array.from(elements.taskList).forEach( element => {
	element.addEventListener('click', function(e) {
		e.preventDefault();
		
		const action = e.target.parentNode.getAttribute('data-action');
		const item = e.target.parentNode.parentNode.parentNode;


		if(action === 'done') {
			
			// Add done tasks to the arrays
			state.tasks.doneTask(element.id, item.id);

			taskView.renderPercentage(state.tasks.calcComplete());

			taskView.renderNumber(state.tasks.quantityOfTasks());

			taskView.renderSeparateNumber(state.tasks.separateTasks(element.id), element.id);

			taskView.renderEfficiency(state.tasks.calcEfficiency());

			taskView.circle(state.tasks.calcEfficiency());

			item.remove();

		} else if (action === 'delete') {

			// Delete tasks from arrays
			state.tasks.deleteTask(element.id, item.id);

			taskView.renderSeparateNumber(state.tasks.separateTasks(element.id), element.id);

			taskView.renderNumber(state.tasks.quantityOfTasks());
			
			item.remove();
		};
	});
});