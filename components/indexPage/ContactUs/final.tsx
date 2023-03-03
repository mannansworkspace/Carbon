import { setContactUsForm, setIsSubmitted } from '@reducers/authSlice';
import { useAppDispatch } from 'app/hooks';
import { FC } from 'react';

interface FinalPageProps {
    onClose: () => void;
}

const FinalPage: FC<FinalPageProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();

    return (
        <div className='pt-12'>
            <p className='sm:text-2xl text-xl font-normal leading-8 text-e4eee4 font-satoshi'>
                Thank you for reaching out
            </p>
            <p className='text-lg font-normal leading-8 text-e4eee4 font-satoshi'>
                Your message has been received
            </p>

            <div className='flex justify-end relative thanku-pt'>
                <button
                    className='ca-primary-btn'
                    type='reset'
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
export default FinalPage;
