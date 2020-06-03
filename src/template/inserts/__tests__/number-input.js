import render from '../../render-inserts';
import * as state from '../../../state';
import NumberInput from '../number-input';

jest.mock('../../../state');

state.get = jest.fn(value => {
	switch (value) {
		case 'color':
			return 'red';

		case 'zero':
			return 0;

		case 'one':
			return 1;

		case 'pi':
			return 3.141592653589793;

		case 'true':
			return true;

		case 'false':
			return false;

		case 'null':
			return null;

		case 'stringZero':
			return '0';

		case 'stringOne':
			return '1';
	}
});

afterAll(() => {
	state.get.mockRestore();
});

let warnSpy;

beforeEach(() => {
	warnSpy = jest.spyOn(global.console, 'warn');
	warnSpy.mockImplementation(() => {});
});

afterEach(() => warnSpy.mockRestore());

describe('insert number input', () => {
	test('given no variable, renders number input with [required] and without [value]', () => {
		expect(render('{number input}', [NumberInput])).toBe(
			'<input type="number" required="">'
		);
	});

	test('given { required: false }, renders number input without [required] and [value]', () => {
		expect(render('{number input, required: false}', [NumberInput])).toBe(
			'<input type="number">'
		);
	});

	test('given { max }, renders number input with [max] for the given value', () => {
		expect(render('{number input, max: 1}', [NumberInput])).toBe(
			'<input type="number" required="" max="1">'
		);
	});

	test('given { min }, renders number input with [min] for the given value', () => {
		expect(render('{number input, min: 1}', [NumberInput])).toBe(
			'<input type="number" required="" min="1">'
		);
	});

	test('given { step }, renders number input with [step] for the given value', () => {
		expect(render('{number input, step: 1}', [NumberInput])).toBe(
			'<input type="number" required="" step="1">'
		);
	});

	test('given a new variable, renders number input without [value]', () => {
		expect(render('{number input for: "guests"}', [NumberInput])).toBe(
			'<input type="number" data-cb-number-field-set="guests" required="">'
		);
	});

	test('given an existing variable with value type "number", renders number input with [value] for that value', () => {
		expect(render('{number input for: "one"}', [NumberInput])).toBe(
			'<input type="number" value="1" data-cb-number-field-set="one" required="">'
		);
		expect(render('{number input for: "zero"}', [NumberInput])).toBe(
			'<input type="number" value="0" data-cb-number-field-set="zero" required="">'
		);
		expect(render('{number input for: "pi"}', [NumberInput])).toBe(
			'<input type="number" value="3.141592653589793" data-cb-number-field-set="pi" required="">'
		);
	});

	test('given an existing variable with value type not "number", leaves inserts', () => {
		expect(render('{number input for: "color"}', [NumberInput])).toBe(
			'{number input for: "color"}'
		);
	});
});
