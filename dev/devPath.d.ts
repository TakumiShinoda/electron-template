declare const devPath: {
  nodeModule: string
  srcPath: {
    js: (file: string) => string
    entries: (file: string) => string
    images: (file: string) => string
  }
  distPath: {
    app: (file: string) => string
    preload: (file: string) => string
    bundle: (file: string) => string
    images: (file: string) => string
    js: (file: string) => string
    views: (file: string) => string
  }
}

export = devPath