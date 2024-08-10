export default function returnsGraph(data){
    let highest = 0, lowest = 0
    const rents = [data.rent11, 
                    data.rent10, 
                    data.rent9, 
                    data.rent8, 
                    data.rent7, 
                    data.rent6, 
                    data.rent5, 
                    data.rent4, 
                    data.rent3, 
                    data.rent2, 
                    data.rent1, 
                    Math.floor((data.transresults/data.monthcapital)*10000)/100
                ]
    for(let i = 0; i < rents.length; i++){
        if(rents[i] > highest){
            highest = rents[i]
        }
        if(rents[i] < lowest){
            lowest = rents[i]
        }
    }
    if(highest - lowest < 20){
        highest += 10
        lowest += -10
    }
    const zeroLineY = Math.floor(((0 - lowest)/(highest - lowest))*10000)/100
    let values = []
    for(let j = 0; j < rents.length; j++){
        let a = Math.floor(((rents[j] - lowest)/(highest - lowest))*10000)/100
        a = 100 - a
        a = a*0.90 + 5
        values.push({date: rents[j].toString() + "%", y: a.toString() + "%"})
    }
    return(`
        <div class="homeBodyReturnsGraph">
            <svg>
                <line x1="5%" x2="95%" y1="95%" y2="95%" stroke-width="1" stroke="rgb(0, 0, 0, 0.2)"></line>
                <line x1="5%" x2="95%" y1="72.5%" y2="72.5%" stroke-width="1" stroke="rgb(0, 0, 0, 0.2)"></line>
                <line x1="5%" x2="95%" y1="50%" y2="50%" stroke-width="1" stroke="rgb(0, 0, 0, 0.2)"></line>
                <line x1="5%" x2="95%" y1="27.5%" y2="27.5%" stroke-width="1" stroke="rgb(0, 0, 0, 0.2)"></line>
                <line x1="5%" x2="95%" y1="5%" y2="5%" stroke-width="1" stroke="rgb(0, 0, 0, 0.2)"></line>

                <text x="0%" y="7.5%">${Math.floor(highest*100)/100}%</text>
                <text x="0%" y="30%">${Math.floor(((highest - lowest)*0.75 + lowest)*100)/100}%</text>
                <text x="0%" y="52.5%">${Math.floor(((highest - lowest)*0.5 + lowest)*100)/100}%</text>
                <text x="0%" y="75%">${Math.floor(((highest - lowest)*0.25 + lowest)*100)/100}%</text>
                <text x="0%" y="97.5%">${Math.floor(lowest*100)/100}%</text>
                <line x1="5%" x2="95%" y1="${zeroLineY}%" y2="${zeroLineY}%" stroke-width="1" stroke="rgb(255, 0, 200)"></line>

                <g>
                    ${values.map(d => {
                        return(
                            `<circle cx="${5 + values.indexOf(d)*8.18}%" cy=${d.y} r="0.75%">
                                <title>${d.date}</title>
                            </circle>
                            ${(values.indexOf(d) > 0) ? `<line x1="${5 + (values.indexOf(d) - 1)*8.18}%" 
                                                            x2="${5 + values.indexOf(d)*8.18}%" 
                                                            y1=${values[values.indexOf(d) - 1].y} 
                                                            y2=${d.y}
                                                            stroke-width="1" stroke="rgb(0, 0, 0)"></line>` : ""
                            }
                        `)
                    }).join("")}
                </g>
            </svg>
        </div>    
    `)
}