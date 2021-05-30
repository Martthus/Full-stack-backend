import { createConnections } from "typeorm"

createConnections().then(() => {
    console.log("ok")
})
    .catch((e) => {
        console.error(e)
    })