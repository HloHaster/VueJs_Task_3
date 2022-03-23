class TaskValidator {
    isValid(task) {
        for (let value of Object.values(task)) {
            if (!value || !value.trim()) {
                return false
            }
        }
        return true
    }
}

module.exports = new TaskValidator()