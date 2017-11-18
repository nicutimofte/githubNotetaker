import { AsyncStorage } from 'react-native'

let api = {
	getBio(userName) {
		userName = userName.toLowerCase().trim();
		const url = `https://api.github.com/users/${userName}`;
		return fetch(url).then((res) => res.json());
	},
	getRepos(userName) {
		userName = userName.toLowerCase().trim();
		const url = `https://api.github.com/users/${userName}/repos`;
		return fetch(url).then((res) => res.json());
	},
	getNotes(userName) {
		userName = userName.toLowerCase().trim();
		const url = `https://githubnotetaker-reactnative.firebaseio.com/${userName}.json`;
		return fetch(url).then((res) => res.json());
	},
	editNote(userName,note,id) {
		const row = {}
		row[id] = note
		userName = userName.toLowerCase().trim();
		const url = `https://githubnotetaker-reactnative.firebaseio.com/${userName}.json`;
		return fetch(url,{
			method: 'patch',
			body: JSON.stringify(row),
		}).then((res) => res.json())
			.catch(err=>console.log("error:",err))
	},
	deleteNote(userName,id) {
		userName = userName.toLowerCase().trim();
		const url = `https://githubnotetaker-reactnative.firebaseio.com/${userName}/${id}.json`;
		return fetch(url,{
			method: 'delete',
		}).then((res) => res.json());
	},
	addNote(userName, note) {
		userName = userName.toLowerCase().trim();
		const url = `https://githubnotetaker-reactnative.firebaseio.com/${userName}.json`;
		return fetch(url,{
			method: 'post',
			body: JSON.stringify(note),
		}).then((res) => res.json());
	},
	async syncLocalNotes () {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("keys", keys)
			keys.map( async (username) => {
				if ( `${username}`.split('=')[0] === 'username') {
					const userName = `${username}`.split('=')[1]
					const note = await AsyncStorage.getItem(userName)
					
					console.log("sync:", userName, note)
					await this.addNote(userName,note).then(async () => {
						console.log("added to firebase!")
            await AsyncStorage.removeItem(username, () => {console.log('success')})
					})
				}
			})
      // const keys = await AsyncStorage.getAllKeys();
      // console.log(value);
      // if (value !== null){
      //   let notes = JSON.parse(value)
				// notes.push(note)
				// await AsyncStorage.setItem(userName, notes)
      // } else {
      //   await AsyncStorage.setItem(userName, [note])
      // }
    } catch (error) {
      console.log("error: " ,error)
    }
	},
	async getLocalNotes(username) {
    username = username.toLowerCase().trim();
    
    try {
      const value = await AsyncStorage.getItem(username);
      console.log(value);
      if (value !== null){
        return JSON.parse(value)
      }
    } catch (error) {
      // Error retrieving data
    }
	}
}

module.exports = api