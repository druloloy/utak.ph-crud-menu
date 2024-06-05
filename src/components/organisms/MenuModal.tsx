import React from 'react';
import { animated, config, useTransition } from '@react-spring/web';
import Icon from '@atoms/Icon';
import { FormProvider, useForm } from 'react-hook-form';
import TextField from '@molecules/TextField';
import SelectionField from '@molecules/SelectionField';
import OptionInput from '@molecules/OptionInput';
import Button from '@atoms/Button';
import ImageInput from '@molecules/ImageInput';
import { MenuModalProps } from '@types';

const MenuModal: React.FC<MenuModalProps> = ({ open, closeModal, item }) => {
	const methods = useForm({
		defaultValues: {
			name: '',
			thumbnail: '',
			'options-input': '',
			options: [],
			price: '',
			cost: '',
			stocks: ''
		},
		mode: 'onChange'
	});

	const transitions = useTransition(open, {
		from: { opacity: 0, scale: 0.5 },
		enter: { opacity: 1, scale: 1 },
		leave: { opacity: 0, scale: 0.5 },
		delay: 300,
		config: config.gentle
	});

	const onsubmit = (data: any) => console.log(data);

	const clearFields = () => {
		methods.reset();
	};

	const _closeModal = () => {
		closeModal();
		clearFields();
	};

	return (
		open && (
			<section className="w-screen h-screen bg-black/50 fixed top-0 left-0 flex justify-center items-center z-20">
				{transitions((style, item) =>
					item ? (
						<FormProvider {...methods}>
							<animated.section
								style={style}
								className="relative w-full h-full lg:w-3/5 lg:h-5/6 overflow-auto bg-white flex rounded-2xl p-8">
								<button
									type="button"
									className="absolute top-5 right-5">
									<Icon
										name="MdClose"
										size={32}
										color="black"
										onClick={_closeModal}
									/>
								</button>

								<form
									onSubmit={methods.handleSubmit(onsubmit)}
									className="w-full h-full flex flex-row justify-between items-start gap-4 lg:gap-8">
									<section className="w-full flex flex-col gap-4">
										<section>
											<h2 className="h2 font-bold">
												Update Menu Item
											</h2>
											<p className="subtext">
												Add or edit a new menu item to
												your store
											</p>
										</section>

										<section className="w-full flex flex-col-reverse lg:flex-row items-start justify-between gap-8 lg:gap-2">
											<section className="w-full lg:flex-1 flex flex-col gap-4">
												<TextField
													type="text"
													name="name"
													rules={{
														name: { required: true }
													}}
													label="Name"
													placeholder="Enter menu name (e.g. Fries)"
													required
												/>

												<SelectionField
													name="category"
													label="Category"
													rules={{
														category: {
															required: true
														}
													}}
													options={{
														fritters: 'Fritters',
														drinks: 'Drinks',
														sides: 'Sides'
													}}
													placeholder="Choose menu category."
													required
												/>

												<OptionInput
													name="options"
													label="Options"
													rules={{
														options: {
															required: false
														}
													}}
													options={[
														'Small',
														'Medium',
														'Large'
													]}
													placeholder="Add option name (e.g. Small)"
												/>

												<TextField
													type="number"
													name="price"
													rules={{
														price: {
															required: true
														}
													}}
													label="Price"
													placeholder="Enter sale price."
													required
												/>

												<TextField
													type="number"
													name="cost"
													rules={{
														cost: { required: true }
													}}
													label="Cost"
													placeholder="Enter original cost."
													required
												/>

												<TextField
													type="number"
													name="stocks"
													rules={{
														stocks: {
															required: true
														}
													}}
													label="Stocks"
													placeholder="Enter Remaining stocks."
													required
												/>
												<section className="flex flex-row items-center gap-2 mt-8 pb-8">
													<Button
														buttonStyle="primary"
														type="submit">
														Save Item
													</Button>
													<Button
														buttonStyle="secondary"
														type="button"
														onClick={clearFields}>
														Clear Fields
													</Button>
												</section>
											</section>
											<section className="w-full lg:w-2/5">
												<section className="flex flex-col w-full h-full justify-center items-center">
													<section className="w-full lg:w-1/2">
														<p className="body px-2 font-bold">
															Thumbnail*
														</p>
														<ImageInput
															name="thumbnail"
															rules={{
																thumbnail: {
																	required:
																		true
																}
															}}
															showPreview
														/>
													</section>
												</section>
											</section>
										</section>
									</section>
								</form>
							</animated.section>
						</FormProvider>
					) : null
				)}
			</section>
		)
	);
};

export default MenuModal;
