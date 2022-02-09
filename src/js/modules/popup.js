

export function popUp() {
	const popUp = document.querySelector('.popup');
	const bodyLock = document.getElementById('body');
	const popupCloseIcon = document.querySelector('.close-popup');
	const popupBtn = document.querySelector('.popup__button');

	popUp.classList.add('open');
	bodyLock.classList.add('lock');
	const popupLink = document.querySelector('.popup-link');
	popupLink.classList.add('open');

	popupCloseIcon.addEventListener('click', function (e) {
		popupClose(popupCloseIcon.closest('.popup'));
		e.preventDefault();
	});

	popupBtn.addEventListener('click', function () {
		popupClose(popUp);
	});

	function popupClose(popupActive) {
		popupActive.classList.remove('open');
		let bodyLock = document.getElementById('body');
		bodyLock.classList.remove("lock");
	}

	document.addEventListener('click', function (e) {
		if (!e.target.closest('.popup__content')) {
			popupClose(popUp);
		}
	});


	(function () {
		// проверяем поддержку
		if (!Element.prototype.closest) {
			// реализуем
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		// проверяем поддержку
		if (!Element.prototype.matches) {
			// определяем свойство
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();
};





