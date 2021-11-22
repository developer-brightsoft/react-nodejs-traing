import axios from 'axios'

export const API_URL = 'http://localhost:3000/'

export const accessTokenConfig = token => {
	if (token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	} else {
		delete axios.defaults.headers.common['Authorization']
	}
}