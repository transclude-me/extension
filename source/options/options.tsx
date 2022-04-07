import {optionsStorage} from './options-storage'
import * as ReactDOM from "react-dom"

const formId = 'options-form'

const Options = () =>
	<div>
		<form id={formId} className={"detail-view-container"}>
			<label className={"option-input"}>
				<div className={"option-label"}> Don't render previews on:</div>
				<textarea name="renderBlocklist" rows={5}/>
			</label>
		</form>
	</div>

const main = () => {
	ReactDOM.render(<Options/>, document.getElementById('root'), () => {
		optionsStorage.syncForm('#' + formId)
	})
}

main()
