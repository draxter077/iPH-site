import accountTotal from "./accountTotal/main.js"
import requestDeposit from "./requestDeposit/main.js"
import requestWithdraw from "./requestWithdraw/main.js"
import openConfig from "./openConfig/main.js"

export default function homeBodyLeftSideDiv(data){
    return(`
        <div class="homeBodyLeftSide">
            ${accountTotal(data)}
            ${requestWithdraw()}
            ${requestDeposit()}
            ${openConfig()}
        </div>    
    `)
}