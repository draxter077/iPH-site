import capitalAllocation from "./capitalAllocation/main.js"
import returnsGraph from "./returnsGraph/main.js"

export default function homeBodyRightSideDiv(data){
    return(`
        <div class="homeBodyRightSide">
            ${capitalAllocation()}
            ${returnsGraph(data.userInfo)}
        </div>    
    `)
}