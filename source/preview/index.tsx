import * as ReactDOM from "react-dom"
import {useEffect, useRef} from "react"

// import './index.css'

function Preview({importedComponents}) {
	const ref = useRef(null)
	useEffect(() => {
		ref?.current?.append(...importedComponents)
	})
	// return <iframe
	// 	srcDoc={html}
	// 	css={{
	// 		width: '50em',
	// 		height: '50em',
	// 	}}
	// />
	// return <div dangerouslySetInnerHTML={{__html: html}} />
	return <div ref={ref}/>
}

export const renderPreview = (importedComponents) => {
	const renderContainer = document.createElement('div');
	renderContainer.className = 'preview-container'
	// container.appendChild(renderContainer)

	ReactDOM.render(<Preview importedComponents={importedComponents} />, renderContainer)

	return renderContainer
}
