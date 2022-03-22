import instance from "./instance"
import taskModule from './task'

export default {
    task: taskModule(instance)
}