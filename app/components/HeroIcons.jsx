import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
export function ArrowRightCircle({ iconClass }) {
  return <ArrowRightCircleIcon className={iconClass} />
}
export function CheckedCircle({ iconClass }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconClass}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}
export function ArrowDownCircle({ iconClass }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconClass}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}
export function ArrowLeftCircle({ iconClass }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconClass}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}
export function ExclamationCircle({ iconClass }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconClass}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  )
}
export function ExclamationTriangle({ iconClass }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={iconClass}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  )
}
export function CheckedIcon({ width, height, iconClass }) {
  return (
    <Image
      src="/assets/icons/checked.png"
      className={iconClass}
      width={width}
      height={height}
      alt=""
    />
  )
}
export function UnCheckedHoverIcon({ width, height, iconClass }) {
  return (
    <Image
      src="/assets/icons/unchecked-hover.png"
      width={width}
      height={height}
      className={iconClass}
      alt=""
    />
  )
}
export function CirclePreloader({ fill, width, height }) {
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
export function TailSpinPreloader({ fill, width, height, iconClass }) {
  return (
    <svg
      width={width ?? 135}
      height={height ?? 135}
      className={iconClass}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stop-color={fill ?? '#ffffff'} stop-opacity="0" offset="0%" />
          <stop
            stop-color={fill ?? '#ffffff'}
            stop-opacity=".631"
            offset="63.146%"
          />
          <stop stop-color={fill ?? '#ffffff'} offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            stroke-width="2"
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
export function UnCheckedInactiveIcon({ width, height, iconClass }) {
  return (
    <Image
      src="/assets/icons/unchecked-inactive.png"
      width={width}
      height={height}
      className={iconClass}
      alt=""
    />
  )
}
export function FileUploadIcon({ width, height, iconClass }) {
  return (
    <svg
      width={width ?? 24}
      height={height ?? 31}
      className={iconClass}
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
