/**
 * Default animation options used for configuring animations.
 *
 * @property {number} duration - The duration of the animation in seconds.
 * @property {number[]} ease - The easing function represented as a cubic Bezier curve.
 * @property {number} delay - The delay before the animation starts, in seconds.
 */

export const defaultOptions = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1],
  delay: 0.3,
}

export const useAnimate = () => {
  return defaultOptions
}
