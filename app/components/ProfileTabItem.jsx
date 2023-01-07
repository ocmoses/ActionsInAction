import {
  AccountInfo,
  CompanyDetail,
  Compliance,
  Indemnity,
  NccLicense,
  Shortcode,
  ContactPerson,
  Review
} from './Icons'
import { profileMenuIcons } from '@/app/modules/constants'
import Badge from './ProfileTabBadge'
function ProfileTabItem({ menu, form }) {
  return (
    <div className="flex justify-end items-center gap-3 h-[44px] lg:min-w-[175px] mb-4">
      <span
        className={`block text-end whitespace-nowrap ${
          menu === form ? 'text-[#FFCB03]' : 'text-[#383838] opacity-50'
        } hidden  lg:flex`}
      >
        {profileMenuIcons[menu]?.title}
      </span>
      <div
        className={`${
          menu === form && 'border-[#FFCB03] border-1'
        } flex items-center justify-center  rounded-xl min-w-[44px] h-[44px]`}
      >
        {menu === 'companydetail' && (
          <div className="text-white relative">
            <CompanyDetail
              fill={menu === form ? '#ffffff' : '#666666'}
              iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
            />
            <Badge type="review" name={'companydetail'} />
          </div>
        )}
        {menu === 'confirmcompanyinfo' && (
          <div className="text-white relative">
            <CompanyDetail
              fill={menu === form ? '#ffffff' : '#666666'}
              iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
            />
            <Badge type="updatereview" name={'confirmcompanyinfo'} />
          </div>
        )}
        {menu === 'contactperson' && (
          <div className="text-white relative">
            <ContactPerson
              fill={menu === form ? '#ffffff' : '#666666'}
              iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
            />

            <Badge type="updatereview" name={'contactperson'} />
          </div>
        )}
        {menu === 'compliance' && (
          <div className="text-white relative">
            <Compliance
              fill={menu === form ? '#ffffff' : '#666666'}
              iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
            />

            <Badge type="review" name={'compliance'} />
          </div>
        )}
        {menu === 'ncclicense' && (
          <div className="text-white relative">
            <NccLicense
              fill={menu === form ? '#ffffff' : '#666666'}
              iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
            />

            <Badge type="review" name={'ncclicense'} />
          </div>
        )}
        {menu === 'nlrclicense' && (
          <div className="text-white relative">
            <NccLicense
              fill={menu === form ? '#ffffff' : '#666666'}
              iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
            />

            <Badge type="review" name={'nlrclicense'} />
          </div>
        )}
        {menu === 'shortcode' && (
          <div className="text-white relative">
            <Shortcode
              fill={menu === form ? '#ffffff' : '#666666'}
              iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
            />

            <Badge type="review" name={'shortcode'} />
          </div>
        )}
        {menu === 'indemnity' && (
          <div className="text-white relative">
            <Indemnity
              fill={menu === form ? '#ffffff' : '#666666'}
              iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
            />

            <Badge type="review" name={'indemnity'} />
          </div>
        )}
        {menu === 'accountinfo' && (
          <div className="text-white relative">
            <AccountInfo
              fill={menu === form ? '#ffffff' : '#666666'}
              iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
            />

            <Badge type="review" name={'accountinfo'} />
          </div>
        )}
        {menu === 'review' && (
          <div className="text-white relative">
            <Review
              fill={menu === form ? '#ffffff' : '#666666'}
              iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
            />

            <Badge type="review" name={'review'} />
          </div>
        )}
        {menu === 'updatereview' && (
          <div className="text-white relative">
            <Review
              fill={menu === form ? '#ffffff' : '#666666'}
              iconClass={menu === form ? ' w3-animate-opacity text-white' : ''}
            />

            <Badge type="updatereview" name={'updatereview'} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileTabItem
