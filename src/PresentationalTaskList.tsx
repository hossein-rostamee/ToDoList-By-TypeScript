import React, { FC } from 'react';
import { Task, statusesEnum } from './TaskList';

export interface PresentationalTaskListProps {
    changeState(id: number, newStatus: statusesEnum): void
    remove(id: number): void
    handleSubmit(event: any): void
    handleChange(event: any): void
    tasks: Task[]
    taskInp: string
}

export interface PresentFormProps {
    handleSubmit(event: any): void
    handleChange(event: any): void
    value: string
}

export interface GholamLogicProps {
    status: statusesEnum
    tasks: Task[]
    changeState(id: number, newStatus: statusesEnum): void
    remove(id: number): void
}

const PresentForm: FC<PresentFormProps> = ({ value, handleChange, handleSubmit, }) =>
    <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleChange} />
        <input type='submit' />
    </form>

const GholamLogic: FC<GholamLogicProps> = ({ status, tasks, changeState, remove }) => <>
    <h1> {statusesEnum[status]} </h1>
    {tasks.filter(t => t.status === status).map(t => <>
        <li> {t.desc} </li>
        {[statusesEnum.Todo, statusesEnum.Doing, statusesEnum.Done].map(s => <button onClick={() => changeState(t.id, s)}>
            {statusesEnum[s]}
        </button>)}
        <button onClick={() => remove(t.id)}> "remove" </button>
    </>)}
</>


const PresentationalTaskList: FC<PresentationalTaskListProps> = ({
    handleChange, handleSubmit, changeState, remove, tasks, taskInp
}) => {
    return <>
        <PresentForm handleSubmit={handleSubmit} handleChange={handleChange} value={taskInp} />
        <ul>
            { [statusesEnum.Todo, statusesEnum.Doing, statusesEnum.Done]
                .map ( status => <GholamLogic
                    tasks={tasks}
                    status={status}
                    changeState={changeState}
                    remove={remove}
                /> )
            }
        </ul>
    </>

}



export default PresentationalTaskList

