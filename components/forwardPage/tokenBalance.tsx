import { FC } from 'react';
import Logo from 'assets/images/logo_white.svg';
import Image from 'next/image';
import { getFwTokenRatesInterface } from '@models/TransferForwardToken';

const TokenBalance: FC<{ tokenRate:getFwTokenRatesInterface }> = ({ tokenRate }) => {

	return (
		<>
			<div className="list-item">
				<div className="item-data">
					<div className="item-icon">
						<Image src={Logo} unoptimized={true} alt="token icon" layout="fill" />
					</div>
					<div className="flex flex-col gap-[2px]">
						<div className="flex items-baseline gap-[6px]">
							<div className="data-number">
							 	<span> 0   </span>
							</div>
							<div className="data-unit">  { tokenRate.name+' '+ new Date(tokenRate.vintageEnd).getFullYear()}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TokenBalance;
