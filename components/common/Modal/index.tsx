import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useEffect } from 'react';
import CloseImg from 'assets/images/close.svg';
import Image from 'next/image';

/**
 * either pass a trigger or set value of 'show' as true/false to toggle the modal
 */
interface ModalProps {
	show: boolean;
	onClose: () => void;
	className?: string;
}

const Header: FC<{ title?: string; showCloseBtn?: boolean; onClose?: () => void }> = (props) => {
	return (
		<>
			<div className="modal-header">
				{props.title && <div className="modal-title">{props.title}</div>}
				{props.children}
				{props.showCloseBtn && (
					<button className="close-btn" onClick={props.onClose}>
						&times;
					</button>
				)}
			</div>
		</>
	);
};

const Body: FC<any> = (props) => {
	return (
		<>
			<div className="modal-body">{props.children}</div>
		</>
	);
};

const Footer: FC<any> = (props) => {
	return (
		<>
			<div className="modal-footer">{props.children}</div>
		</>
	);
};

const _Modal: FC<ModalProps> = (props) => {

	useEffect(() => {
		const pageBody = document.getElementById("ca-page-container")

		if(!pageBody){
			return 
		}
		if(props.show){
				pageBody.style.filter = 'blur(8px)';
			
		} else {
			pageBody.style.filter = 'unset';
		}
	},[props.show])

	return (
		<>
			<Transition.Root show={props.show} as={Fragment}>
				<Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" static={false} onClose={() => props.onClose()}>
					<div className="items-center justify-center min-h-screen text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 backdrop-blur-none"
							enterTo="opacity-100 backdrop-blur"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 backdrop-blur"
							leaveTo="opacity-0 backdrop-blur-none"
						>
							<Dialog.Overlay className="fixed inset-0 transition-all col" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div id='element' className={`el-modal transform text-left transition-all ${props.className}`}>{props.children}</div> 
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};
const Modal = Object.assign(_Modal, { Header, Body, Footer });
export default Modal;
