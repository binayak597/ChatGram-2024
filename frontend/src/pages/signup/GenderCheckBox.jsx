import React from 'react'

const GenderCheckBox = ({onChangeGender, selectedGender}) => {
  return (
    <div className='flex'>

        <div className='form-control'>
			<label className="label gap-2 cursor-pointer">
				<span className='label-text text-gray-300'>Male</span>
				<input
					type='checkbox'
					className='checkbox border-slate-400'
					checked={selectedGender === "male"}
					onChange={() => onChangeGender("male")}
				/>
			</label>
		</div>


        <div className='form-control'>
			<label className="label gap-2 cursor-pointer">
				<span className='label-text text-gray-300'>Female</span>
				<input
					type='checkbox'
					className='checkbox border-slate-400'
					checked={selectedGender === "female"}
					onChange={() => onChangeGender("female")}
				/>
			</label>
		</div>
    </div>
  )
}

export default GenderCheckBox