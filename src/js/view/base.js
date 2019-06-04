export const elements = {
	date: document.querySelector('.date'),
	day: document.querySelector('.date__day'),
	dayOfWeek: document.querySelector('.date__day-of-week'),
	time: document.querySelector('.date__time'),
	task: document.querySelector('.add__input'),
	selectBlock: document.querySelector('.add__select-block'),
	efficiencyPerc: document.querySelector('.efficiency__perc'),
	efficiencyChart: document.querySelector('.efficiency__diagram'),
	information: document.querySelector('.information'),
	efficiency: document.querySelector('.efficiency'),
	tasksInformation: document.querySelector('.tasks-information'),
	add: document.getElementById('add'),
	priorityList: document.getElementById('priorityList'),
	tasksNumber: document.getElementById('tasksNumber'),
	complete: document.getElementById('complete'),
	openInfo: document.getElementById('openInfo'),
	taskList: document.querySelectorAll('.tasks__list'),
	priorityNumber: document.querySelectorAll('.tasks-information__num'),

	
}

export const data = {
	priority: elements.priorityList.options[elements.priorityList.selectedIndex].value
};

// Get real date
export const getDate = () => {
	const date = new Date();
	const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	// Recieve the name of the month from array
	months.forEach((month, index) => {
		if(index == date.getMonth()) {
			elements.day.textContent = `${date.getDate()} ${month}, ${date.getFullYear()}`;
		};
	});

	//Recieve the name of the day from array
	days.forEach((day, index) => {
		if(index === date.getDay()) {
			elements.dayOfWeek.textContent = day;
		};
	});
	
	// Recieve hours and minutes
	if(date.getHours() < 10) {
		elements.time.textContent = `0${date.getHours()}:${date.getMinutes()}`;
	} else {
		elements.time.textContent = `${date.getHours()}:${date.getMinutes()}`;
	}

	if(date.getMinutes() < 10) {
		elements.time.textContent = `${date.getHours()}:0${date.getMinutes()}`;
	} else {
		elements.time.textContent = `${date.getHours()}:${date.getMinutes()}`;
	};
};

// Change color of cirlce before priority 
export const changeColor = priority => {

	if(priority === 'high') {
		elements.selectBlock.classList.remove(`add__select-block--middle`);
		elements.selectBlock.classList.remove(`add__select-block--low`);
		elements.selectBlock.classList.add(`add__select-block--high`);

	} else if(priority === 'middle') {
		elements.selectBlock.classList.add(`add__select-block--middle`);
		elements.selectBlock.classList.remove(`add__select-block--low`);
		elements.selectBlock.classList.remove(`add__select-block--high`);
	} else if(priority === 'low') {
		elements.selectBlock.classList.remove(`add__select-block--middle`);
		elements.selectBlock.classList.add(`add__select-block--low`);
		elements.selectBlock.classList.remove(`add__select-block--high`);
	};
};


elements.openInfo.addEventListener('click', () => {
	elements.tasksInformation.classList.toggle('hidden');
	elements.efficiency.classList.toggle('hidden');
}) 