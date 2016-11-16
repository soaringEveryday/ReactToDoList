'use strict';

import React from 'react';

export default class TodoHeader extends React.Component {

    handleOnKeyUp(e) {

        if(e.keyCode == 13){
            let value = e.target.value;
            if (!value) return false;
            let newTodoItem = {
                text: value,
                isDone: false
            }
            e.target.value = "";
            this.props.addTodo(newTodoItem);
        }

    }

    render(){
        return (
            <div>
                <input type="text" placeholder="please enter task name, and click enter" onKeyUp={this.handleOnKeyUp.bind(this)}/>
            </div>
        )
    }
}