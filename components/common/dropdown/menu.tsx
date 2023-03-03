import { FC } from "react";
import { Menu } from "@headlessui/react";

interface Menu{
  onClick: Function,
  // OffsetHistory | MintInterface | ProjectInterface | AdminTransfer | RetirementEvent | ManageAdmin,
  event: any,
  title: string
}

interface Props {
    menuItems : Menu[]
}
const MenuGenerator: FC<Props> = (props) => {

  function classNames(...classes: [string]) {
    return classes.filter(Boolean).join(' ')
  }

  const {menuItems} = props

  return (
    <>
      {
        menuItems.map(({onClick , event , title}) => {
          return (
            <Menu.Item
              onClick={() => {
                onClick(event)
              }}
            >
              {({ active }) => (
                <div
                  style={{ cursor: 'pointer' }}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900 block px-4 py-2 text-sm' : 'text-gray-700 block px-4 py-2 text-sm'
                  )}
                >
                  {title}
                </div>
              )}
            </Menu.Item>
          )
        })
      }

    </>
  )

}
export default MenuGenerator