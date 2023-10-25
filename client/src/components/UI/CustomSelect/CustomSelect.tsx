import React, {FC} from "react";
import Select from 'react-select'

export interface IOption {
	value: string | number
	label: string | number
}

interface CustomSelectProps {
	onChange: (value: any) => void
	options: string[] | number[]
	value: string | number | IOption[]
	className?: string
	isMulti?: boolean | undefined
}

const CustomSelect: FC<CustomSelectProps> = ({onChange, options, isMulti, value, className}) => {
	const formatOptions	 = (data: string[] | number[]) => {
		return data.map(el => ({value: el, label: el}))
	}

	const formattedOptions = formatOptions(options)

	const mapValues = (values: any) => {
		if (Array.isArray(values)) {
			return values.map(el => el.value)
		}
	}

	const findValue = (options: IOption[], value: string | number | IOption[]) => {
		return options ? options.find(option => option.value === value) : ''
	}

	return (
		<div>
			<Select
				options={formattedOptions}
				isSearchable={false}
				value={isMulti ? value : findValue(formattedOptions, value)}
				onChange={value => onChange(isMulti ? mapValues(value) : value)}
				isMulti={isMulti ? isMulti : false}
				className={className}
				// className="react-select-container"
  				classNamePrefix="react-select"
			/>
		</div>
	);
}
 
export default CustomSelect;