import {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {throttle} from 'lodash'

const throttleTime = 16

export interface StackedPageState {
	obstructed?: boolean
	overlay?: boolean
	highlighted?: boolean
	active?: boolean
}

export type ScrollState = {
	[slug: string]: StackedPageState
};

export function useScroll() {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [scroll, setScroll] = useState(0)
	const [width, setWidth] = useState(0)

	const scrollObserver = useCallback(() => {
		if (!containerRef.current) {
			return
		}

		setScroll(containerRef.current.scrollLeft)
		setWidth(containerRef.current.getBoundingClientRect().width)
	}, [setScroll, setWidth, containerRef])

	const throttledScrollObserver = throttle(scrollObserver, throttleTime)

	const setRef = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			// When the ref is first set (after mounting)
			node.addEventListener('scroll', throttledScrollObserver)
			containerRef.current = node
			window.addEventListener('resize', throttledScrollObserver)
			throttledScrollObserver() // initialization
		} else if (containerRef.current) {
			// When unmounting
			containerRef.current.removeEventListener(
				'scroll',
				throttledScrollObserver,
			)
			window.removeEventListener('resize', throttledScrollObserver)
		}
	}, [])

	return [scroll, width, setRef, containerRef] as const
}
