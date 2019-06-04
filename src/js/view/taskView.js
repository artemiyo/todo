import { elements } from '../view/base';

// Get the value of task
export const getInput = () => elements.task.value;

// Get priority from current option
export const getPriority = () => elements.priorityList.options[elements.priorityList.selectedIndex].value;

// Clear value of input
export const clearResult = () => {
	elements.task.value = '';
}

// Render added task
export const renderTask = (priority, value, id) => {
	const markup = `
		<li class="tasks__item tasks__item--${priority}" id="${id}">
			<p class="tasks__text">${value}</p>
			<div class="btn">
				<button class="btn__item" data-action="done">
					<i class="fas fa-check"></i>
				</button>
				<button class="btn__item btn__item--red" data-action="delete">
					<i class="fas fa-times"></i>
				</button>
			</div>
		</li>
	`;

	elements.taskList.forEach( list => {
		if(list.id === priority) {
			list.insertAdjacentHTML('beforeend', markup);
		};
	});
};

// Render the number of all tasks
export const renderNumber = sum => {
	elements.tasksNumber.innerText = sum;
};

// Render the number of tasks by priority
export const renderSeparateNumber = (quantity, priority) => {
	elements.priorityNumber.forEach(el => {
		const getData = el.dataset['priority'];

		if(getData === priority) return el.innerText = quantity;

	});
};

// Render percentage of completed tasks
export const renderPercentage = perc => {
	elements.complete.innerText = perc + '%';
}

// Render percentage of efficiency
export const renderEfficiency = perc => {
	elements.efficiencyPerc.innerText = perc + '%';
}

// Render circle diagram
export const circle = perc => {

	const value = perc * 408 / 100;

	elements.efficiencyChart.innerHTML = `
		<circle transform="rotate(-90)" style="stroke-dasharray:${value}px 408px;" r="65" cx="-90" cy="80" />
	`;
};