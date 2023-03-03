import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectAuthenticated, logoutAction } from '@reducers/authSlice';
import Link from 'next/link';
import { selectRegistrationEnabled } from '@reducers/appSlice';
import Modal from '../Modal';
import Web3ProviderOptions from '../Web3ProviderOptions';
import Router from 'next/router';
import { activeNavigationManager } from 'app/utils';

const ClientLinks: FC = () => {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(selectAuthenticated);
	const isRegistrationEnabled = useAppSelector(selectRegistrationEnabled);
	const [showModal, setShowModal] = useState<boolean>(false);
	const hideModal = () => {
		setShowModal(false);
	};
	const handleBurnClick = () => {
		setShowModal(true);
	};

	const navigateToBurnPage = () => {
		Router.push('/burn');
	};
	return (
		<ul className="clear">
			<li className={activeNavigationManager(['burn'] , Router)}>
				<a onClick={handleBurnClick}>Burn</a>
				<Modal show={showModal} onClose={hideModal}>
					<Web3ProviderOptions onClose={hideModal} />
				</Modal>
			</li>
			{isAuthenticated ? (
				<>
					<li className={activeNavigationManager(['wallets'], Router)}>
						<Link href="/wallets">
							<a>Wallets</a>
						</Link>
					</li>
					<li onClick={() => dispatch(logoutAction())}>
						<Link href="/">
							<a>Logout</a>
						</Link>
					</li>
				</>
			) : (
				<>
					{isRegistrationEnabled ? (
						<>
							<li className={activeNavigationManager(['login'], Router)}>
								<Link href="/login">
									<a>Login</a>
								</Link>
							</li>
							<li className={activeNavigationManager(['register'], Router)}>
								<Link href="/register">
									<a>Register</a>
								</Link>
							</li>
						</>
					) : null}
				</>
			)}
		</ul>
	);
};
export default ClientLinks;
