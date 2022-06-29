import * as api from '../api'

export const signin = (formData, history) => async (dispatch) => {

    try {

        const { data } = await api.signIn(formData)
        dispatch({ type: 'AUTH', data })
        history.push('/')
    } catch (error) {
        console.log(error)
    }


}

export const signup = (formData, history) => async (dispatch) => {

    try {
        const { data } = await api.signUp(formData);
        const action = { type: 'AUTH', data }
        dispatch(action);// ban action nay sang cho thang reducer(cong nhan xu ly)
        history.push('/')
    } catch (error) {
        console.log(error)
    }


}