export default function returnsGraph(){
    const values = [{date: "07/2023: 0%", y: "50%"}, {date: "08/2023: -5%", y: "72.5%"}]
    return(`
        <div class="homeBodyReturnsGraphDiv">
            <svg>
                <g>
                    ${values.map(d => {
                        return(
                            `<circle cx="${5 + values.indexOf(d)*10}%" cy=${d.y} r="0.75%">
                                <title>${d.date}</title>
                            </circle>
                            ${(values.indexOf(d) > 0) ? `<line x1="${5 + (values.indexOf(d) - 1)*10}%" 
                                                            x2="${5 + values.indexOf(d)*10}%" 
                                                            y1=${values[values.indexOf(d) - 1].y} 
                                                            y2=${d.y}
                                                            stroke-width="1" stroke="rgb(0, 0, 0)"></line>` : ""
                            }
                        `)
                    })}
                </g>
                <text x="0%" y="52.5%">0%</text>
                <line x1="5%" x2="95%" y1="95%" y2="95%" stroke-width="1" stroke="rgb(0, 0, 0, 0.2)"></line>
                <line x1="5%" x2="95%" y1="72.5%" y2="72.5%" stroke-width="1" stroke="rgb(0, 0, 0, 0.2)"></line>
                <line x1="5%" x2="95%" y1="50%" y2="50%" stroke-width="1" stroke="rgb(0, 0, 0, 0.2)"></line>
                <line x1="5%" x2="95%" y1="27.5%" y2="27.5%" stroke-width="1" stroke="rgb(0, 0, 0, 0.2)"></line>
                <line x1="5%" x2="95%" y1="5%" y2="5%" stroke-width="1" stroke="rgb(0, 0, 0, 0.2)"></line>
            </svg>
        </div>    
    `)
}