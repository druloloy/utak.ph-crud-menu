import React, { useEffect } from 'react';
import { animated, config, useTransition } from '@react-spring/web';
import Icon from '@atoms/Icon';
import { FormProvider, useForm } from 'react-hook-form';
import TextField from '@molecules/TextField';
import SelectionField from '@molecules/SelectionField';
import OptionInput from '@molecules/OptionInput';
import Button from '@atoms/Button';
import ImageInput from '@molecules/ImageInput';
import { MenuModalProps, ProductItemType } from '@types';
import API from 'services/api';
import { v4 as uuid } from 'uuid';
import Throbber from '@atoms/Throbber';
import ResultModal from '@molecules/ResultModal';
import useFetchImageData from 'hooks/useFetchImageData';
import useProduct from 'hooks/useProduct';
import SwitchInput from '@molecules/SwitchInput';

type MenuModalFormType = {
	name: string;
	category: string;
	thumbnail: string;
	addOptions: boolean;
	optionsInput: string;
	optionsInputPrice: string;
	optionsInputCost: string;
	optionsInputStocks: string;
	options: {
		[key: string]: {
			price: number | string;
			cost: number | string;
			stocks: number | string;
		};
	}[];
	price: string | number;
	cost: string | number;
	stocks: string | number;
};

const MenuModal: React.FC<MenuModalProps> = ({ open, closeModal, item }) => {
	const { products, setProducts } = useProduct();
	const [showOptions, setShowOptions] = React.useState<boolean>(
		item ? Object.keys(item.options || {}).length > 0 : false
	);
	const { imageData } = useFetchImageData(item?.thumbnail || '');
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const [showResultModal, setShowResultModal] = React.useState<{
		result: 'success' | 'error';
		open: boolean;
	}>({
		result: 'success',
		open: false
	});
	const [categories, setCategories] = React.useState<Record<string, string>>(
		{}
	);

	const methods = useForm<MenuModalFormType>({
		defaultValues: {
			name: item?.name || '',
			thumbnail: imageData || '',
			addOptions: item
				? Object.keys(item.options || {}).length > 0
				: false,
			optionsInput: '',
			optionsInputPrice: '',
			optionsInputCost: '',
			optionsInputStocks: '',
			price: item?.price || '',
			cost: item?.cost || '',
			stocks: item?.stocks || ''
		},
		mode: 'onChange'
	});

	useEffect(() => {
		if (item && imageData) {
			methods.setValue('thumbnail', imageData);
		}
	}, [item, methods, imageData]);

	useEffect(() => {
		API.getCategories().then((data) => {
			setCategories(data as Record<string, string>);
		});
	}, []);

	const transitions = useTransition(open, {
		from: { opacity: 0, scale: 0.5 },
		enter: { opacity: 1, scale: 1 },
		leave: { opacity: 0, scale: 0.5 },
		delay: 300,
		config: config.gentle
	});

	const clearFields = () => {
		methods.reset({
			optionsInput: '',
			optionsInputPrice: '',
			optionsInputCost: '',
			optionsInputStocks: '',
			options: [],
			name: '',
			category: '',
			thumbnail: '',
			price: '',
			cost: '',
			stocks: ''
		});
	};

	const _closeModal = () => {
		closeModal();
		clearFields();
	};

	const onsubmit = (data: MenuModalFormType) => {
		try {
			setIsSubmitting(true);
			const productId = item?.id || uuid();
			API.uploadImage(data?.thumbnail, productId).then((url) => {
				const optionsExists = data.options?.length > 0;
				console.log(optionsExists, data.options);

				const newItem: ProductItemType = {
					id: productId,
					thumbnail: url,
					category: categories[data.category],
					name: data.name,
					options:
						(optionsExists && Object.assign({}, ...data.options)) ||
						null,
					categorySlug: data.category,
					price: !optionsExists ? Number(data.price) : null,
					cost: !optionsExists ? Number(data.cost) : null,
					stocks: !optionsExists ? Number(data.stocks) : null,
					createdAt: new Date().getTime(),
					updatedAt: new Date().getTime()
				};

				console.log(newItem);

				if (item?.id) {
					API.updateProduct(newItem, products).then((newProducts) =>
						setProducts(newProducts)
					);
				} else {
					API.createProduct(newItem, products).then((newProducts) =>
						setProducts(newProducts)
					);
				}
			});

			setShowResultModal({
				result: 'success',
				open: true
			});
		} catch (error) {
			setShowResultModal({
				result: 'error',
				open: true
			});
		}
		setIsSubmitting(false);
	};

	return (
		open && (
			<section className="w-screen h-screen bg-black/50 fixed top-0 left-0 flex justify-center items-center z-20">
				{transitions((style, _item) =>
					_item ? (
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
												Manage Menu
											</h2>
											<p className="subtext">
												Add or edit a menu item to your
												store.
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
													defaultValue={
														item?.categorySlug
													}
													options={categories}
													placeholder="Choose menu category."
													required
												/>

												<SwitchInput
													name="addOptions"
													label="Add Options"
													rules={{
														'add-options': {
															required: false
														}
													}}
													onChange={(value) => {
														setShowOptions(value);
													}}
												/>

												{showOptions && (
													<OptionInput
														name="options"
														inputOptionPlaceholder="Add option name (e.g. Small)"
														inputPricePlaceholder="0.00"
														inputCostPlaceholder="0.00"
														inputStocksPlaceholder="0"
														inputOptionLabel="Option Name"
														inputPriceLabel="Price"
														inputCostLabel="Cost"
														inputStocksLabel="Stocks"
														rules={{
															options: {
																required: false
															}
														}}
														options={Object.keys(
															item?.options || {}
														).map((key) => ({
															[key]: (item?.options ||
																{})[key]
														}))}
													/>
												)}

												{!showOptions && (
													<>
														<TextField
															type="number"
															name="price"
															rules={{
																price: {
																	required:
																		true
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
																cost: {
																	required:
																		true
																}
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
																	required:
																		true
																}
															}}
															label="Stocks"
															placeholder="Enter Remaining stocks."
															required
														/>
													</>
												)}
												<section className="flex flex-row items-center gap-2 mt-8 pb-8">
													{isSubmitting ? (
														<Throbber size={16} />
													) : (
														<Button
															buttonStyle="primary"
															type="submit">
															Save Item
														</Button>
													)}
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
															defaultValue={
																imageData
															}
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
				<ResultModal
					message={
						showResultModal.result === 'success'
							? 'Success!'
							: 'Failed!'
					}
					type={showResultModal.result}
					close={() =>
						setShowResultModal({
							open: false,
							result: showResultModal.result
						})
					}
					open={showResultModal.open}
				/>
			</section>
		)
	);
};

const MemoizedMenuModal = React.memo(MenuModal);

export { MemoizedMenuModal };
export default MenuModal;
