import {useEffect, useRef} from "react"

interface RawElementAdapterProps {
	elements: Node[]
}

export function RawElementAdapter({elements, ...restProps}: RawElementAdapterProps) {
	const ref = useRef(null)
	useEffect(() => {
		ref?.current?.append(...elements)
	})
	return <div ref={ref} {...restProps}/>
}
