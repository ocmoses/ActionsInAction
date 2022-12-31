import {
  AccountInfo,
  CompanyDetail,
  Compliance,
  Indemnity,
  NccLicense,
  Shortcode,
  Review,
  StepBadge
} from './Icons'
import { profileMenuIcons } from '@/app/modules/constants'
function ProfileTabItem({ menu, form }) {
  return (
    <div className="flex justify-end items-center gap-3 h-[44px] md:min-w-[175px] mb-12">
      <span
        className={`${
          menu === form ? 'text-[#FFCB03]' : 'text-[#212121]'
        } hidden  md:flex w3-animate-opacity`}
      >
        {profileMenuIcons[menu].title}
      </span>
      <div
        className={`${
          menu === form && 'border-[#FFCB03] border-1'
        } flex items-center justify-center  rounded-xl min-w-[44px] h-[44px]`}
      >
        {menu === 'companydetail' && (
          <CompanyDetail
            fill={menu === form ? '#ffffff' : '#666666'}
            className={menu === form ? ' w3-animate-opacity' : ''}
          />
        )}
        {menu === 'compliance' && (
          <Compliance
            fill={menu === form ? '#ffffff' : '#666666'}
            className={menu === form ? ' w3-animate-opacity' : ''}
          />
        )}
        {(menu === 'ncclicense' || menu === 'nlrclicense') && (
          <NccLicense
            fill={menu === form ? '#ffffff' : '#666666'}
            className={menu === form ? ' w3-animate-opacity' : ''}
          />
        )}
        {menu === 'shortcode' && (
          <Shortcode
            fill={menu === form ? '#ffffff' : '#666666'}
            className={menu === form ? ' w3-animate-opacity' : ''}
          />
        )}
        {menu === 'accountinfo' && (
          <AccountInfo
            fill={menu === form ? '#ffffff' : '#666666'}
            className={menu === form ? ' w3-animate-opacity' : ''}
          />
        )}
        {menu === 'indemnity' && (
          <Indemnity
            fill={menu === form ? '#ffffff' : '#666666'}
            className={menu === form ? ' w3-animate-opacity' : ''}
          />
        )}
      </div>
    </div>
  )
}

export default ProfileTabItem
