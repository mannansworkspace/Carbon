import {
    selectIsSubmitted,
    seletcContactUsForm,
    setContactUsForm,
    setIsSubmitted,
} from '@reducers/authSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FC, useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import CaptchaForm from './captchaForm';
import FinalPage from './final';
import Modal from 'components/common/Modal';

interface ContactUsProps {
  hideNavbar?: () => void;
}

const ContactUs: FC<ContactUsProps> = ({hideNavbar}) => {
    const [showContactModal, setShowContactModal] = useState<boolean>(false);

    const contactForm = useAppSelector(seletcContactUsForm);
    const isSubmitted = useAppSelector(selectIsSubmitted);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(setContactUsForm(null!));
            dispatch(setIsSubmitted(false));
        };
    }, []);
  
    function onClose() {
      setShowContactModal(false);
      dispatch(setContactUsForm(null!));
      dispatch(setIsSubmitted(false));
    }

    return (
        <>
            <button className="contact-modal" onClick={() => { setShowContactModal(true); hideNavbar && hideNavbar(); }}>
              <span>Contact</span>
            </button>
            <Modal show={showContactModal} onClose={onClose}>
              <>
                <Modal.Header title="Contact us" showCloseBtn={true} onClose={onClose} />
                <Modal.Body>
                    <div id='contactUs' className='contact'>
                        <div className='contact-form'>
                            <form>
                                {contactForm ? (
                                    isSubmitted ? (
                                        <FinalPage onClose={onClose} />
                                    ) : (
                                        <CaptchaForm onCancel={onClose} />
                                    )
                                ) : (
                                    <ContactForm onCancel={onClose} />
                                )}
                            </form>
                        </div>
                    </div>
                </Modal.Body>
              </>
            </Modal>
        </>
    );
};

export default ContactUs;
