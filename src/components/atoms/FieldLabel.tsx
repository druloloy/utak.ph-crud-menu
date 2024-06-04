const FieldLabel = ({
	text,
	required
}: {
	text?: string;
	required?: boolean;
}) => {
	return (
		text && (
			<p className="subtext text-black px-2 font-normal">
				{`${text}${required ? '*' : ''}`}
			</p>
		)
	);
};

export default FieldLabel;
