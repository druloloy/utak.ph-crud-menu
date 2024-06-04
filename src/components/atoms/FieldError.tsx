const FieldError = ({ text }: { text?: string }) => {
	return text && <p className="text-sm text-primary-700">{text}</p>;
};

export default FieldError;
