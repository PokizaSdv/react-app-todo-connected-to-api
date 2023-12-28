class TodoAPI {
    constructor() {
        this.endpoint = process.env.REACT_APP_API
    }

    async addTodo(todo) {
        const {text} = todo;

        try {
            const response = await fetch(`${this.endpoint}/todos`, {
                method: " POST",
                headers: {"Content-type": "Application/json" },
                body: JSON.stringify({text})
            })
            if(!response.ok) {
                const data = await response.json();
                throw new Error(data.message) 
            }
            return await response.json()
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const response = await fetch(`${this.endpoint}/todos`);
            if(!response.ok) {
                const data = response.json();
                throw new Error(data.message)
            }
            return await response.json()
        } catch (error) { 
            console.log(error)
        }
    }

    async deleteOne(todoId) {
        try {
            
        } catch (error) {
            
        }
    }
} 

export const todoApi = new TodoAPI()