import { FC } from 'react';
import Armanin from 'assets/images/armanino.png';
import Polygonscan from 'assets/images/polygonscan.svg';
import Verra from 'assets/images/verra.png';
import UnionArrow from 'assets/images/union-arrow.png';
import downArrow from 'assets/images/downloadArrow.svg';
import Link from 'next/link';

const LinkSection: FC = () => {

    const links = {
        armanino: 'https://real-time-attest.trustexplorer.io/gaia',
        polygonscan: 'https://polygonscan.com/address/0x6ddcfdd2ec05957d01d53eb3fecb9842e0f1c8f2',
        verra: 'https://registry.verra.org/mymodule/rpt/myRpt.asp?r=205&idSubAccount=12426',
    }

    return (
        <div>
            <div className='pt-24 pb-16 px-1.5 backdrop-blur-md'>
                <div className='md:px-16 px-6'>
                    <div className='max-w-3xl w-full pr-5'>
                        <h1 className='ca-sec-heading text-[#e4eee4] font-normal mb-4'>Transparency</h1>
                    </div>
                    <div className='flex items-center justify-between flex-wrap mt-12'>
                        <div className='xl:w-4/12 lg:w-6/12 w-full lg:pr-6 xl:mb-0 mb-5'>
                            <div className='transparency-box-bg p-6 rounded-xl'>
                                <div className='flex justify-between'>
                                    <div className='w-36 h-7'>
                                        <img src={Armanin.src} />
                                    </div>
                                </div>
                                <p className='font-[satoshi] text-lg font-normal leading-5 pr-8 mt-8 min-h-[35px] overflow-hidden transparency-box-desc'>Realtime audit of the GAIA token suite and ledger.</p>
                                <div className='mt-8'>
                                    <a target="_blank" href={links['armanino']} className='px-6 py-2.5 border rounded-full inline-flex justify-center items-center font-[satoshi] transparency-box-btn-border text-lg text-[#394139] leading-6 font-normal'>
                                        <span>Link</span> <span className='ml-3'> <img src={UnionArrow.src} /></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='xl:w-4/12 lg:w-6/12 w-full lg:pr-6 xl:mb-0 mb-5'>
                            <div className='transparency-box-bg p-6 rounded-xl'>
                                <div className='flex justify-between'>
                                    <div className='w-36 h-7'>
                                        <img className='w-full' src={Polygonscan.src} />
                                    </div>
                                </div>
                                <p className='font-[satoshi] text-lg font-normal leading-5 pr-8 mt-8 min-h-[35px] overflow-hidden transparency-box-desc'>View transactions, burning of tokens, market cap and supply info.</p>
                                <div className='mt-8'>
                                    <a target="_blank" href={links['polygonscan']} className='px-6 py-2.5 border rounded-full inline-flex justify-center items-center font-[satoshi] transparency-box-btn-border text-lg text-[#394139] leading-6 font-normal'>
                                        <span>Link</span> <span className='ml-3'> <img src={UnionArrow.src} /></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='xl:w-4/12 lg:w-6/12 w-full lg:pr-6 xl:mb-0 mb-5'>
                            <div className='transparency-box-bg p-6 rounded-xl'>
                                <div className='flex justify-between'>
                                    <div className='w-36 h-7'>
                                        <img src={Verra.src} />
                                    </div>
                                </div>
                                <p className='font-[satoshi] text-lg font-normal leading-5 pr-8 mt-8 min-h-[35px] overflow-hidden transparency-box-desc'>Verra registry proof of retirement.</p>
                                <div className='mt-8'>
                                    <a target="_blank" href={links['verra']} className='px-6 py-2.5 border rounded-full inline-flex justify-center items-center font-[satoshi] transparency-box-btn-border text-lg text-[#394139] leading-6 font-normal'>
                                        <span>Link</span> <span className='ml-3'> <img src={UnionArrow.src} /></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkSection;
