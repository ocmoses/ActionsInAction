import {
  AccountInfo,
  CompanyDetail,
  Compliance,
  Indemnity,
  NccLicense,
  Shortcode,
  Review,
  StepBadge,
  ContactPerson
} from './Icons'
import { profileMenuIcons } from '@/app/modules/constants'
function ProfileTabItem({ menu, form }) {
  return (
    <div className="flex justify-end items-center gap-3 h-[44px] lg:min-w-[175px] mb-12">
      <span
        className={`${
          menu === form ? 'text-[#FFCB03]' : 'text-[#666666]'
        } hidden  lg:flex w3-animate-opacity`}
      >
        {profileMenuIcons[menu].title}
      </span>
      <div
        className={`${
          menu === form && 'border-[#FFCB03] border-1'
        } flex items-center justify-center  rounded-xl min-w-[44px] h-[44px]`}
      >
        {(menu === 'companydetail' || menu === 'confirmcompanyinfo') && (
          <CompanyDetail
            fill={menu === form ? '#ffffff' : '#666666'}
            iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
          />
        )}
        {menu === 'contactperson' && (
          <ContactPerson
            fill={menu === form ? '#ffffff' : '#666666'}
            iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
          />
        )}
        {menu === 'compliance' && (
          <Compliance
            fill={menu === form ? '#ffffff' : '#666666'}
            iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
          />
        )}
        {(menu === 'ncclicense' || menu === 'nlrclicense') && (
          <NccLicense
            fill={menu === form ? '#ffffff' : '#666666'}
            iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
          />
        )}
        {menu === 'shortcode' && (
          <Shortcode
            fill={menu === form ? '#ffffff' : '#666666'}
            iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
          />
        )}
        {menu === 'accountinfo' && (
          <AccountInfo
            fill={menu === form ? '#ffffff' : '#666666'}
            iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
          />
        )}
        {menu === 'indemnity' && (
          <Indemnity
            fill={menu === form ? '#ffffff' : '#666666'}
            iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
          />
        )}
      </div>
    </div>
  )
}

export default ProfileTabItem
