/*
Renders a number input field.
*/

import event from '../../event';
import {get, set} from '../../state';
import htmlify from '../../util/htmlify';

export default {
	match: /^number\s+input(\s+for)?/i,
	render(varName, props) {
		let value = undefined;

		if (varName) {
			value = get(varName);

			if (value !== undefined && typeof value !== 'number') {
				throw new Error(
					`The value ${value} for variable '${varName}' is not a number`
				);
			}
		}

		return htmlify('input', {
			type: 'number',
			value,
			'data-cb-number-field-set': varName || undefined,
			required: props.required !== false ? '' : undefined,
			max: props.max,
			min: props.min,
			step: props.step
		});
	}
};

event.on('dom-change', el => {
	if (el.dataset.cbNumberFieldSet) {
		set(el.dataset.cbNumberFieldSet, Number(el.value));
	}
});
