import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from '@mynaui/icons-react'
import Photo from './Photo'
import { SanityImageProps } from './SanityImage'

/**
 *
 * @returns: En Video-komponent til at vise videoer.
 * @example: <Video video={video} thumbnail={thumbnail} showInPopup={true} />
 * @alias: Video
 * @summary: Denne komponent bruges til at vise videoer.
 * @version: 1.5.0
 * @property: [video, thumbnail, popup]
 * @author: Kasper Buchholtz
 *
 **/

export interface VideoProps {
  video: any
  thumbnail: any
  showInPopup?: boolean
  videoThumbnail?: Omit<SanityImageProps, 'image'> // Allow external props except image
}

const Video = ({ video, thumbnail, showInPopup, videoThumbnail, ...props }: VideoProps) => {
  return (
    <div className="relative h-full">
      <Photo image={thumbnail} {...props} />
      {showInPopup ? <Popup video={video} /> : <VideoPreview video={video} />}
    </div>
  )
}

export default Video

const Popup = ({ video }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="absolute translate-x-1/2 -translate-y-1/2 right-1/2 top-1/2 ">
        <svg
          className="m-auto transition-all bg-transparent rounded-full text-superego-green group-hover:bg-superego-green group-active:bg-transparent "
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Play button"
        >
          <rect
            className="text-current"
            x="2"
            y="2"
            width="96"
            height="96"
            rx="48"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="text-current transition-all group-hover:text-superego-light-light group-active:text-superego-green"
            d="M69.245 48.2984C70.5104 49.0799 70.5104 50.9201 69.245 51.7016L41.051 69.1156C39.7185 69.9385 38 68.9801 38 67.414L38 32.586C38 31.0199 39.7185 30.0615 41.051 30.8844L69.245 48.2984Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-superego-dark/60 data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed left-1/2 z-50 top-1/2 h-full max-h-screen/1.6 md:max-h-screen/1.2 w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title>{video?.asset.description}</Dialog.Title>
        <video
          className="absolute inset-0 object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          aria-label={video?.asset.description}
        >
          <source src={video?.asset.url} type="video/mp4" />
        </video>
        <Dialog.Close asChild>
          <button
            className="absolute right-2.5 top-2.5 inline-flex size-6 appearance-none items-center justify-center rounded-full"
            aria-label="Close"
          >
            <X />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

const VideoPreview = ({ video }) => {
  return (
    <video
      className="absolute inset-0 object-cover w-full h-full"
      autoPlay
      loop
      muted
      playsInline
      aria-label={video?.asset.description}
    >
      <source src={video?.asset.url} type="video/mp4" />
    </video>
  )
}
