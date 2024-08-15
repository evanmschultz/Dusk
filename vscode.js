(function () {
	/**
	 * Initializes the script that manages the command dialog in the Visual Studio Code (VSCode) extension.
	 * This function sets up event listeners and observers to detect when the command dialog is shown or hidden,
	 * and then executes the `runMyScript()` and `handleEscape()` functions accordingly.
	 */
	function init() {
		const checkElement = setInterval(() => {
			const commandDialog = document.querySelector('.quick-input-widget');
			if (commandDialog) {
				// console.log('Command dialog found');
				if (commandDialog.style.display !== 'none') {
					runMyScript();
					// console.log('Executed runMyScript on dialog display');
				}
				const observer = new MutationObserver((mutations) => {
					mutations.forEach((mutation) => {
						if (
							mutation.type === 'attributes' &&
							mutation.attributeName === 'style'
						) {
							if (commandDialog.style.display === 'none') {
								handleEscape();
								// console.log(
								// 	'Executed handleEscape on dialog hide'
								// );
							} else {
								runMyScript();
								// console.log(
								// 	'Executed runMyScript on dialog show'
								// );
							}
						}
					});
				});

				observer.observe(commandDialog, { attributes: true });
				clearInterval(checkElement);
			} else {
				console.log('Command dialog not found yet. Retrying...');
			}
		}, 500);

		/**
		 * Listens for keyboard events on the document and executes the `runMyScript()` function when the user presses Ctrl/Cmd + P, or the `handleEscape()` function when the user presses the Escape key.
		 * This event listener is used to trigger the command dialog functionality in the Visual Studio Code (VSCode) extension.
		 */
		document.addEventListener('keydown', function (event) {
			if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
				event.preventDefault();
				runMyScript();
				// console.log('Executed runMyScript on key press');
			} else if (event.key === 'Escape' || event.key === 'Esc') {
				event.preventDefault();
				handleEscape();
				// console.log('Executed handleEscape on Escape key press');
			}
		});

		/**
		 * Listens for the 'Escape' or 'Esc' key press event on the document and executes the `handleEscape()` function when triggered.
		 * This event listener is used to handle the dismissal of a command dialog or similar UI element in the Visual Studio Code (VSCode) extension.
		 */
		document.addEventListener(
			'keydown',
			function (event) {
				if (event.key === 'Escape' || event.key === 'Esc') {
					handleEscape();
					// console.log(
					// 	'Executed handleEscape on Escape key press (capture)'
					// );
				}
			},
			true
		);
	}

	/**
	 * Adds a blur overlay element to the '.monaco-workbench' div, which is likely the main container for the Visual Studio Code (VSCode) application.
	 * The overlay element has an ID of 'command-blur' and is removed when clicked.
	 * This function is used to create a blur effect or overlay when a command dialog or similar UI element is displayed in VSCode.
	 */
	function runMyScript() {
		try {
			const targetDiv = document.querySelector('.monaco-workbench');
			if (!targetDiv) {
				console.error('Target div .monaco-workbench not found');
				return;
			}

			const existingElement = document.getElementById('command-blur');
			if (existingElement) {
				existingElement.remove();
			}

			const newElement = document.createElement('div');
			newElement.setAttribute('id', 'command-blur');
			newElement.addEventListener('click', function () {
				newElement.remove();
			});

			targetDiv.appendChild(newElement);
			// console.log('Added blur overlay');
		} catch (error) {
			console.error('Error in runMyScript:', error);
		}
	}

	/**
	 * Handles the dismissal of a command dialog or similar UI element in the Visual Studio Code (VSCode) extension.
	 * This function attempts to click the 'command-blur' element, which is likely an overlay element used to create a blur effect when a command dialog is displayed.
	 * If the 'command-blur' element is found, it is clicked to dismiss the command dialog or UI element.
	 * @throws {Error} If an error occurs while attempting to click the 'command-blur' element.
	 */
	function handleEscape() {
		try {
			const element = document.getElementById('command-blur');
			if (element) {
				element.click();
			}
		} catch (error) {
			console.error('Error in handleEscape:', error);
		}
	}

	setTimeout(init, 1000); // Delay to ensure elements load correctly
})();
