import Button from 'react-bootstrap/Button';
import styles from './button.module.scss';

function CustomButton({
	btnText = 'Click',
	variant = 'primary',
	type = 'button',
	icon: TheIcon,
	onClick,
	buttonPadding = 7,
	customStyle,
	iconWidth,
}) {
	return (
		<Button
			variant={variant}
			type={type}
			className={`${styles.button}`}
			onClick={onClick}
			style={{
				padding: `${buttonPadding}px`,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				...customStyle,
			}}>
			<span
				className={
					variant === 'google'
						? `${styles.googleButtonText}`
						: `${styles.facebookButtonText}`
				}>
				{btnText}
			</span>
			{TheIcon && (
				<TheIcon
					className={styles.icons}
					style={{ width: `${iconWidth}px` }}
				/>
			)}
		</Button>
	);
}
export default CustomButton;
