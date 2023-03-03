import { useAppSelector } from 'app/hooks'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { selectAuthenticated } from '@reducers/authSlice'
import { selectAdminAuthenticated } from '@reducers/admin/authSlice'
import { useRouter } from 'next/router'
import { isAdmin } from 'app/utils'
import AdminLinks from './AdminLinks'
import ClientLinks from './ClientLinks'
import { selectAdmin } from '@reducers/admin/authSlice'

const NavBar: FC = () => {
    const isAuthenticated = useAppSelector(selectAuthenticated)
    const isAdminAuthenticated = useAppSelector(selectAdminAuthenticated)

    const admin = useAppSelector(selectAdmin)
    
    const { login: adminUserName } = admin || {}

    const router = useRouter()


    return (
        <div className="padtop">

            <header id="header" className="hoc clear">
                <div id="logo" className="flex items-end fl_left">
                    {
                        isAdmin(router.pathname)
                            ?
                            !isAdminAuthenticated
                                ?
                                    <h1>Admin Web Console</h1>
                                :
                                <>
                                    <h1>
                                        <Link href='/admin'><a>Welcome</a></Link>
                                    </h1>
                                    <div className='text-base mx-2'>{adminUserName}</div>
                                </>
                            :
                            <h1><Link href={isAuthenticated ? '/home' : '/'}><a>Welcome</a></Link></h1>
                    }
                </div>
                <nav id="mainav" className="fl_right">

                    {
                        isAdmin(router.pathname) ?
                            <AdminLinks />
                            :
                            <ClientLinks />
                    }
                </nav>
            </header>
        </div>
    )
}

export default NavBar;
