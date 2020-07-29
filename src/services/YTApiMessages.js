export default {
  play: () =>
    JSON.stringify({
      event: 'command',
      func: 'playVideo',
      args: [],
    }),
  pause: () =>
    JSON.stringify({
      event: 'command',
      func: 'pauseVideo',
      args: [],
    }),
  getCurrentTime: () =>
    JSON.stringify({
      event: 'listening',
      func: 'getCurrentTime',
      args: [],
    }),
  mute: () =>
    JSON.stringify({
      event: 'command',
      func: 'mute',
      args: [],
    }),
  unMute: () =>
    JSON.stringify({
      event: 'command',
      func: 'unMute',
      args: [],
    }),
  setVolume: volume =>
    JSON.stringify({
      event: 'command',
      func: 'setVolume',
      args: [volume],
    }),
  getVolume: () =>
    JSON.stringify({
      event: 'listening',
      func: 'getVolume',
      args: [],
    }),
  getPlayerState: () =>
    JSON.stringify({
      event: 'listening',
      func: 'getPlayerState',
      args: [],
    }),
  seekTo: time =>
    JSON.stringify({
      event: 'command',
      func: 'seekTo',
      args: [time, true],
    }),
};
