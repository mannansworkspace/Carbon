import { useEffect } from 'react';
import { Errors, ErrorMessage } from '@models/index';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectErrors, clearError, clearAllError } from '@reducers/errorSlice';
import { XIcon } from '@heroicons/react/solid';
import Router from 'next/router';
import { ErrorTypeEnums } from '@models/Errors';
import LinkIconImg from 'assets/images/link_icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import appConfig from "../../../AppConfig.json";

const StatusPanel = () => {
	const dispatch = useAppDispatch();
	const errors: Errors = useAppSelector(selectErrors);

	// this will clear status panel on route change
	useEffect(() => {
		const handleRouteChange = () => {
			dispatch(clearAllError());
		};

		Router.events.on('routeChangeStart', handleRouteChange);

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			Router.events.off('routeChangeStart', handleRouteChange);
		};
	}, []);

	return (
		<>
			{errors.map((error: ErrorMessage, index: number) => 
				error.errorType === ErrorTypeEnums.METAMASK_NOT_FOUND_ERROR ? (
					<div key={index} className={`el-error ${error.isError ? '' : 'is-success'}`}>
						<div className="flex justify-between items-center" role="alert">
							<div className={error.isError ? 'el-error-heading' : 'el-success-heading'}>{error.error}</div>
							<Link href={appConfig.META_MASK_DOWNLOAD_URL}>
								<a target="_blank">
									<button className="ca-primary-icon-btn">
										<span>Get Metamask</span>
										<Image src={LinkIconImg} unoptimized={true} alt="" />
									</button>
								</a>
							</Link>
						</div>
					</div>
				) : (
					<div key={index} className={`el-error ${error.isError ? '' : 'is-success'}  ${error.isAdmin ? 'hoc clear' : ''}`}>
						<div className="flex justify-between items-center" role="alert">
							<div className={error.isError ? 'el-error-heading' : 'el-success-heading'}>{error.error}</div>
							<div className="w-4 h-4">
								<XIcon className="w-full top-0 bottom-0 right-0 cursor-pointer" onClick={() => dispatch(clearError(error.error))} />
							</div>
						</div>
						<p className={`el-error-details break-words ${error.isError ? 'el-error-text' : 'el-success-text'}`} dangerouslySetInnerHTML={{ __html: error?.errorMessage + '' }}></p>
					</div>
				)	
			)}
		</>
	);
}

export default StatusPanel;
