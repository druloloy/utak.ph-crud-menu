import Icon from '@atoms/Icon';
import TextField from '@molecules/TextField';
import { FormProvider, useForm } from 'react-hook-form';

const SearchBar = () => {
	const methods = useForm();

	return (
		<FormProvider {...methods}>
			<form className="w-full md:w-2/3 lg:w-2/5 mt-16">
				<TextField
					name="search"
					rules={{
						search: {
							required: 'This field is required'
						}
					}}
					placeholder="What product are you looking for?"
					type="text"
					TrailingIcon={
						<button type="submit">
							<Icon
								name="MdSearch"
								size={24}
								color="primary-600"
							/>
						</button>
					}
				/>
			</form>
		</FormProvider>
	);
};

export default SearchBar;
