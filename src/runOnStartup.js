import axios from "axios";
import { addMonths, isAfter, isThisMonth, max, startOfMonth } from "date-fns";


export default async function handleFixedExpenses() { 
    let data = {
        fixed: '',
        expenses: '',
        debts: '',
    }

    async function getData() {
        const fixed = await axios
        .get(`https://chiringuito-api.herokuapp.com/api/fixed`)

        const expenses = await axios
        .get(`https://chiringuito-api.herokuapp.com/api/expenses`)

        const debts = await axios
        .get(`https://chiringuito-api.herokuapp.com/api/debts`)

        data.fixed = fixed.data.data
        data.expenses = expenses.data.data
        data.debts = debts.data.data

    }
    function getAllExpensesFor(fixedExpense) {
        const allExpenses = data.expenses.filter(expense => {
            return (
                expense.isRecurrent &&
                expense.concept === fixedExpense.concept
            )
        })
        if(!allExpenses.length) return null
        else return allExpenses
    }

    function getAllDebtsFor(fixedExpense) {
        const allDebts = data.debts.filter(debt => {
            return (
                debt.isRecurrent &&
                debt.concept === fixedExpense.concept
            )
        })

        if(!allDebts.length) return null
        else return allDebts
    }

    function lastExpenseDateFor(fixedExpense) {
        const matchingExpensesArray = getAllExpensesFor(fixedExpense)
        if(matchingExpensesArray) {
        const matchingExpensesDatesArray = 
            matchingExpensesArray.map(expense => {
                return new Date(expense.debtGeneratedOn)
            })

        return max(matchingExpensesDatesArray)
        }
    }

    function shouldBeGenerated(fixedExpense) {

        if(!getAllExpensesFor(fixedExpense) && 
        !getAllDebtsFor(fixedExpense)) 
        return true  // Create if never created

        if(isAfter(  // Create debt if specified freq. months have elapsed since last expense
            new Date(), 
                addMonths(
                    lastExpenseDateFor(fixedExpense), 
                    fixedExpense.frequency
                )
            )
        ) return true
    }


    async function postDebt(fixedExpense) {
        await axios
                .post(`https://chiringuito-api.herokuapp.com/api/debts/new`,
                {
                    amount: fixedExpense.amount,
                    generatedBy: 'auto',
                    generatedOn: startOfMonth(new Date()),
                    isRecurrent: true,
                    concept: fixedExpense.concept,
                    dueBy: fixedExpense.dueBy
                }
                )
    }

    function generateDebts() {
        data.fixed.forEach(fixedExpense => {
            if(shouldBeGenerated(fixedExpense)) {
                postDebt(fixedExpense)
            }
        })
    }

    await getData()
    generateDebts()

}