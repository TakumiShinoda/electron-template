declare const devPath: {
  root: string,
  nodeModule: string
  srcPath: {
    js: (file: string) => string
    entries: (file: string) => string
    images: (file: string) => string
  }
  distPath: {
    root: (file: string) => string
    buildIcons: (file: string) => string
    app: (file: string) => string
    preload: (file: string) => string
    bundle: (file: string) => string
    images: (file: string) => string
    js: (file: string) => string
    views: (file: string) => string
  }
}

export = devPath