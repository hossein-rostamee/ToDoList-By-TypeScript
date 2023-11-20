import React, { Component } from 'react'
import makeId from './makeId'
import PresentationalTaskList from './PresentationalTaskList'


export type changeStatusFunc = (id: number, newStatus: statusesEnum) => void

export enum statusesEnum { Todo, Doing, Done }

export interface Task {
    id: number
    desc: string
    status: statusesEnum
}

export interface ToDoListProps {
    task: Task[]
    changeStatus: changeStatusFunc
}

interface ToDoListState {
    tasks: Task[]
    taskInp: string
}

export class ToDoList extends Component< {}, ToDoListState> {
    state: ToDoListState = {
        tasks: [
            { id: makeId(), desc: "Wash gholam", status: statusesEnum.Todo },
            { id: makeId(), desc: "Wash Asghar", status: statusesEnum.Doing },
            { id: makeId(), desc: "Wash faragis", status: statusesEnum.Done },
            { id: makeId(), desc: "Wash akbar", status: statusesEnum.Todo },
        ],
        taskInp: ''
    }

    handleChange = (event: any) => {
        this.setState({ taskInp: event.target.value })
    }

    handleSubmit = (event: any) => {
        event.preventDefault()
        this.state.taskInp ? this.addTask(this.state.taskInp) : alert("Enter valid input")
        this.setState(prevState => ({ taskInp: "" }))  
    }

    addTask = (task: string) => {
        this.setState(prevState => ({ tasks: [...prevState.tasks, { id: makeId(), desc: task, status: statusesEnum.Todo }] }))
    }

    changeState = ( id: number, newStatus: statusesEnum ) => {
        const newState = this.state.tasks.map( t => 
            t.id === id 
            ? { ...t, status : newStatus }
            : t
            )
        this.setState( { tasks : newState } )
    }

    remove = ( id: number ) => {
        this.setState( prevState => ( { tasks : prevState.tasks.filter( t => t.id !== id ) } ) )
    }

    render() {
        return <PresentationalTaskList
            changeState={ this.changeState }
            remove={ this.remove }
            handleSubmit={ this.handleSubmit }
            handleChange={ this.handleChange }
            taskInp={ this.state.taskInp }
            tasks={ this.state.tasks }
        />
    }
}

