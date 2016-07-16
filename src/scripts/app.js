import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import {User} from './models/models'

const app = function() {

	//Create Backbone Model to store Persistant Data
	const TodoListModel = Backbone.Model.extend({
		url: '/api/todoListApp'
	})

}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..