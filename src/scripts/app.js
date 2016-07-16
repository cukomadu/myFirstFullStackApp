import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import {User} from './models/models'
import {TodoModel, TodoCollection} from '.models/models'
import TasksView from '.views/tasksview'

const app = function() {

	// Create Backbone Router
	const TodoRouter = Backbone.Router.extend({
		routes: {
			"home": "_showAllTasks",
			"*catchAll": "_redirect"
		},

		_showAllTasks: function(){
			var todoColl = new TodoCollection()
			todoColl.fetch()

			ReactDOM.render(<TasksView backboneColl={todoColl} />, document.querySelector('.container'))
		},

		_redirect: function(){
			location.hash = "home"
		},

		initialize: function(){
			Backbone.history.start()
		}
	})
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..