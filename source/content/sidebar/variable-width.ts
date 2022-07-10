import {useEffect, useState} from 'react'

export function useVariableWidth(initialWidth: number) {
	const [width, setWidth] = useState(initialWidth)
	const [isDragging, setDragging] = useState(false)

	const endDrag = () => setDragging(false)
	const startDrag = () => setDragging(true)
	const updateDrag = (event: MouseEvent) => {
		if (isDragging) { // todo required?
			setWidth(window.innerWidth - event.clientX)
		}
	}

	useEffect(() => {
		document.addEventListener('mousemove', updateDrag)
		document.addEventListener('mouseup', endDrag)

		return () => {
			document.removeEventListener('mousemove', updateDrag)
			document.removeEventListener('mouseup', endDrag)
		}
	}, [isDragging, setWidth])

	return {width, endDrag, startDrag, updateDrag}
}
