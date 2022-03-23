class TaskValidator {
    isTaskFieldEmpty(task) {
        for (let value of Object.values(task)) {
            if (!value || !value.trim()) {
                return false
            }
        }
    }
}

module.exports = new TaskValidator()