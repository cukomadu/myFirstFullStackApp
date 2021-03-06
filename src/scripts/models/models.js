import Backbone from 'backbone'
import $ from 'jquery'
import {app_name} from '../app'


//Create Backbone Model to store Persistant Todo List Data
	export const TodoModel = Backbone.Model.extend({
		url: '/api/todoListApp'
	})

//Create Backbone Collection to store Models
	export const TodoCollection = Backbone.Collection.extend({
		model: TodoModel
		url: '/api/todoListApp'
	})


// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x

const User = Backbone.Model.extend({
	urlRoot: '/api/users',
	idAttribute: '_id'
})
User.register = function(email,password) {
	return $.ajax({
		type: 'post',
		url: '/auth/register',
		data: {
			email: email,
			password: password
		}
	})
}

User.login = function(email,password) {
	return $.ajax({
		type: 'post',
		url: '/auth/login',
		data: {
			email: email,
			password: password
		}
	}).then((userData) => {
		localStorage[app_name + '_user'] = JSON.stringify(userData)
		return userData
	},(err)=> {console.log(err.responseText)})
}

User.logout = function() {
	return $.getJSON('/auth/logout').then(()=>{
		localStorage[app_name + '_user'] = null
	})
}

User.getCurrentUser = function() {
	return localStorage[app_name + '_user'] ? JSON.parse(localStorage[app_name + '_user']) : null
}


export { User }


// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x

// ^^ DO NOT TOUCH ^^
// but, you may ...
const myUserModel = User.extend({

})