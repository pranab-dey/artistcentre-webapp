import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';

import {
	BsPerson,
	BsFillHeartFill,
	BsFillLockFill,
	BsQuestionLg,
} from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { BiHistory } from 'react-icons/bi';

import styles from './header.module.scss';
import { Router } from 'next/router';

export default function Dropdown(props) {
	const { setSession } = props;
	const router = useRouter();

	const handleLogout = (e) => {
		e.preventDefault();
		setSession('');
		router.push('/');
		localStorage.removeItem('user');
	};

	return (
		<NavDropdown
			id='nav-dropdown-dark-example'
			title='Starter'
			menuVariant='light'
			style={{ fontSize: '13px', color: 'var(--color-primary-accent)' }}>
			<NavDropdown.Item onClick={() => router.push('/profile')}>
				<div className='d-flex justify-content-flex-start align-items-center gap-3'>
					<div className={styles.iconWrapper}>
						<BsPerson className={styles.personIcon} />
					</div>
					<span className={styles.optionTitle}>Profile Settings</span>
				</div>
			</NavDropdown.Item>

			<NavDropdown.Divider />

			<NavDropdown.Item onClick={() => router.push('/')}>
				<div className='d-flex justify-content-flex-start align-items-center gap-3'>
					<div className={styles.iconWrapper}>
						<BsFillHeartFill className={styles.personIcon} />
					</div>
					<span className={styles.optionTitle}>Preferences</span>
				</div>
			</NavDropdown.Item>
			<NavDropdown.Divider />

			<NavDropdown.Item onClick={() => router.push('/history')}>
				<div className='d-flex justify-content-flex-start align-items-center gap-3'>
					<div className={styles.iconWrapper}>
						<BiHistory className={styles.personIcon} />
					</div>
					<span className={styles.optionTitle}>History</span>
				</div>
			</NavDropdown.Item>
			<NavDropdown.Divider />

			<NavDropdown.Item onClick={() => router.push('/')}>
				<div className='d-flex justify-content-flex-start align-items-center gap-3'>
					<div className={styles.iconWrapper}>
						<BsFillLockFill className={styles.personIcon} />
					</div>
					<span className={styles.optionTitle}>
						Terms & Conditions
					</span>
				</div>
			</NavDropdown.Item>
			<NavDropdown.Divider />

			<NavDropdown.Item onClick={() => router.push('/')}>
				<div className='d-flex justify-content-flex-start align-items-center gap-3'>
					<div className={styles.iconWrapper}>
						<BsQuestionLg className={styles.personIcon} />
					</div>
					<span className={styles.optionTitle}>Help</span>
				</div>
			</NavDropdown.Item>
			<NavDropdown.Divider />

			<NavDropdown.Item onClick={handleLogout}>
				<div className='d-flex justify-content-flex-start align-items-center gap-3'>
					<div className={styles.iconWrapper}>
						<FiLogOut className={styles.personIcon} />
					</div>
					<span className={styles.optionTitle}>Log out</span>
				</div>
			</NavDropdown.Item>
		</NavDropdown>
	);
}
