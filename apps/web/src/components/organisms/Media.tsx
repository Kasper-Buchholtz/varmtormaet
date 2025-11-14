'use client'
import React from 'react'
import ReactPlayer from 'react-player'
import Photo from '../atoms/Photo'
import Video, { VideoProps } from '../atoms/Video'
import { clean } from '@/utils/sanitize'
import { MediaObject } from 'sanity.types'
import { SanityImageProps } from '../atoms/SanityImage'

/**
 * @returns: A media component that can display images, videos, or Vimeo videos, with optional popup functionality.
 * @example: <Media data={mediaData} showInPopup={true} />
 * @example: <Media data={mediaData} showInPopup={true} photo={{ alt: 'Image description', className="bg-red-500", fetchPriority={"high" | "lazy" | "eager"}}} />
 * @alias: MediaComponent
 * @summary: This component is used to display media content such as images, videos, or Vimeo videos. It supports displaying media in a popup modal.
 * @version: 2.0.0
 * @property: [data] - The media data object containing image, video, or Vimeo information.
 * @property: [showInPopup, data, photo] - Optional boolean to show media in a popup and additional props for the photo component.
 * @author: Kasper Buchholtz & Emilie Hjøllund
 **/

interface MediaProps {
  data: MediaObject['media']
  showInPopup?: boolean
  video?: Omit<VideoProps, 'video'> // Allow external props except video
  photo?: Omit<SanityImageProps, 'image'> // Allow external props except image
}

const Media = ({ data, showInPopup, photo, video, ...props }: MediaProps) => {
  const image = data?.imageObject?.image
  const videoSource = data?.videoObject?.video
  const thumbnail = data?.videoObject?.image
  const vimeoObject = data?.vimeoObject

  return (
    <>
      <div {...props}>
        {(() => {
          switch (clean(data.select)) {
            case 'image':
              return <Photo image={image} {...photo} />
            case 'video':
              return (
                <Video
                  showInPopup={showInPopup}
                  video={videoSource}
                  thumbnail={thumbnail}
                  {...photo}
                  {...video}
                />
              )
            case 'vimeo':
              return <ReactPlayer url={vimeoObject?.vimeo} />
            default:
              return null
          }
        })()}
      </div>
    </>
  )
}

export default Media
