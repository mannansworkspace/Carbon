import { FC } from "react"
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Link from "next/link"
import { selectAdminAuthenticated, adminLogoutAction, selectIfPrivilege } from '@reducers/admin/authSlice'
import { activeNavigationManager } from 'app/utils';
import Router from "next/router";



const AdminLinks: FC = () => {

    const dispatch = useAppDispatch()
    const isAdminAuthenticated = useAppSelector(selectAdminAuthenticated)
    const showMint = useAppSelector(selectIfPrivilege(['VERRA_MINT', "MANUAL_MINT", "VIEW_MINT"]))
    const showViewAndManualMint = useAppSelector(selectIfPrivilege(["MANUAL_MINT", "VIEW_MINT"]))
    const showTransfer = useAppSelector(selectIfPrivilege(['VIEW_TRANSFER', 'TRANSFER']))
    const showManualMint = useAppSelector(selectIfPrivilege("MANUAL_MINT"))
    const showAddAdmin = useAppSelector(selectIfPrivilege(['MANAGE_ADMINS', "VIEW_ADMINS"]))
    const showLogs = useAppSelector(selectIfPrivilege('VIEW_ADMIN_LOGS'))
    const showTokenization = useAppSelector(selectIfPrivilege(['MANAGE_TOKENIZATION', "VIEW_TOKENIZATION"]))
    const showTokens = useAppSelector(selectIfPrivilege(['MANAGE_TOKENS', "VIEW_TOKENS"]))
    const showEvents = useAppSelector(selectIfPrivilege('VIEW_BUSINESS_LOGS'))
    const showForwardToken = useAppSelector(selectIfPrivilege('VIEW_FW_TOKENS'))
    const showForwardMint = useAppSelector(selectIfPrivilege(['MINT_FW_TOKENS', 'VIEW_MINT']))
    const showTransferForwardToken = useAppSelector(selectIfPrivilege(['TRANSFER_FW_TOKENS', 'VIEW_TRANSFER']))

    return (
        <ul className="clear">
            {
                isAdminAuthenticated ? <>
                    {
                        <li className={activeNavigationManager(["mint", "project"], Router)}>
                            <a className="drop" href="#">Admin</a>
                            <ul>
                                {
                                    showAddAdmin &&
                                    <li>
                                        <Link href='/admin/manage-admins'>
                                            <a>Manage Admins</a>
                                        </Link>
                                    </li>
                                }
                                {
                                    showLogs && <li>
                                        <Link href='/admin/logs'>
                                            <a>Logs</a>
                                        </Link>
                                    </li>
                                }
                                {
                                    showEvents && <li>
                                        <Link href='/admin/business-logs'>
                                            <a>Business Logs</a>
                                        </Link>
                                    </li>
                                }
                                {
                                    showTokens && <li>
                                        <Link href='/admin/tokens'>
                                            <a >Tokens</a>
                                        </Link>
                                    </li>
                                }
                                {
                                    showForwardToken && <li>
                                        <Link href='/admin/forward-tokens'>
                                            <a >Forward Token</a>
                                        </Link>
                                    </li>
                                }
                                {
                                    showTokens && <li>
                                        <Link href='/admin/deploy-token'>
                                            <a >Deploy Token</a>
                                        </Link>
                                    </li>
                                }
                                {
                                    <li>
                                        <Link href='/admin/deployment-info'>
                                            <a >Deployment info</a>
                                        </Link>
                                    </li>
                                }
                            </ul>
                        </li>
                    }
                    {
                        (showMint || showTokenization || showForwardMint) && <li className={activeNavigationManager(["mint", "project"], Router)}>
                            <a className="drop" href="#">Mint</a>
                            <ul>
                                {
                                    showMint &&
                                    <>
                                        <li>
                                            <Link href='/admin/mint'>
                                                <a >Verra mint</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href='/admin/project'>
                                                <a >Add Project</a>
                                            </Link>
                                        </li>
                                        {showManualMint && <li>
                                            <Link href='/admin/manualMint'>
                                                <a >Manual mint</a>
                                            </Link>
                                        </li>
                                        }
                                        {showViewAndManualMint && <li>
                                            <Link href='/admin/monitor'>
                                                <a>Monitor exclusions</a>
                                            </Link>
                                        </li>
                                        }
                                        {showForwardMint && <li>
                                            <Link href='/admin/forward-mint'>
                                                <a>Forward Mint</a>
                                            </Link>
                                        </li>}
                                    </>
                                }
                               
                                {
                                    showTokenization &&
                                    <>
                                        <li>
                                            <Link href='/admin/tokenization'>
                                                <a >Tokenization</a>
                                            </Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </li>
                    }
                      
                    <li className={activeNavigationManager(["transfer"], Router)}>
                        <a className="drop" href="#">Transfer</a>
                        <ul>
                            { 
                                showTransfer && <li>
                                    <Link href='/admin/transfer/token'>
                                    <a >Token transfer</a>
                                </Link>
                                </li>
                            }
                            {
                                showTransferForwardToken && <li>
                                    <Link href='/admin/transfer/forward-token'>
                                        <a >Forward transfer</a>
                                    </Link>
                                </li>
                            }
                        </ul>
                    </li>
                    
                    {
                        showEvents &&
                        <li className={activeNavigationManager(["events"], Router)}>
                            <a className="drop" href="#">Events</a>
                            <ul>
                                <li>
                                    <Link href="/admin/burn-events">
                                        <a>Burn events</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/retirement-events">
                                        <a>Retirement events</a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    }

                    <li className={activeNavigationManager(["change-password"], Router)}>
                        <a className="drop" href="#">Account</a>
                        <ul>
                            <li>
                                <Link href="/admin/change-password">
                                    Change Password
                                </Link>

                            </li>
                            <li onClick={() => dispatch(adminLogoutAction())}>
                                <Link href='/admin'>
                                    <a >Logout</a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </>
                    :

                    <li >
                        <Link href='/admin/login'>
                            <a >Login</a>
                        </Link>
                    </li>
            }
        </ul>
    )

}
export default AdminLinks
