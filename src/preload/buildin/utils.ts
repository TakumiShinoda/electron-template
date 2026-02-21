export function insertScript(jsCode: string){
  let scriptElement: HTMLScriptElement  = document.createElement('script')

  scriptElement.textContent = jsCode
  scriptElement.type = 'text/javascript'

  document.head.appendChild(scriptElement)
}