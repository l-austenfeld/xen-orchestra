import { parse } from 'xo-remote-parser'

import MountHandler from './_mount'
import { normalize } from './_path'

export default class SmbMountHandler extends MountHandler {
  constructor(remote, opts) {
    const { domain = 'WORKGROUP', host, password, path, username } = parse(remote.url)
    super(remote, opts, {
      type: 'cifs',
      device: '//' + host + normalize(path),
      options: `domain=${domain}`,
      env: {
        USER: username,
        PASSWD: password,
      },
    })
  }

  get type() {
    return 'smb'
  }
}
