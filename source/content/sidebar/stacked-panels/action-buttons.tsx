import CloseIcon from 'jsx:../../../assets/icons/close.svg'
import {css} from '@emotion/react'
import {IconButton, instapaperActionProps} from '../../actions'
import {saveToInstapaper} from '../../../instapaper'

interface CloseButtonProps {
	onClick: () => void
}

const commonStyles = `
			filter: invert(50%);
			cursor: pointer;`

export const CloseButton = ({onClick}: CloseButtonProps) => <CloseIcon
	css={css`
		width: 24px;
		height: 24px;
		${commonStyles}
	`}
	onClick={onClick}
/>

export const InstapaperButton = ({url}: { url: string }) => {
	return <IconButton
		css={css`
			margin-top: 3px;
			margin-right: 0.5em;
			width: 18px;
			height: 18px;
			${commonStyles}
		`}
		{...instapaperActionProps}
		onClick={() => saveToInstapaper({url})}
	/>
}
