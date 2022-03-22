export default function (instance) {
    return {
        createNewTask(task) {
            return instance.post('tasks', task)
        }
    }
}