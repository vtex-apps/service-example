import canUseDOM  from 'vtex.render-runtime'
// import type { PixelMessage } from './typings/events'

declare const window: any

export function handleEvents(e:any) {
console.log(e);
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}