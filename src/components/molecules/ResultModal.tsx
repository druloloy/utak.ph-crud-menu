import CheckGif from '../../assets/animations/check.gif';
import CrossGif from '../../assets/animations/cross.gif';
import React from 'react';
import { animated, config, useTransition } from '@react-spring/web';
import Button from '@atoms/Button';

interface ResultModalProps {
	type: 'success' | 'error';
	message: string;
	open: boolean;
	close: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
	type,
	message,
	open,
	close
}) => {
	const transitions = useTransition(open, {
		from: {
			scale: 0,
			opacity: 0
		},
		enter: {
			scale: 1,
			opacity: 1
		},
		leave: {
			scale: 0,
			opacity: 0
		},
		config: config.gentle
	});

	const gif = type === 'success' ? CheckGif : CrossGif;

	return transitions(
		(style, item) =>
			item && (
				<animated.section
					style={style}
					className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50">
					<animated.section
						style={style}
						className="w-5/6 lg:w-1/6 flex flex-col justify-center items-center text-center bg-primary-50 shadow-lg p-8 rounded-xl">
						<img src={gif} alt="check gif" />
						<p className="text-xl font-medium">{message}</p>
						<Button
							type="button"
							buttonStyle="primary"
							onClick={close}>
							Gotcha!
						</Button>
					</animated.section>
				</animated.section>
			)
	);
};

export default ResultModal;
