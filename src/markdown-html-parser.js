import fontsChecking from './fonts/check-font'
import replaceString from './utils/replace-string'
import regulars from './regulars'

export default (string, options) => {
	let newString = string
	options.forEach(option => {
		const {
			title,
			included,
		} = option
		if (included === true) {
			switch (title) {
				case 'headers': {
					const {
						level,
						levels,
					} = option
					if (typeof level === 'object' && !Array.isArray(level)) {
						const {
							number,
							className,
						} = option.level
						const reg = new RegExp('^#{' + number + '}\\s(.+)', 'gim')
						newString = replaceString(newString, reg, className, {type: title})
					}
					if (typeof levels === 'object' && Array.isArray(levels)) {
						levels.forEach(level => {
							const {
								number,
								className,
							} = level
							const reg = new RegExp('^#{' + number + '}\\s(.+)', 'gim')
							newString = replaceString(newString, reg, className, {type: title})
						})
					}
					if (levels === 'all') {
						const {
							classNames,
						} = option
						if (typeof classNames === 'object' && !Array.isArray(classNames)) {
							Object
								.keys(classNames)
								.forEach((key, index) => {
									const newIndex = index + 1
									const reg = new RegExp('^#{' + newIndex + '}\\s(.+)', 'gim')
									newString = replaceString(newString, reg, classNames[key], {type: title})
								})
						}
					}
					break
				}
				case 'font': {
					const {
						font,
						fonts,
					} = option
					if (typeof font === 'object' && !Array.isArray(font)) {
						newString = fontsChecking(font, newString)
					}
					if (typeof fonts === 'object' && Array.isArray(fonts)) {
						fonts.forEach(font => {
							newString = fontsChecking(font, newString)
						})
					}
					if (fonts === 'all') {
						const {
							classNames
						} = option
						Object
							.keys(classNames)
							.forEach((key, index) => {
								const newIndex = index + 1
								if (key === 'bold') {
									regulars.bold.forEach(reg => {
										newString = replaceString(newString, reg, classNames[key], {type: title})
									})
								}
								if (key === 'inclined') {
									regulars.inclined.forEach(reg => {
										newString = replaceString(newString, reg, classNames[key], {type: title})
									})
								}
								if (key === 'strike') {
									newString = replaceString(newString, regulars.strike, classNames[key], {type: title})
								}
							})
					}
					break
				}
				case 'line-break': {
					const {
						className,
						allowed,
					} = option
					if (allowed === 'all') {
						const reg = new RegExp('^(\\*{3,}|-{3,})$', 'gim')
						newString = replaceString(newString, reg, className, {type: title})
					} else if (typeof allowed === 'string') {
						const reg = new RegExp('^(\\' + allowed + '{3,})$', 'gim')
						newString = replaceString(newString, reg, className, {type: title})
					}
					break
				}
				case 'li': {
					const {
						className,
						allowed
					} = option
					if (allowed === 'all') {
						const reg = new RegExp('^[-+*]\\s(.+)', 'gim')
						newString = replaceString(newString, reg, className, {type: title})
					} else if (typeof allowed === 'string') {
						const reg = new RegExp('^\\' + allowed + '\\s([^*].+)', 'gim')
						newString = replaceString(newString, reg, className, {type: title})
					}
					break
				}
				case 'list': {
					const {
						className,
					} = option
					const reg = new RegExp('^(\\d*\\.)\\s?(.+)', 'gim')
					newString = replaceString(newString, reg, className, {type: title})
					break
				}
				case 'link': {
					const {
						className,
					} = option
					const reg = new RegExp('\\[(.+)\\]\\((.+)\\s["\'](.+)["\']\\)', 'gim')
					newString = replaceString(newString, reg, className, {type: title})
					break
				}
				case 'image': {
					const {
						className,
					} = option
					const reg = new RegExp('!\\[(.+)\\]\\((.+)\\)', 'gim')
					newString = replaceString(newString, reg, className, {type: title})
					break
				}
				case 'code': {
					const {
						className,
					} = option
					const reg = new RegExp('`{1,2}\\s?<(.+)>\\s?`{1,2}', 'gim')
					newString = replaceString(newString, reg, className, {type: title})
					break
				}
				case 'blockquote': {
					const {
						className,
					} = option
					const reg = new RegExp('^>\\s(.+)', 'gim')
					newString = replaceString(newString, reg, className, {type: title})
					break
				}
			}
		}
	})
	return newString
}