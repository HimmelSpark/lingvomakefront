import axios from 'axios'

class Network {
	async register({email, password}) {
		axios.post('localhost:8090/admin/register', {
			email: email,
			password: password
		}).then(response => {
			console.log(response);
			//TODO проверить ответ
			//TODO вернуть результат
		}).catch(error => {
			console.log(error)
			//TODO заэмиттить ошибку
		});
	}
}

export default new Network();