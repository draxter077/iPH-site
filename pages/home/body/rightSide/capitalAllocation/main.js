export default function capitalAllocation(){
    const capitalAllocation = document.createElement("div")
    capitalAllocation.className = "homeBodyRightSideCapitalAllocation"
        const title = document.createElement("div")
        title.className = "homeBodyRightSideCapitalAllocationTitle"
        title.innerHTML = "Alocação do capital"
        capitalAllocation.appendChild(title)

        const content = document.createElement("div")
        content.className = "homeBodyRightSideCapitalAllocationContent"
        let childs = ["Mercado Futuro: 15%", "Ações estrangeiras: 10%", "Ações nacionais: 10%", "CDI/CDB: 65%"]
        for(let i = 0; i < childs.length; i++){
            let d = document.createElement("div")
            d.innerHTML = childs[i]
            content.appendChild(d)
        }
        capitalAllocation.appendChild(content)
    return(capitalAllocation)
}