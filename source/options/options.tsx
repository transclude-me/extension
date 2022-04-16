import * as ReactDOM from 'react-dom'
import {optionsStorage} from './options-storage'

const formId = 'options-form'

const Options = () =>
	<div>
		<form id={formId} className={'detail-view-container'}>
			<section>
				<label className={'option-input'}>
					<div className={'option-label'}> Don&apos;t render previews on:</div>
					<textarea name="renderBlocklist" rows={5}/>
				</label>
			</section>

			<section>
				<h2>Preview settings by type</h2>
				<div>
					<h3>Iframe</h3>
					<label className={'option-input'}>
						<div className={'option-label'}>Render iframe preview links to:</div>
						<textarea name="iframeDomainWhitelist" rows={5}/>
					</label>
					<label className={'option-input'}>
						<div className={'option-label'}>Render iframe preview for links on subdomains:</div>
						<textarea name="iframeSubdomainWhitelist" rows={5}/>
					</label>
				</div>
			</section>
		</form>
	</div>

const main = () => {
	ReactDOM.render(<Options/>, document.getElementById('root'), () => {
		void optionsStorage.syncForm('#' + formId)
	})
}

main()
