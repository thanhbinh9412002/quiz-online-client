import axios from "axios"

export const api = axios.create({
	baseURL: "http://localhost:9456/api/quiz"
})

export async function createQuestion (quizQuestion) {
    try {
        const response = await api.post("/create-new-question", quizQuestion)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function getAllQuestion(){
    try {
        const response = await api.get("/all-questions")
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function getSubjects(){
    try {
        const response = await api.get("/subjects")
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteQuestion(id){
    try {
        const response = await api.delete(`/question/${id}/delete`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateQuestion (id, question) {
    try {
        const response = await api.put(`/question/${id}/update`, question)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function getQuestionById(id){
    try {
        const response = await api.get(`/question/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function fetchQuizForUser(number, subject){
    try {
        const response = await api.get(`/fetch-questions-for-user?numberOfQuestion=${number}&subject=${subject}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
