import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import MenuGenerator from './menu'

interface Menu {
  onClick: Function,
  event: any,
  title: string
}
interface Props {
  title: string,
  menuItems?: Menu[]
}

export default function DropDown(props: Props) {

  const {
    title,
    menuItems
  } = props

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="rounded-full flex items-center text-grey-400 hover:text-grey-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {title}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {
              menuItems 
              && 
              <MenuGenerator
                menuItems={menuItems}
              />
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}