interface Props {
  width?: number
  height?: number
  fill?: string
  iconClass?: string
}
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
export function ArrowRightCircle({ iconClass }: Props) {
  return <ArrowRightCircleIcon className={iconClass ?? ''} />
}
export function CheckedCircle({ iconClass }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconClass ?? ''}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}
export function ArrowDownCircle({ iconClass }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconClass ?? ''}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}
export function ArrowLeftCircle({ iconClass }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconClass ?? ''}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}
export function ExclamationCircle({ iconClass }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconClass ?? ''}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  )
}
export function ExclamationTriangle({ iconClass }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconClass ?? ''}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  )
}
export function CheckedIcon({ width, height, iconClass }: Props) {
  return (
    <Image
      src="/assets/icons/checked.png"
      className={iconClass ?? ''}
      width={width}
      height={height}
      alt=""
    />
  )
}
export function UnCheckedHoverIcon({ width, height, iconClass }: Props) {
  return (
    <Image
      src="/assets/icons/unchecked-hover.png"
      width={width}
      height={height}
      className={iconClass ?? ''}
      alt=""
    />
  )
}
export function CirclePreloader({ fill, width, height }: Props) {
  return (
    <svg
      width={width ?? 135}
      height={height ?? 135}
      fill={fill ?? '#ffffff'}
      viewBox="0 0 135 135"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 67 67"
          to="-360 67 67"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>
      <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 67 67"
          to="360 67 67"
          dur="8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}
export function TailSpinPreloader({ fill, width, height, iconClass }: Props) {
  return (
    <svg
      width={width ?? 135}
      height={height ?? 135}
      className={iconClass ?? ''}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor={fill ?? '#ffffff'} stopOpacity="0" offset="0%" />
          <stop
            stopColor={fill ?? '#ffffff'}
            stopOpacity=".631"
            offset="63.146%"
          />
          <stop stopColor={fill ?? '#ffffff'} offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#fff" cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  )
}
export function UnCheckedInactiveIcon({ width, height, iconClass }: Props) {
  return (
    <Image
      src="/assets/icons/unchecked-inactive.png"
      width={width}
      height={height}
      className={iconClass ?? ''}
      alt=""
    />
  )
}
export function FileUploadIcon({ width, height, iconClass }: Props) {
  return (
    <svg
      width={width ?? 24}
      height={height ?? 31}
      className={iconClass ?? ''}
      viewBox="0 0 24 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.6953 5.44302L18.5426 1.60403C17.7898 0.888915 16.7988 0.5 15.7574 0.5H4.10248C1.84419 0.5 0 2.34419 0 4.60248V26.5073C0 28.7655 1.84419 30.6098 4.10248 30.6098H19.8975C22.1557 30.6098 24 28.7655 24 26.5073V8.45395C24 7.31233 23.5233 6.22085 22.6953 5.44302ZM7.9038 10.8126C11.2955 7.42085 11.1778 7.52178 11.3037 7.43775C11.5044 7.29977 11.7553 7.2245 11.9937 7.2245H12.0063C12.3325 7.2245 12.6461 7.36248 12.8845 7.58837C14.192 8.90095 16.2277 10.9445 16.0962 10.8126C16.5854 11.3019 16.5854 12.0922 16.0962 12.5816C15.6069 13.0709 14.8165 13.0709 14.3272 12.5816L13.2609 11.5151V15.9438C13.2609 16.6464 12.6963 17.1984 12.0063 17.1984C11.3037 17.1984 10.7517 16.6464 10.7517 15.9438V11.5151L9.67279 12.5941C9.20333 13.0636 8.40283 13.0931 7.9038 12.5941C7.4145 12.1048 7.4145 11.3019 7.9038 10.8126ZM16.8615 23.8853H7.13853C6.44853 23.8853 5.88395 23.3207 5.88395 22.6307C5.88395 21.9406 6.44853 21.3761 7.13853 21.3761H16.8615C17.5515 21.3761 18.116 21.9406 18.116 22.6307C18.116 23.3207 17.5515 23.8853 16.8615 23.8853Z"
        fill="#888888"
      />
    </svg>
  )
}
export function InfoIcon({ width, height, iconClass }: Props) {
  return (
    <svg
      width={width ?? 16}
      height={height ?? 16}
      className={`${iconClass ?? ''} opacity-30`}
      viewBox={`0 0 ${height ?? 16} ${height ?? 16}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99966 0C3.58197 0 0 3.58197 0 7.99966C0 12.4174 3.58197 16 7.99966 16C12.4174 16 16 12.4174 16 7.99966C16 3.58197 12.4174 0 7.99966 0ZM9.66502 12.3984C9.25325 12.5609 8.92546 12.6842 8.67962 12.7695C8.43445 12.8549 8.14933 12.8975 7.82493 12.8975C7.32648 12.8975 6.93841 12.7756 6.6621 12.5325C6.38578 12.2894 6.2483 11.9812 6.2483 11.6067C6.2483 11.4611 6.25845 11.3121 6.27877 11.1604C6.29977 11.0087 6.33295 10.838 6.37833 10.6463L6.89371 8.8259C6.93909 8.65117 6.97837 8.48525 7.00952 8.33084C7.04068 8.17507 7.05558 8.03217 7.05558 7.90214C7.05558 7.67052 7.00749 7.50798 6.912 7.41655C6.81515 7.32512 6.63297 7.28042 6.3614 7.28042C6.22866 7.28042 6.09185 7.30006 5.95166 7.34138C5.81283 7.38404 5.69228 7.42265 5.5934 7.46057L5.72952 6.89981C6.06679 6.76233 6.38984 6.64449 6.69799 6.54696C7.00614 6.44808 7.29735 6.39932 7.57164 6.39932C8.06671 6.39932 8.44868 6.51987 8.71754 6.75826C8.98506 6.99733 9.11983 7.30819 9.11983 7.69016C9.11983 7.7694 9.11035 7.90891 9.09206 8.10802C9.07378 8.30781 9.03924 8.48999 8.98912 8.65727L8.47644 10.4723C8.43445 10.6179 8.39721 10.7845 8.36334 10.9708C8.33016 11.157 8.3139 11.2992 8.3139 11.3947C8.3139 11.6358 8.36741 11.8004 8.47577 11.8877C8.58277 11.9751 8.77037 12.0191 9.03585 12.0191C9.16114 12.0191 9.30133 11.9968 9.45981 11.9534C9.61693 11.9101 9.73071 11.8715 9.8025 11.8383L9.66502 12.3984ZM9.57426 5.03128C9.3352 5.25342 9.04737 5.36449 8.71077 5.36449C8.37486 5.36449 8.08499 5.25342 7.84389 5.03128C7.60415 4.80914 7.48292 4.53892 7.48292 4.22332C7.48292 3.9084 7.60483 3.6375 7.84389 3.41333C8.08499 3.18849 8.37486 3.07674 8.71077 3.07674C9.04737 3.07674 9.33587 3.18849 9.57426 3.41333C9.81333 3.6375 9.93321 3.9084 9.93321 4.22332C9.93321 4.5396 9.81333 4.80914 9.57426 5.03128Z"
        fill="white"
        // fillOpacity="0.18"
      />
    </svg>
  )
}
