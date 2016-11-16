'use strict'

import React from 'react';
import LocalDb from 'localDb';

import TodoHeader from './TodoHeader.js';
import TodoMain from './TodoMain.js';
import TodoFooter from './TodoFooter.js';

import { render } from 'react-dom';

import '../styles/main.scss'


class App extends React.Component {

    constructor(){
        super();

        this.db = new LocalDb("ReactDemo");
        this.state = {
            todos: this.db.get("todos") || [],
            isAllChecked: false
        }
    }

    allChecked(){
        let isAllChecked = false;
        if (this.state.todos.every(function (todo) {
                if(todo.isDone) return true;
            }))
        {
            isAllChecked = true;
        }

        this.setState({
            todos: this.state.todos,
            isAllChecked: isAllChecked
        })
    }

    // 添加任务，是传递给Header组件的方法
    addTodo(todoItem){
        this.state.todos.push(todoItem);  //todo列表
        this.db.set('todos', this.state.todos);
        this.allChecked();
    }

    // 删除当前的任务，传递给TodoItem的方法
    deleteTodo(index){
        this.state.todos.splice(index, 1);
        this.setState({todos: this.state.todos});  //改变状态
        this.db.set('todos', this.state.todos);
    }

    // 清除已完成的任务，传递给Footer组件的方法
    clearDone(){
        let todos = this.state.todos.filter(todo => !todo.isDone);   //过滤掉数组中todo.isDone为true的item。
        // var todos = arr.filter(function(todo) {
        //     return !todo.isDone;
        // });
        this.setState({
            todos: todos,
            isAllChecked: false
        });
        this.db.set('todos', todos);
    }

    // 改变任务状态，传递给TodoItem和Footer组件的方法
    changeTodoState(index, isDone, isChangeAll=false){   //初始化isChangeAll为false
        if(isChangeAll){     //全部操作
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked: isDone
            });
        }else{   //操作其中一个todo
            this.state.todos[index].isDone = isDone;
            this.allChecked();
        }
        this.db.set('todos', this.state.todos);
    }


    render(){
        let info = {
            isAllChecked: this.state.isAllChecked,
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
        };

        return (
            <div className="todo-wrap">
                <TodoHeader addTodo={this.addTodo.bind(this)} />
                <TodoMain todos={this.state.todos} deleteTodo={this.deleteTodo.bind(this)} changeTodoState={this.changeTodoState.bind(this)} />
                <TodoFooter {...info} changeTodoState={this.changeTodoState.bind(this)} clearDone={this.clearDone.bind(this)} />
            </div>
        )
    }
}


// React.render(<App/>, document.getElementById('content'));

render(<App/>, $('#content')[0]);
