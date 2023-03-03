import { FC } from 'react';
import Image from 'next/image';
import GearImg from 'assets/images/gear.svg';
import TokenSelectorArrowImg from 'assets/images/token_selector_arrow.svg';
import USDCImg from 'assets/images/USDC.svg';
import GAIAImg from 'assets/images/GAIA.svg';
import InfoImg from 'assets/images/info.svg';
import UnicornImg from 'assets/images/unicorn.svg';
import ReverseImg from 'assets/images/reverse.svg';

const UniswapDummy: FC<{ disabled?: boolean; loading?: boolean }> = ({ disabled, loading }) => {
	return (
		<div className={`uniswap-widget ${disabled && 'disabled'} ${loading && 'loading'}`}>
			{/* Header */}
			<div className="widget-header">
				<div className="header-title">Swap</div>
				<div className="setting-icon">
					<Image src={GearImg} unoptimized={true} height={20} width={20} alt="" />
				</div>
			</div>
			<div className="widget-body">
				<div className="swap-input">
					<div className="input-area">
						<div className="token-input">
							<input
								type="number"
								className="input-value"
								value={0.0}
								inputMode="decimal"
								autoCorrect="off"
								autoComplete="off"
								pattern="^[0-9]*[.,]?[0-9]*$"
								spellCheck="false"
								onChange={() => {}}
							/>
							<div className="equivalent-value">–</div>
						</div>
						<div className="token-area">
							<div className="token-selector">
								<Image src={USDCImg} unoptimized={true} height={24} width={24} alt="" />
								<span className="token-name">USDC</span>
								<Image src={TokenSelectorArrowImg} unoptimized={true} />
							</div>
							<div className="token-balance"></div>
						</div>
					</div>
				</div>
				<button className="reverse-button">
					<Image src={ReverseImg} unoptimized={true} height={24} width={24} alt="" />
				</button>
				<div className="output-module">
					<div className="output-area">
						<div className="swap-input">
							<div className="input-label">For</div>
							<div className="input-area">
								<div className="token-input">
									<input
										type="number"
										className="input-value"
										value={0.0}
										inputMode="decimal"
										autoCorrect="off"
										autoComplete="off"
										pattern="^[0-9]*[.,]?[0-9]*$"
										spellCheck="false"
										onChange={() => {}}
									/>
									<div className="equivalent-value">–</div>
								</div>
								<div className="token-area">
									<div className="token-selector">
										<Image src={GAIAImg} unoptimized={true} height={24} width={24} alt="" />
										<span className="token-name">GAIA</span>
										<Image src={TokenSelectorArrowImg} unoptimized={true} />
									</div>
									<div className="token-balance"></div>
								</div>
							</div>
						</div>
						<div className="output-divider"></div>
						<div className="info-bar">
							<Image src={InfoImg} unoptimized={true} height={16} width={16} alt="" />
							<span className="info-label">Enter an amount</span>
						</div>
					</div>
					<button className="action-button">Review swap</button>
					<div className="swap-promo">
						<Image src={UnicornImg} unoptimized={true} height={12} alt="" />
						<span>Powered by the Uniswap protocol</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UniswapDummy;
