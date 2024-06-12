import Icon from '@atoms/Icon';
import React, { useCallback, useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import BaseInput from '@atoms/BaseInput';
import FieldLabel from '@atoms/FieldLabel';
import FieldError from '@atoms/FieldError';
import { OptionInputProps } from '@types';
import Button from '@atoms/Button';
import OptionItem from '@atoms/OptionItem';

const MemoizedOptionItem = React.memo(OptionItem);

const OptionInput: React.FC<OptionInputProps> = ({
	name,
	rules,
	inputOptionPlaceholder,
	inputPricePlaceholder,
	inputCostPlaceholder,
	inputStocksPlaceholder,
	inputOptionLabel,
	inputPriceLabel,
	inputCostLabel,
	inputStocksLabel,
	required,
	options
}) => {
	const inputName = `${name}Input`;
	const inputPriceName = `${name}InputPrice`;
	const inputCostName = `${name}InputCost`;
	const inputStocksName = `${name}InputStocks`;

	const {
		control,
		getValues,
		setValue,
		formState: { errors }
	} = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name,
		shouldUnregister: true,
		rules: rules[name]
	});

	useEffect(() => {
		if (options && options.length > 0) {
			append(options);
			setValue(inputName, '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const addItem = useCallback(() => {
		const optionName: string = getValues(inputName);
		const price: number = getValues(inputPriceName);
		const cost: number = getValues(inputCostName);
		const stocks: number = getValues(inputStocksName);

		if (!optionName || !price || !cost || !stocks) return;
		append({
			[optionName]: {
				price: price,
				cost: cost,
				stocks: stocks
			}
		});
		setValue(inputName, '');
		setValue(inputPriceName, '');
		setValue(inputCostName, '');
		setValue(inputStocksName, '');
	}, [
		append,
		getValues,
		inputName,
		setValue,
		inputPriceName,
		inputCostName,
		inputStocksName
	]);

	const onClickUpdate = ({
		index,
		name,
		price,
		cost,
		stocks
	}: {
		name: string;
		price: number | string;
		cost: number | string;
		stocks: number | string;
		index?: number;
	}) => {
		if (
			getValues(inputName) ||
			getValues(inputPriceName) ||
			getValues(inputCostName) ||
			getValues(inputStocksName)
		)
			return;

		setValue(inputName, name);
		setValue(inputPriceName, price);
		setValue(inputCostName, cost);
		setValue(inputStocksName, stocks);

		removeItem(index as number);
	};

	useEffect(() => {
		const addItemOnEnter = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				addItem();
			}
		};

		window.addEventListener('keydown', addItemOnEnter);
		return () => window.removeEventListener('keydown', addItemOnEnter);
	}, [addItem]);

	const removeItem = (index: number) => remove(index);

	return (
		<section className="flex flex-col gap-2">
			<Controller
				name={inputName}
				rules={rules[inputName]}
				control={control}
				render={({ field }) => {
					return (
						<section className="flex flex-col w-full gap-2">
							<section className="flex flex-col text-left">
								<FieldLabel
									text={inputOptionLabel}
									required={required}
								/>
								<BaseInput
									{...field}
									type="text"
									placeholder={inputOptionPlaceholder}
								/>
								<FieldError
									text={errors[inputName]?.message as string}
								/>
							</section>
						</section>
					);
				}}
			/>

			<section className="grid grid-cols-3 gap-2">
				<Controller
					name={inputPriceName}
					rules={rules[inputPriceName]}
					control={control}
					render={({ field }) => {
						return (
							<section className="flex flex-col w-full gap-2">
								<section className="flex flex-col text-left">
									<FieldLabel
										text={inputPriceLabel}
										required={required}
									/>
									<BaseInput
										{...field}
										type="number"
										placeholder={inputPricePlaceholder}
									/>
									<FieldError
										text={
											errors[inputPriceName]
												?.message as string
										}
									/>
								</section>
							</section>
						);
					}}
				/>
				<Controller
					name={inputCostName}
					rules={rules[inputCostName]}
					control={control}
					render={({ field }) => {
						return (
							<section className="flex flex-col w-full gap-2">
								<section className="flex flex-col text-left">
									<FieldLabel
										text={inputCostLabel}
										required={required}
									/>
									<BaseInput
										{...field}
										type="number"
										placeholder={inputCostPlaceholder}
									/>
									<FieldError
										text={
											errors[inputCostName]
												?.message as string
										}
									/>
								</section>
							</section>
						);
					}}
				/>
				<Controller
					name={inputStocksName}
					rules={rules[inputStocksName]}
					control={control}
					render={({ field }) => {
						return (
							<section className="flex flex-col w-full gap-2">
								<section className="flex flex-col text-left">
									<FieldLabel
										text={inputStocksLabel}
										required={required}
									/>
									<BaseInput
										{...field}
										type="number"
										placeholder={inputStocksPlaceholder}
									/>
									<FieldError
										text={
											errors[inputStocksName]
												?.message as string
										}
									/>
								</section>
							</section>
						);
					}}
				/>
			</section>

			<Button type="button" buttonStyle="secondary" onClick={addItem}>
				<Icon name="MdAdd" size={18} color="black" /> Insert Option
			</Button>
			<section className="flex flex-row flex-wrap gap-2 justify-start items-start">
				{fields.length > 0 &&
					fields.map((field, index) => {
						const itemName = `${name}.${index}`;
						const optionKey = Object.keys(
							getValues(`${name}.${index}`)
						)[0];
						return (
							<MemoizedOptionItem
								key={field.id}
								index={index}
								name={optionKey}
								price={getValues(itemName)[optionKey].price}
								cost={getValues(itemName)[optionKey].cost}
								stocks={getValues(itemName)[optionKey].stocks}
								removeItem={() => removeItem(index)}
								onClick={onClickUpdate}
							/>
						);
					})}
			</section>
		</section>
	);
};

export default OptionInput;
