import * as ReactDOM from "react-dom"
import {useEffect, useRef} from "react"

// import './index.css'

function Preview({html, importedComponents}) {
	const ref = useRef(null)
	useEffect(() => {
		// ref?.current?.append(...importedComponents)
	})
	// return <iframe
	// 	srcDoc={html}
	// 	css={{
	// 		width: '50em',
	// 		height: '50em',
	// 	}}
	// />
	return <div dangerouslySetInnerHTML={{__html: html}} />
	// return <div ref={ref}></div>
}

export const renderPreview = (container, html) => {
	const renderContainer = document.createElement('div');
	container.appendChild(renderContainer)

	ReactDOM.render(<Preview html={html} />, renderContainer)
}
