import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  let fill = '#fde047'
  if (process.env.NODE_ENV === 'development') {
    fill = '#FF0000' // Red for development
  }
  if (process.env.NODE_ENV === 'production') {
    fill = '#3BE086' // Green for production
  }
  return new ImageResponse(
    (
      <svg
        width="32"
        height="32"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0C84.48 0 168.96 0 256 0C256 84.48 256 168.96 256 256C171.52 256 87.04 256 0 256C0 171.52 0 87.04 0 0Z"
          fill={fill}
        />
        <path
          d="M127.012 52C85.5826 52 52 85.9666 52 127.87C52 142.963 56.3584 157.027 63.8708 168.844L52 203.74L86.5685 191.778C98.2385 199.35 112.121 203.74 127.012 203.74C168.441 203.74 202.025 169.773 202.025 127.87C202.025 85.9666 168.441 52 127.012 52ZM168.13 169.457L149.384 162.938C142.938 167.152 135.26 169.602 127.012 169.602C104.225 169.602 85.7566 150.918 85.7566 127.875C85.7566 104.827 104.23 86.1471 127.012 86.1471C149.795 86.1471 168.268 104.832 168.268 127.875C168.268 136.199 165.854 143.955 161.701 150.466L168.13 169.457Z"
          fill="white"
        />
      </svg>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}
