import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import React, {useState} from 'react'
import { data } from '../../data'

export default function Courses(props) {
    const {days} = props

    const [onlySchool, setOnlySchool] = useState(false)

    const allCourseOperations = () => {
        const allOperations = days.map(day => day.operations).flat()
        const courseOperations = allOperations.filter(op => {
        return (
            op.opType === 'course_e' ||
            op.opType === 'course_n' ||
            op.opType === 'course_a')
        })
        return courseOperations
    }

    const onlySchoolOperations = () => {
        const allOperations = days.map(day => day.operations).flat()
        const courseOperations = allOperations.filter(op => {
        return (
            op.opType === 'course_e'
        )
        })
        return courseOperations
    }

    function toggleOnlySchool() {
        setOnlySchool(!onlySchool)
    }

    function CourseItem(props) {
        const {item} = props

        const colors = () => {
            if (item.opType === 'course_e') return {backgroundColor: '#ffe0a7'}
            if (item.opType === 'course_n') return {backgroundColor: '#9df39d'}
            if (item.opType === 'course_a') return {backgroundColor: 'rgb(157 239 243)'}
        }

        return (
        <div style={colors()} className='expense_item_container'>
            <span>{format(new Date(item.timestamp), 'P', {locale: es})}</span>
            <p>{item.concept}</p>
            <p><strong>{`${-item.amount}€`}</strong></p>
        </div>
        )
    }

    const schoolCourseOps = allCourseOperations().filter(op => op.opType === 'course_e')
    const privateCourseOps = allCourseOperations().filter(op => op.opType === 'course_n')
    const anualCourseOps = allCourseOperations().filter(op => op.opType === 'course_a')

    const totalSchoolCourseCash = schoolCourseOps.reduce((acc, curr) => {
        return acc + curr.amount
    }, 0)
    const totalPrivateCourseCash = privateCourseOps.reduce((acc, curr) => {
        return acc + curr.amount
    }, 0)
    const totalAnualCourseCash = anualCourseOps.reduce((acc, curr) => {
        return acc + curr.amount
    }, 0)
    const totalCourseCash = allCourseOperations().reduce((acc, curr) => {
        return acc + curr.amount
    }, 0)

    const ourSchoolReturns = totalSchoolCourseCash * 0.4
    const toRepay = totalSchoolCourseCash * 0.6

    const totalReturns = ourSchoolReturns + totalPrivateCourseCash + totalAnualCourseCash

    function renderAllOperations() {
        return allCourseOperations().map(item => <CourseItem key={data.getid()} item={item} />)
    }

    function renderOnlySchool() {
        return onlySchoolOperations().map(item => <CourseItem key={data.getid()} item={item} />)
    }

    const footer = (
        <div className='course_stats_container'>
            <div className="dailybalance_container ">
                <p className="dailybalance dailybalance_tag">Total</p>
                <h1 className="dailybalance">{`${-totalCourseCash.toFixed(2)}€`}</h1>
            </div>
            <div className="dailybalance_container ">
                <p style={{color: 'green'}} className="dailybalance dailybalance_tag">Beneficio</p>
                <h1 className="dailybalance">{`${-totalReturns.toFixed(2)}€`}</h1>
            </div>
            <div className="dailybalance_container ">
                <p style={{color: 'darkred'}} className="dailybalance dailybalance_tag">Club</p>
                <h1 className="dailybalance">{`${-toRepay.toFixed(2)}€`}</h1>
            </div>
        </div>
    )

    const onlySchoolFooter = (
        <div className='course_stats_container'>
        <div className="dailybalance_container ">
            <p style={{color: 'black'}} className="dailybalance dailybalance_tag">60% Club</p>
            <h1 className="dailybalance">{`${-toRepay.toFixed(2)}€`}</h1>
        </div>
    </div>
    )
    

    const toggleBtn = (
        <div className="form-check form-switch is_payed">
					<input
						className="form-check-input"
						type="checkbox"
						checked={onlySchool}
						onChange={() => toggleOnlySchool()}
					/>
					<label className="form-check-label" htmlFor="formSwitchCheckChecked">
						Sólo escuela
					</label>
				</div>
    )

    return (
        <div className='finance_col_right'>
            <h3>Pistas</h3>
            {toggleBtn}
            {!onlySchool && renderAllOperations()}
            {onlySchool && renderOnlySchool()}
            {!onlySchool && footer}
            {onlySchool && onlySchoolFooter}
        </div>
    )
}
