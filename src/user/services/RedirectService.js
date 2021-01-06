import {useHistory} from "react-router-dom"

const redirectService = path => {
    let history = useHistory()
    history.push(path)
}

export default redirectService;