'use strict'
class Accordion {
	constructor(id, {
		type = 'random'
	}) {
		this.container = document.getElementById(id);
		this.type = type;
		this.setUIType(type);
	}

	setUIType(type) {

		this.closeAllItems();
		this.openItem(1);

		if (type === 'random') {
			this.container.removeEventListener('click', this.setUITypeParticular);
			this.container.addEventListener('click', this.setUITypeRandom);
		} else {
			this.container.removeEventListener('click', this.setUITypeRandom);
			this.container.addEventListener('click', this.setUITypeParticular);
		}

		this.type = (type === 'random') ? 'random' : 'particular';
	}

	setUITypeRandom(event) {
		const target = event.target;
		const accordionItem = target.closest('.accordion__item');

		if (accordionItem) {
			accordionItem.classList.toggle('accordion__item--active');
		}
	}

	setUITypeParticular(event) {
		const target = event.target;
		const accordionItem = target.closest('.accordion__item');
		const accordion = target.closest('.accordion');
		const prevAccordionItem = accordion.querySelector('.accordion__item--active');

		if (accordionItem) {
			prevAccordionItem.classList.remove('accordion__item--active');
			accordionItem.classList.add('accordion__item--active');
		}
	}

	closeAllItems() {
		const allActiveAccordionItems = this.container.querySelectorAll('.accordion__item--active');

		allActiveAccordionItems.forEach(activeItem => activeItem.classList.remove('accordion__item--active'));
	}

	openItem(itemIndex) {
		const item = this.container.querySelector(`.accordion__item[index='${itemIndex}']`);

		item.classList.add('accordion__item--active');
	}

}

const accordionOne = new Accordion('accordion-one', { type: 'random' });

const toggleAccordionUIButton = document.getElementById('toggleUIButton');
const typeOfUI = toggleAccordionUIButton.querySelector('.accordion__interface-type');
typeOfUI.textContent = accordionOne.type;

toggleAccordionUIButton.addEventListener('click', () => {
	const typeOfUI = toggleAccordionUIButton.querySelector('.accordion__interface-type');
	
	const newType = (accordionOne.type === 'random') ? 'particular'	:	'random';

	accordionOne.setUIType(newType);
	typeOfUI.textContent = newType;
})