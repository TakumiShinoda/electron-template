import dedent from 'ts-dedent'

export namespace CodeViewerPageExampleCodes{
  export namespace ByShiki{
    export const pug: string = dedent`
      div#codeViewerExampleByShiki.textSelectable
    `
    export const typescript: string = dedent`
      import $ from 'jquery'
      import dedent from 'ts-dedent'

      $(async function (){
        let codeElementStr: string = await window.electronApi.shikiCodeToHtml(dedent\`
          conosole.log('hoge')
        \`, {lang: 'typescript', theme: 'nord'})

        $('#codeViewerExampleByShiki').append($(codeElementStr))
      })
    `
  }

  export namespace ByCodeViewerExample{
    export const pug: string = dedent`
      div#hoge HOGE
    `
    export const typescript: string = dedent`
      import $ from 'jquery'

      $(function (){
        console.log($('#hoge').text())
      })
    `
  }

  export namespace ByCodeViewer{
    export const pug: string = dedent`
      div#codeViewerExampleByCodeViewerCodeArea.textSelectable
    `
    export const typescript: string = dedent`
      import $ from 'jquery'
      import dedent from 'ts-dedent'

      const ByCodeViewerCodeAreaCodeViewerSettings: CodeViewerSetting[] = [
        {
          title: 'pug',
          code: CodeViewerPageExampleCodes.ByCodeViewerExample.pug,
          option: {lang: 'pug', theme: 'nord'},
        },
        {
          title: 'typescript',
          code: CodeViewerPageExampleCodes.ByCodeViewerExample.typescript,
          option: {lang: 'typescript', theme: 'nord'},
        }
      ]

      $(function (){
        $('#codeViewerExampleByShiki').append($(codeElementStr))

        new CodeViewer('#codeViewerExampleByCodeViewer', ByCodeViewerCodeAreaCodeViewerSettings)
      })

      // CodeViewerPageExampleCodes.ByCodeViewerExample
      export namespace CodeViewerPageExampleCodes{
        export namespace ByCodeViewerExample{
          export const pug: string = dedent\`
            div#hoge HOGE
          \`
          export const typescript: string = dedent\`
            import $ from 'jquery'

            $(function (){
              console.log($('#hoge').text())
            })
          \`
        }
      }
    `
  }
}