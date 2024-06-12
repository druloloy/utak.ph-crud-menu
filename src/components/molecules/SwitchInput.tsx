import BaseSwitch from '@atoms/BaseSwitch';
import React from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

type SwitchInputProps = {
	name: string;
	rules: Record<string, RegisterOptions>;
	label?: string;
	onChange?: (value: boolean) => void;
};

const SwitchInput: React.FC<SwitchInputProps> = ({
	label,
	name,
	rules,
	onChange
}) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			rules={rules[name]}
			name={name}
			render={({ field }) => (
				<section className="flex flex-col items-start">
					<label className="subtext">{label}</label>
					<BaseSwitch
						{...field}
						onChange={(event) => {
							field.onChange(event.target.checked);
							onChange && onChange(event.target.checked);
						}}
						checked={field.value}
					/>
				</section>
			)}
		/>
	);
};

export default SwitchInput;
